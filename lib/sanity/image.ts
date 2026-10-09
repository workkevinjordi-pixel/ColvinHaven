import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

/** Builds a plain URL string from a Sanity image reference -- every
 * rendering component on the site only ever wants {src, alt}, never
 * the raw Sanity asset object, so this is always paired with
 * `imageWithAlt` below rather than used directly. */
export function urlFor(source: Image) {
  return builder.image(source);
}

/**
 * Converts one of this project's `imageWithAlt` Sanity objects
 * ({asset, alt}) into the plain {src, alt} shape every image-consuming
 * component on the site already expects (EditionSpotlight,
 * EditionStorySummary, ArticleCard, PublicationSlide, etc.) -- this is
 * the one place that shape conversion happens, so none of those
 * components need to know Sanity exists.
 *
 * `width` caps the delivered image at a sane size for its slot (Sanity
 * serves the original otherwise, often much larger than any layout on
 * this site ever needs) -- matches this project's own established
 * "resize to roughly the size it's actually displayed at" discipline
 * from its sips-based export pipeline, just done by Sanity's own CDN
 * transform instead of a local build step.
 */
export function toSrcAlt(
  image: { asset?: Image; alt?: string } | null | undefined,
  width?: number,
): { src: string; alt: string } | undefined {
  if (!image?.asset) return undefined;
  let url = urlFor(image.asset).auto("format").fit("max");
  if (width) url = url.width(width);
  return { src: url.url(), alt: image.alt ?? "" };
}
