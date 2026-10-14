/**
 * One-time update: replaces the three captions on the singleton
 * "homepage" document's own quoteRow to match node 385:1262 (copy
 * ported verbatim from Figma, including "quitter" in the second one).
 * "\n" in a caption renders as a line break (.landing-quote-row__caption
 * uses white-space: pre-line). Images and every other field stay
 * untouched -- patch .set() on the caption paths only.
 *
 * Run via `npx sanity exec scripts/update-homepage-quote-row.ts
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

async function main() {
  if (!process.env.SANITY_AUTH_TOKEN) {
    throw new Error(
      "No auth token found -- run this via `npx sanity exec scripts/update-homepage-quote-row.ts --with-user-token`",
    );
  }

  const result = await client
    .patch("homepage")
    .set({
      "quoteRow[0].caption":
        "Designed to belong, Tsuki disappear into the landscape, honoring the land rather than overtaking it",
      "quoteRow[1].caption":
        "Seven steps down come up and the day gets quitter. Welcome to Sora.",
      "quoteRow[2].caption":
        "A door left open, and the room is already warm.\nA place to settle in.",
    })
    .commit();

  console.log(`Updated homepage.quoteRow captions: ${result._id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
