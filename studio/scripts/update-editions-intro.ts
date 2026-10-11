/**
 * One-time update: redesigns the singleton "homepage" document's own
 * editionsIntro field to match node 385:1275 ("Editions" intro
 * redesign) -- adds the eyebrow/subtitle/lead fields and replaces the
 * old three-paragraph SHARED_COPY body with the new single body
 * paragraph, new heading, and new "Request access" link. Leaves every
 * other field on the document untouched (patch, not a full
 * createIfNotExists rewrite) -- collectiveIntro keeps its own original
 * shape.
 *
 * Run via `npx sanity exec scripts/update-editions-intro.ts
 * --with-user-token` from within studio/, same mechanism as
 * scripts/migrate-homepage.ts. Safe to re-run -- a patch .set() is
 * idempotent.
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
      "No auth token found -- run this via `npx sanity exec scripts/update-editions-intro.ts --with-user-token`",
    );
  }

  const result = await client
    .patch("homepage")
    .set({
      "editionsIntro.eyebrow": "EDITIONS",
      "editionsIntro.heading": "TSUKI, THE MOON. SORA, THE SKY",
      "editionsIntro.subtitle": "Cut form the same cloth, different in size",
      "editionsIntro.lead": "Stillness and wellness, built into every room.",
      "editionsIntro.paragraphs": [
        "Entirely turnkey. Tell us where you'd like to wake, and how many bedrooms. The rest is ours: architecture, interiors, landscape, and the build itself, managed start to finish.",
      ],
      "editionsIntro.linkLabel": "Request access",
      "editionsIntro.linkHref": "/request-the-collections",
    })
    .commit();

  console.log(`Updated homepage.editionsIntro: ${result._id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
