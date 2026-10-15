/**
 * One-time update (Figma node 385:14): adds the trailing periods the
 * current Homepage frame has on the editions subtitle and the first
 * quote-row caption. Patch .set() on those two paths only.
 *
 * Run via `npx sanity exec scripts/update-homepage-text-periods.ts
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
      "No auth token found -- run this via `npx sanity exec scripts/update-homepage-text-periods.ts --with-user-token`",
    );
  }

  const result = await client
    .patch("homepage")
    .set({
      "editionsIntro.subtitle": "Cut form the same cloth, different in size.",
      "quoteRow[0].caption":
        "Designed to belong, Tsuki disappear into the landscape, honoring the land rather than overtaking it.",
    })
    .commit();

  console.log(`Updated homepage text: ${result._id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
