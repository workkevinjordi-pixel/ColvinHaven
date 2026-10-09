import type { Image } from "sanity";
import { client } from "./client";
import { toSrcAlt } from "./image";

type SanityImg = { asset?: Image; alt?: string };
type SanityTextIntro = {
  heading?: string;
  paragraphs?: string[];
  linkLabel?: string;
  linkHref?: string;
};
type SanityHomepage = {
  hero?: { title?: string; tagline?: string; backgroundImage?: SanityImg };
  craftingStatement?: { heading?: string; body?: string };
  quoteRow?: { image?: SanityImg; caption?: string }[];
  editionsIntro?: SanityTextIntro;
  approachGallery?: { image?: SanityImg; caption?: string }[];
  collectiveIntro?: SanityTextIntro;
  cta?: { text?: string; buttonLabel?: string; buttonHref?: string };
};

export type HomepageTextIntro = {
  heading?: string;
  paragraphs?: string[];
  linkLabel?: string;
  linkHref?: string;
};
export type HomepageQuoteItem = { image: { src: string; alt: string }; caption: string };
export type HomepageApproachItem = { image: { src: string; alt: string }; caption: string };

/**
 * Shape every homepage component (Hero, CraftingStatement,
 * HomeQuoteRow, TextIntro×2, ApproachGallery, Cta) renders from --
 * plain {src,alt} images, same conversion discipline as
 * lib/sanity/editions.ts and lib/sanity/publications.ts.
 *
 * Every leaf field is OPTIONAL and stays `undefined` (not coerced to
 * "" or []) when Sanity doesn't have a value -- each consuming
 * component has its own hardcoded default matching this exact content,
 * and that default only fires on `undefined`, not on an empty string
 * or array. Coercing a missing field to "" here would silently render
 * blank content instead of falling through to that default.
 */
export type Homepage = {
  hero: { title?: string; tagline?: string; backgroundImage?: { src: string; alt: string } };
  craftingStatement: { heading?: string; body?: string };
  quoteRow?: HomepageQuoteItem[];
  editionsIntro: HomepageTextIntro;
  approachGallery?: HomepageApproachItem[];
  collectiveIntro: HomepageTextIntro;
  cta: { text?: string; buttonLabel?: string; buttonHref?: string };
};

function mapTextIntro(t?: SanityTextIntro): HomepageTextIntro {
  return {
    heading: t?.heading,
    paragraphs: t?.paragraphs?.length ? t.paragraphs : undefined,
    linkLabel: t?.linkLabel,
    linkHref: t?.linkHref,
  };
}

/**
 * Fetches the singleton "homepage" document (_id: "homepage").
 * Revalidates every 60s, same reasoning as getEditions()/
 * getPublications().
 */
export async function getHomepage(): Promise<Homepage | undefined> {
  const doc = await client.fetch<SanityHomepage | null>(
    `*[_id == "homepage"][0]`,
    {},
    { next: { revalidate: 60, tags: ["homepage"] } },
  );
  if (!doc) return undefined;

  const quoteRow = doc.quoteRow
    ?.map((item) => {
      const image = toSrcAlt(item.image);
      return image ? { image, caption: item.caption ?? "" } : undefined;
    })
    .filter((x): x is HomepageQuoteItem => Boolean(x));

  const approachGallery = doc.approachGallery
    ?.map((item) => {
      const image = toSrcAlt(item.image);
      return image ? { image, caption: item.caption ?? "" } : undefined;
    })
    .filter((x): x is HomepageApproachItem => Boolean(x));

  return {
    hero: {
      title: doc.hero?.title,
      tagline: doc.hero?.tagline,
      backgroundImage: toSrcAlt(doc.hero?.backgroundImage),
    },
    craftingStatement: {
      heading: doc.craftingStatement?.heading,
      body: doc.craftingStatement?.body,
    },
    quoteRow: quoteRow?.length ? quoteRow : undefined,
    editionsIntro: mapTextIntro(doc.editionsIntro),
    approachGallery: approachGallery?.length ? approachGallery : undefined,
    collectiveIntro: mapTextIntro(doc.collectiveIntro),
    cta: {
      text: doc.cta?.text,
      buttonLabel: doc.cta?.buttonLabel,
      buttonHref: doc.cta?.buttonHref,
    },
  };
}
