/**
 * One-time update: changes the singleton "homepage" document's own
 * cta.text from "Those who find us, were meant to." to "Visit one of
 * our projects by invitation". Leaves every other field on the
 * document (including cta.buttonLabel/buttonHref) untouched.
 *
 * Run via `npx sanity exec scripts/update-homepage-cta.ts
 * --with-user-token` from within studio/, same mechanism as
 * scripts/update-collective-intro.ts. Safe to re-run -- a patch .set()
 * is idempotent.
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
      "No auth token found -- run this via `npx sanity exec scripts/update-homepage-cta.ts --with-user-token`",
    );
  }

  const result = await client
    .patch("homepage")
    .set({ "cta.text": "Visit one of our projects by invitation" })
    .commit();

  console.log(`Updated homepage.cta.text: ${result._id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
