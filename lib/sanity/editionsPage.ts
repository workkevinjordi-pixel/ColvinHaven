import type { Image } from "sanity";
import { client } from "./client";
import { toSrcAlt } from "./image";

type SanityImg = { asset?: Image; alt?: string };
type SanityEditionsPage = { heroImage?: SanityImg };

/** Shape for /editions' own page-level content -- today just
 * EditionsHero's opening photo. Each edition's own story content
 * comes from lib/sanity/editions.ts, not here. */
export type EditionsPageContent = { heroImage?: { src: string; alt: string } };

export async function getEditionsPage(): Promise<EditionsPageContent | undefined> {
  const doc = await client.fetch<SanityEditionsPage | null>(
    `*[_id == "editionsPage"][0]`,
    {},
    { next: { revalidate: 60, tags: ["editionsPage"] } },
  );
  if (!doc) return undefined;

  return { heroImage: toSrcAlt(doc.heroImage) };
}
