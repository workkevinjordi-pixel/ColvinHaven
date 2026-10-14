/**
 * One-time update: edition specs.
 * - Both editions: LOCATION "TUMBAK BAYUH, BALI" -> "MENGWI, BALI"
 *   (uppercase, matching the existing value's own casing and Figma's).
 * - Umah Tsuki: LAND SIZE "2000 m2" -> "2500 m2", YEAR "2022" -> "2023"
 *   (node 325:39482).
 * - Umah Sora: LAND SIZE -> "1500 M2" (casing as in Figma), YEAR ->
 *   "2026" (node 325:39582).
 * Patches by array index (specs order is LAND SIZE, YEAR, LOCATION) but
 * first verifies the labels so a reordered document fails loudly
 * instead of overwriting the wrong row. Nothing else on the documents
 * changes (header meta.location/meta.year included).
 *
 * Run via `npx sanity exec scripts/update-edition-specs.ts
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

const LOCATION = "MENGWI, BALI";
const UPDATES: Record<string, Record<string, string>> = {
  "umah-tsuki": { "LAND SIZE": "2500 m2", YEAR: "2023", LOCATION },
  "umah-sora": { "LAND SIZE": "1500 M2", YEAR: "2026", LOCATION },
};

async function main() {
  if (!process.env.SANITY_AUTH_TOKEN) {
    throw new Error(
      "No auth token found -- run this via `npx sanity exec scripts/update-edition-specs.ts --with-user-token`",
    );
  }

  for (const [slug, byLabel] of Object.entries(UPDATES)) {
    const doc = await client.fetch<{ _id: string; specs: { label: string; value: string }[] } | null>(
      `*[_type == "edition" && slug.current == $slug][0]{_id, specs}`,
      { slug },
    );
    if (!doc) throw new Error(`No edition found for slug "${slug}"`);

    const set: Record<string, string> = {};
    for (const [label, value] of Object.entries(byLabel)) {
      const i = doc.specs.findIndex((s) => s.label === label);
      if (i < 0) throw new Error(`${slug}: no "${label}" spec found`);
      set[`specs[${i}].value`] = value;
    }
    await client.patch(doc._id).set(set).commit();
    console.log(`Updated ${slug} specs:`, Object.values(byLabel).join(" | "));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
