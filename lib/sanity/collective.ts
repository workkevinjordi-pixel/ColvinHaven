import type { Image } from "sanity";
import { client } from "./client";
import { toSrcAlt } from "./image";

type SanityImg = { asset?: Image; alt?: string };
type SanityRow = {
  main?: { image?: SanityImg; text?: string[] };
  side?: { image?: SanityImg; text?: string };
};
type SanityCollectivePage = {
  foundation?: {
    heading?: string;
    tag?: string;
    collageImageA?: SanityImg;
    collageImageB?: SanityImg;
    paragraphs?: string[];
  };
  craft?: { heading?: string; tag?: string; row?: SanityRow };
  photoBand?: SanityImg;
  inspiration?: { heading?: string; paragraphs?: string[] };
  inspirationGallery?: SanityImg[];
};

export type SrcAlt = { src: string; alt: string };

/**
 * Shape for /collective's own page-level sections (Foundation, Craft,
 * standalone photo band, Inspiration + its own gallery row).
 * Publications stays its own self-fetching component
 * (lib/sanity/publications.ts).
 *
 * Every leaf field is optional and left `undefined` (not coerced to ""
 * or []) when Sanity doesn't have a value -- same discipline as
 * lib/sanity/homepage.ts, since each consuming component's own
 * hardcoded default only fires on `undefined`.
 */
export type CollectivePage = {
  foundation: {
    heading?: string;
    tag?: string;
    collageImageA?: SrcAlt;
    collageImageB?: SrcAlt;
    paragraphs?: string[];
  };
  craft: {
    heading?: string;
    tag?: string;
    row?: {
      main?: { image?: SrcAlt; text?: string[] };
      side?: { image?: SrcAlt };
    };
  };
  photoBand?: SrcAlt;
  // No `tag` any more -- node 391:1394's own Inspiration redesign drops
  // it entirely (the Sanity field itself still exists on
  // collectivePage.inspiration for schema continuity, just unused here).
  inspiration: { heading?: string; paragraphs?: string[] };
  inspirationGallery?: SrcAlt[];
};

export async function getCollectivePage(): Promise<CollectivePage | undefined> {
  const doc = await client.fetch<SanityCollectivePage | null>(
    `*[_id == "collectivePage"][0]`,
    {},
    { next: { revalidate: 60, tags: ["collectivePage"] } },
  );
  if (!doc) return undefined;

  const inspirationGallery = doc.inspirationGallery
    ?.map((img) => toSrcAlt(img))
    .filter((x): x is SrcAlt => Boolean(x));

  return {
    foundation: {
      heading: doc.foundation?.heading,
      tag: doc.foundation?.tag,
      collageImageA: toSrcAlt(doc.foundation?.collageImageA),
      collageImageB: toSrcAlt(doc.foundation?.collageImageB),
      paragraphs: doc.foundation?.paragraphs?.length ? doc.foundation.paragraphs : undefined,
    },
    craft: {
      heading: doc.craft?.heading,
      tag: doc.craft?.tag,
      row: doc.craft?.row
        ? {
            main: {
              image: toSrcAlt(doc.craft.row.main?.image),
              text: doc.craft.row.main?.text?.length ? doc.craft.row.main.text : undefined,
            },
            side: { image: toSrcAlt(doc.craft.row.side?.image) },
          }
        : undefined,
    },
    photoBand: toSrcAlt(doc.photoBand),
    inspiration: {
      heading: doc.inspiration?.heading,
      paragraphs: doc.inspiration?.paragraphs?.length ? doc.inspiration.paragraphs : undefined,
    },
    inspirationGallery: inspirationGallery?.length ? inspirationGallery : undefined,
  };
}
