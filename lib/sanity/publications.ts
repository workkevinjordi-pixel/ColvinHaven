import type { Image } from "sanity";
import { client } from "./client";
import { toSrcAlt } from "./image";

type SanityImg = { asset?: Image; alt?: string };
type SanityPublication = {
  _id: string;
  title: string;
  order: number;
  date?: string;
  paragraphs: string[];
  readMoreHref?: string;
  coverImage?: SanityImg;
  editorialImage?: SanityImg;
};

/** Shape every consumer (ArticleCard on /news, PublicationSlide on
 * /collective) already renders from -- plain {src,alt} images, same
 * conversion discipline as lib/sanity/editions.ts. */
export type Publication = {
  title: string;
  date: string;
  paragraphs: string[];
  readMoreHref: string;
  coverImage?: { src: string; alt: string };
  editorialImage?: { src: string; alt: string };
};

function mapPublication(doc: SanityPublication): Publication {
  return {
    title: doc.title,
    date: doc.date ?? "",
    paragraphs: doc.paragraphs,
    readMoreHref: doc.readMoreHref ?? "",
    coverImage: toSrcAlt(doc.coverImage),
    editorialImage: toSrcAlt(doc.editorialImage),
  };
}

/** Every publication, in display order -- /collective renders all of
 * them. Revalidates every 60s, same reasoning as getEditions(). */
export async function getPublications(): Promise<Publication[]> {
  const docs = await client.fetch<SanityPublication[]>(
    `*[_type == "publication"] | order(order asc) {
      _id, title, order, date, paragraphs, readMoreHref, coverImage, editorialImage
    }`,
    {},
    { next: { revalidate: 60, tags: ["publication"] } },
  );
  return docs.map(mapPublication);
}

/** The single most recent publication -- /news shows only this one. */
export async function getLatestPublication(): Promise<Publication | undefined> {
  const publications = await getPublications();
  return publications[0];
}
