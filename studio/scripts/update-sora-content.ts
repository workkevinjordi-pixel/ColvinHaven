/**
 * One-time update: fixes Umah Sora's own copy to match Figma node
 * 325:39567 (the Sora story frame).
 *
 * - `title` was literally "TSUKI (月 - Moon)" -- Tsuki's, duplicated
 *   onto Sora's document. Now "SORA (空 - Sky)", per direct instruction
 *   and that frame's own title node.
 * - `craftText` and `storyA.paragraphs` were the generic "Every Colvin
 *   Haven home is built by Indonesian master craftsmen..." boilerplate
 *   (the same text in both slots). Figma specs genuine Sora-specific
 *   copy for each -- ported verbatim.
 *
 * Deliberately NOT touched: row1, row4 and storyB's text. Figma marks
 * every one of those as a literal "Need text here" / "Add more text
 * here" placeholder, so there's no real copy to port; the existing
 * (Tsuki-derived) text stays until someone writes Sora's own, rather
 * than shipping the placeholder string itself. Same for `meta.year`,
 * which Figma self-contradicts on (2026 in the header row, 2022 in the
 * spec list, 2024 here).
 *
 * Run via `npx sanity exec scripts/update-sora-content.ts
 * --with-user-token` from within studio/. Safe to re-run -- a patch
 * .set() is idempotent.
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "2gbg82w2",
  dataset: "production",
  apiVersion: "2026-10-09",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

async function main() {
  if (!process.env.SANITY_AUTH_TOKEN) {
    throw new Error(
      "No auth token found -- run this via `npx sanity exec scripts/update-sora-content.ts --with-user-token`",
    );
  }

  const id = await client.fetch<string | null>(
    '*[_type=="edition" && slug.current=="umah-sora"][0]._id',
  );
  if (!id) throw new Error("No edition document with slug umah-sora");

  const result = await client
    .patch(id)
    .set({
      title: "SORA (空 - Sky)",
      craftText: [
        "The second express in our collection. Not a smaller version of Tsuki, but its true essence distilled.",
        "Where Tsuki was conceived for generous family living, Sora distils the same philosophy into an intimate, human scale. Every metre purposeful. Nothing wasted. Built entirely in-house design and execution, founder and craftsmen, nobody else.",
      ],
      "storyA.paragraphs": [
        "The materials carry the same discipline as Tsuki's sourced from the island, not shipped to it. Nothing brought in that the land here couldn't already give us. It's a smaller footprint by design, and a lighter one by necessity building well, here, has always meant building with what's already local.",
      ],
    })
    .commit();

  console.log(`Updated ${result._id} (umah-sora)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
