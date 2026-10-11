import type { Image } from "sanity";
import { client } from "./client";
import { toSrcAlt } from "./image";

type SanityImg = { asset?: Image; alt?: string };
type SanityContactPage = {
  heading?: string;
  image?: SanityImg;
  tag?: string;
  intro?: string;
  submitLabel?: string;
};

/**
 * Shape for /write-to-us ("Contact" in Figma). Form field labels/
 * placeholders stay hardcoded in WriteToUsSection.tsx -- see
 * studio/schemaTypes/documents/contactPage.ts's own comment on that
 * boundary. Every field optional/undefined on a missing value, same
 * discipline as lib/sanity/homepage.ts.
 */
export type ContactPage = {
  heading?: string;
  image?: { src: string; alt: string };
  tag?: string;
  intro?: string;
  submitLabel?: string;
};

export async function getContactPage(): Promise<ContactPage | undefined> {
  const doc = await client.fetch<SanityContactPage | null>(
    `*[_id == "contactPage"][0]`,
    {},
    { next: { revalidate: 60, tags: ["contactPage"] } },
  );
  if (!doc) return undefined;

  return {
    heading: doc.heading,
    image: toSrcAlt(doc.image),
    tag: doc.tag,
    intro: doc.intro,
    submitLabel: doc.submitLabel,
  };
}
