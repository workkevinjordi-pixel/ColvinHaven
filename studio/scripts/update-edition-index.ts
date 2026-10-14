/**
 * One-time update: the roman-numeral `index` on each edition -- both
 * Umah Tsuki and Umah Sora now read "I/V" (explicit request). The list
 * query sorts on `index` and then `_createdAt`, so equal numerals still
 * keep Tsuki first. Patch .set() on that one field per document.
 *
 * Run via `npx sanity exec scripts/update-edition-index.ts
 * --with-user-token` from within studio/. Safe to re-run.
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "2gbg82w2",
  dataset: "production",
  apiVersion: "2026-10-09",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

const INDEX_BY_SLUG: Record<string, string> = {
  "umah-tsuki": "I/V",
  "umah-sora": "I/V",
};

async function main() {
  if (!process.env.SANITY_AUTH_TOKEN) {
    throw new Error(
      "No auth token found -- run this via `npx sanity exec scripts/update-edition-index.ts --with-user-token`",
    );
  }

  for (const [slug, index] of Object.entries(INDEX_BY_SLUG)) {
    const doc = await client.fetch<{ _id: string } | null>(
      `*[_type == "edition" && slug.current == $slug][0]{_id}`,
      { slug },
    );
    if (!doc) throw new Error(`No edition found for slug "${slug}"`);
    await client.patch(doc._id).set({ index }).commit();
    console.log(`Updated ${slug}.index -> ${index}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
