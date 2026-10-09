import type { Image } from "sanity";
import { client } from "./client";
import { toSrcAlt } from "./image";
import type { EditionData } from "@/components/editions/editions-data";
import { EDITIONS_PAGE_OVERRIDES } from "@/components/editions/editions-data";

// Raw shape as it comes back from Sanity -- every {asset,alt} pair
// still a Sanity image reference, not yet a plain {src,alt}. Narrower
// than the Studio's own full schema (only the fields this query
// actually projects).
type SanityImg = { asset?: Image; alt?: string };
type SanityEdition = {
  _id: string;
  name: string;
  slug: string;
  index: string;
  exploreLabel?: string;
  title?: string;
  listSummary?: string[];
  meta?: { type: string; location: string; year: string };
  specs?: { label: string; value: string }[];
  craftText?: string[];
  portraitImage?: SanityImg;
  heroImage?: SanityImg;
  detailHeroImage?: SanityImg;
  listImage?: SanityImg;
  row1?: {
    main: { image?: SanityImg; text?: string[] };
    side: { image?: SanityImg; text?: string };
  };
  banner1?: SanityImg;
  storyA?: { paragraphs?: string[]; image?: SanityImg };
  galleryRow?: SanityImg[];
  galleryRow2?: SanityImg[];
  storyB?: {
    image?: SanityImg;
    paragraphs?: string[];
    linkParagraph?: { before: string; linkText: string; linkHref: string; after: string };
  };
  quoteBanner?: { image?: SanityImg; heading?: string; body?: string };
  row4?: {
    main: { image?: SanityImg; text?: string[] };
    side: { image?: SanityImg; text?: string };
  };
  closingBanner?: SanityImg;
  nextEdition?: { slug: string; index: string; name: string };
};

// Dereferences nextEdition in the same query -- avoids a second
// round-trip, and the "other edition" is always exactly one hop away.
const EDITION_PROJECTION = /* groq */ `{
  _id,
  name,
  "slug": slug.current,
  index,
  exploreLabel,
  title,
  listSummary,
  meta,
  specs,
  craftText,
  portraitImage,
  heroImage,
  detailHeroImage,
  listImage,
  row1,
  banner1,
  storyA,
  galleryRow,
  galleryRow2,
  storyB,
  quoteBanner,
  row4,
  closingBanner,
  "nextEdition": nextEdition->{"slug": slug.current, index, name}
}`;

function mapEdition(doc: SanityEdition): EditionData {
  const base: EditionData = {
    slug: doc.slug,
    index: doc.index,
    name: doc.name,
    exploreLabel: doc.exploreLabel ?? `Explore ${doc.name}`,
    listSummary: doc.listSummary ?? [],
    meta: doc.meta ?? { type: "", location: "", year: "" },
    title: doc.title ?? "",
    specs: doc.specs ?? [],
    craftText: doc.craftText ?? [],
    portraitImage: toSrcAlt(doc.portraitImage) ?? { src: "", alt: "" },
    heroImage: toSrcAlt(doc.heroImage) ?? { src: "", alt: "" },
    detailHeroImage: toSrcAlt(doc.detailHeroImage),
    listImage: toSrcAlt(doc.listImage),
    row1: {
      main: {
        image: toSrcAlt(doc.row1?.main.image) ?? { src: "", alt: "" },
        text: doc.row1?.main.text ?? [],
      },
      side: {
        image: toSrcAlt(doc.row1?.side.image) ?? { src: "", alt: "" },
        text: doc.row1?.side.text ?? "",
      },
    },
    banner1: toSrcAlt(doc.banner1) ?? { src: "", alt: "" },
    storyA: {
      paragraphs: doc.storyA?.paragraphs ?? [],
      image: toSrcAlt(doc.storyA?.image) ?? { src: "", alt: "" },
    },
    galleryRow: (doc.galleryRow ?? []).map((i) => toSrcAlt(i)!).filter(Boolean),
    galleryRow2: doc.galleryRow2?.length
      ? doc.galleryRow2.map((i) => toSrcAlt(i)!).filter(Boolean)
      : undefined,
    storyB: {
      image: toSrcAlt(doc.storyB?.image) ?? { src: "", alt: "" },
      paragraphs: doc.storyB?.paragraphs ?? [],
      linkParagraph: doc.storyB?.linkParagraph ?? {
        before: "",
        linkText: "",
        linkHref: "",
        after: "",
      },
    },
    quoteBanner: {
      image: toSrcAlt(doc.quoteBanner?.image) ?? { src: "", alt: "" },
      heading: doc.quoteBanner?.heading ?? "",
      body: doc.quoteBanner?.body ?? "",
    },
    row4: {
      main: {
        image: toSrcAlt(doc.row4?.main.image) ?? { src: "", alt: "" },
        text: doc.row4?.main.text ?? [],
      },
      side: {
        image: toSrcAlt(doc.row4?.side.image) ?? { src: "", alt: "" },
        text: doc.row4?.side.text ?? "",
      },
    },
    closingBanner: toSrcAlt(doc.closingBanner),
    nextEdition: doc.nextEdition ?? { slug: "", index: "", name: "" },
  };

  // Layer the code-level, page-specific overrides on top -- see
  // EDITIONS_PAGE_OVERRIDES's own comment in editions-data.ts for why
  // these stay out of the CMS.
  return { ...base, ...EDITIONS_PAGE_OVERRIDES[doc.slug] };
}

/**
 * Fetches both editions from Sanity, ordered the same way the old
 * static `editions` array was (Tsuki, then Sora) -- `index` sorts
 * correctly for that today ("I/VII" < "II/VII") and for any future
 * edition added in sequence.
 *
 * Revalidates every 60s (time-based -- no webhook/tag-based
 * invalidation wired up yet, matching this integration's own "focused
 * starting set" scope). A Studio edit shows up on the live site within
 * a minute of publishing, not instantly.
 */
export async function getEditions(): Promise<EditionData[]> {
  const docs = await client.fetch<SanityEdition[]>(
    `*[_type == "edition"] | order(index asc) ${EDITION_PROJECTION}`,
    {},
    { next: { revalidate: 60, tags: ["edition"] } },
  );
  return docs.map(mapEdition);
}
