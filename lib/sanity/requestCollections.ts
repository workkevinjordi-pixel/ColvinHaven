import type { Image } from "sanity";
import { client } from "./client";
import { toSrcAlt } from "./image";

type SanityImg = { asset?: Image; alt?: string };
type SanityRequestCollectionsPage = {
  heading?: string;
  image?: SanityImg;
  tag?: string;
  intro?: string;
  submitLabel?: string;
  privacyNote?: string;
};

/**
 * Shape for /request-the-collections. Form field labels/placeholders
 * stay hardcoded in RequestCollectionsSection.tsx, same boundary as
 * contact.ts. Every field optional/undefined on a missing value.
 */
export type RequestCollectionsPage = {
  heading?: string;
  image?: { src: string; alt: string };
  tag?: string;
  intro?: string;
  submitLabel?: string;
  privacyNote?: string;
};

export async function getRequestCollectionsPage(): Promise<RequestCollectionsPage | undefined> {
  const doc = await client.fetch<SanityRequestCollectionsPage | null>(
    `*[_id == "requestCollectionsPage"][0]`,
    {},
    { next: { revalidate: 60, tags: ["requestCollectionsPage"] } },
  );
  if (!doc) return undefined;

  return {
    heading: doc.heading,
    image: toSrcAlt(doc.image),
    tag: doc.tag,
    intro: doc.intro,
    submitLabel: doc.submitLabel,
    privacyNote: doc.privacyNote,
  };
}
