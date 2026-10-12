/**
 * One-time update: repoints the homepage's "Editions" intro CTA from
 * "Request access" (-> /request-the-collections) to "Dive deeper"
 * (-> /editions), per direct instruction. The label briefly read "Deep
 * Diver" before being corrected here; the href was right from the
 * start. Only the two link fields are touched -- the
 * eyebrow/heading/subtitle/lead/paragraphs set by
 * scripts/update-editions-intro.ts all stay exactly as they are.
 *
 * Run via `npx sanity exec scripts/update-editions-intro-link.ts
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
      "No auth token found -- run this via `npx sanity exec scripts/update-editions-intro-link.ts --with-user-token`",
    );
  }

  const result = await client
    .patch("homepage")
    .set({
      "editionsIntro.linkLabel": "Dive deeper",
      "editionsIntro.linkHref": "/editions",
    })
    .commit();

  console.log(`Updated homepage.editionsIntro link: ${result._id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
