import { createClient } from "next-sanity";

/**
 * The "production" dataset's documents are publicly readable (confirmed
 * via an unauthenticated query against the Content API), so the
 * website's own reads need no API token -- just the project ID and
 * dataset name, both safe to expose as NEXT_PUBLIC_ vars. A token is
 * only ever needed for writes (the one-time migration script in
 * studio/scripts/migrate.ts, run via `sanity exec --with-user-token`)
 * or for draft-mode/Visual Editing previews, neither of which this
 * site uses yet.
 */
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-10-09",
  // CDN reads are fine for this site's own cadence (content changes via
  // the Studio, not every second) -- Next.js's own fetch-level caching
  // (see editions.ts/publications.ts's own revalidate tags) is what
  // actually controls freshness for visitors, not this flag.
  useCdn: true,
});
