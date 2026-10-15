import type { MetadataRoute } from "next";
import { getEditions } from "@/lib/sanity/editions";
import { SITE_URL } from "@/lib/site";

// Every public page. /request-the-collections is deliberately left out
// while that page is switched off (it 404s), and /api/* is not a page.
const STATIC_ROUTES = ["/", "/editions", "/collective", "/news", "/write-to-us"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const editions = await getEditions();
  const now = new Date();

  return [
    ...STATIC_ROUTES.map((path) => ({
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      lastModified: now,
    })),
    ...editions.map((edition) => ({
      url: `${SITE_URL}/editions/${edition.slug}`,
      lastModified: now,
    })),
  ];
}
