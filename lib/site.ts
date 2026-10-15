/**
 * The site's canonical origin, used for metadataBase, canonical URLs, the
 * sitemap and robots. Override with NEXT_PUBLIC_SITE_URL (e.g. a preview
 * URL) -- defaults to the production domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://colvinhaven.com"
).replace(/\/$/, "");

export const SITE_NAME = "Colvin Haven";
