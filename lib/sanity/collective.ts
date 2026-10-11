import type { Image } from "sanity";
import { client } from "./client";
import { toSrcAlt } from "./image";

type SanityImg = { asset?: Image; alt?: string };
type SanityRow = {
  main?: { image?: SanityImg; text?: string[] };
  side?: { image?: SanityImg; text?: string };
};
type SanityFilmstripItem = { image?: SanityImg; wide?: boolean };
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
  inspiration?: { heading?: string; tag?: string; paragraphs?: string[] };
  filmstrip?: SanityFilmstripItem[];
};

export type FilmstripImg = { src: string; alt: string; wide: boolean };

/**
 * Shape for /collective's own page-level sections (Foundation, Craft,
 * standalone photo band, Inspiration, filmstrip). Publications stays
 * its own self-fetching component (lib/sanity/publications.ts).
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
    collageImageA?: { src: string; alt: string };
    collageImageB?: { src: string; alt: string };
    paragraphs?: string[];
  };
  craft: {
    heading?: string;
    tag?: string;
    row?: {
      main?: { image?: { src: string; alt: string }; text?: string[] };
      side?: { image?: { src: string; alt: string } };
    };
  };
  photoBand?: { src: string; alt: string };
  inspiration: { heading?: string; tag?: string; paragraphs?: string[] };
  filmstrip?: FilmstripImg[];
};

export async function getCollectivePage(): Promise<CollectivePage | undefined> {
  const doc = await client.fetch<SanityCollectivePage | null>(
    `*[_id == "collectivePage"][0]`,
    {},
    { next: { revalidate: 60, tags: ["collectivePage"] } },
  );
  if (!doc) return undefined;

  const filmstrip = doc.filmstrip
    ?.map((item) => {
      const image = toSrcAlt(item.image);
      return image ? { ...image, wide: item.wide ?? false } : undefined;
    })
    .filter((x): x is FilmstripImg => Boolean(x));

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
      tag: doc.inspiration?.tag,
      paragraphs: doc.inspiration?.paragraphs?.length ? doc.inspiration.paragraphs : undefined,
    },
    filmstrip: filmstrip?.length ? filmstrip : undefined,
  };
}
