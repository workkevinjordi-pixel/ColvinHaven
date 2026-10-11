import type { Image } from "sanity";
import { client } from "./client";
import { toSrcAlt } from "./image";

type SanityImg = { asset?: Image; alt?: string };
type SanityChecklistItem = { title?: string; description?: string };
type SanityFilmstripItem = { image?: SanityImg; wide?: boolean };
type SanityNewsPage = {
  whatsCooking?: {
    heading?: string;
    subtitle?: string;
    column1?: SanityChecklistItem[];
    column2?: SanityChecklistItem[];
  };
  filmstripBand?: { eyebrow?: string; lead?: string; images?: SanityFilmstripItem[] };
  moriProfile?: {
    heading?: string;
    description?: string;
    landSize?: string;
    timeToComplete?: string;
    heroImage?: SanityImg;
    paragraphs?: string[];
  };
  socialAction?: {
    statement?: { heading?: string; tag?: string; paragraphs?: string[] };
    bandImage?: SanityImg;
  };
  pullQuote?: { collageImageA?: SanityImg; collageImageB?: SanityImg; quoteText?: string };
};

export type ChecklistItem = { title: string; description: string };
export type FilmstripImg = { src: string; alt: string; wide: boolean };

/**
 * Shape for /news' own page-level sections (What's Cooking, filmstrip
 * band, Mori profile, Social Action, closing pull quote).
 * PublicationsSection stays its own self-fetching component
 * (lib/sanity/publications.ts). Every leaf field optional/undefined on
 * a missing value, same discipline as lib/sanity/homepage.ts.
 */
export type NewsPage = {
  whatsCooking: {
    heading?: string;
    subtitle?: string;
    column1?: ChecklistItem[];
    column2?: ChecklistItem[];
  };
  filmstripBand: { eyebrow?: string; lead?: string; images?: FilmstripImg[] };
  moriProfile: {
    heading?: string;
    description?: string;
    landSize?: string;
    timeToComplete?: string;
    heroImage?: { src: string; alt: string };
    paragraphs?: string[];
  };
  socialAction: {
    statement: { heading?: string; tag?: string; paragraphs?: string[] };
    bandImage?: { src: string; alt: string };
  };
  pullQuote: {
    collageImageA?: { src: string; alt: string };
    collageImageB?: { src: string; alt: string };
    quoteText?: string;
  };
};

function mapChecklist(items?: SanityChecklistItem[]): ChecklistItem[] | undefined {
  const mapped = items
    ?.map((i) => (i.title && i.description ? { title: i.title, description: i.description } : undefined))
    .filter((x): x is ChecklistItem => Boolean(x));
  return mapped?.length ? mapped : undefined;
}

function mapFilmstrip(items?: SanityFilmstripItem[]): FilmstripImg[] | undefined {
  const mapped = items
    ?.map((item) => {
      const image = toSrcAlt(item.image);
      return image ? { ...image, wide: item.wide ?? false } : undefined;
    })
    .filter((x): x is FilmstripImg => Boolean(x));
  return mapped?.length ? mapped : undefined;
}

export async function getNewsPage(): Promise<NewsPage | undefined> {
  const doc = await client.fetch<SanityNewsPage | null>(
    `*[_id == "newsPage"][0]`,
    {},
    { next: { revalidate: 60, tags: ["newsPage"] } },
  );
  if (!doc) return undefined;

  return {
    whatsCooking: {
      heading: doc.whatsCooking?.heading,
      subtitle: doc.whatsCooking?.subtitle,
      column1: mapChecklist(doc.whatsCooking?.column1),
      column2: mapChecklist(doc.whatsCooking?.column2),
    },
    filmstripBand: {
      eyebrow: doc.filmstripBand?.eyebrow,
      lead: doc.filmstripBand?.lead,
      images: mapFilmstrip(doc.filmstripBand?.images),
    },
    moriProfile: {
      heading: doc.moriProfile?.heading,
      description: doc.moriProfile?.description,
      landSize: doc.moriProfile?.landSize,
      timeToComplete: doc.moriProfile?.timeToComplete,
      heroImage: toSrcAlt(doc.moriProfile?.heroImage),
      paragraphs: doc.moriProfile?.paragraphs?.length ? doc.moriProfile.paragraphs : undefined,
    },
    socialAction: {
      statement: {
        heading: doc.socialAction?.statement?.heading,
        tag: doc.socialAction?.statement?.tag,
        paragraphs: doc.socialAction?.statement?.paragraphs?.length
          ? doc.socialAction.statement.paragraphs
          : undefined,
      },
      bandImage: toSrcAlt(doc.socialAction?.bandImage),
    },
    pullQuote: {
      collageImageA: toSrcAlt(doc.pullQuote?.collageImageA),
      collageImageB: toSrcAlt(doc.pullQuote?.collageImageB),
      quoteText: doc.pullQuote?.quoteText,
    },
  };
}
