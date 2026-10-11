/**
 * One-off fix: an in-progress unpublished draft (drafts.homepage) was
 * found sitting on top of the published "homepage" document, last
 * touched 2026-10-11T13:24:31Z. It predates both the Editions (node
 * 385:1275) and Collective (node 385:1370) intro redesigns, and still
 * pointed at the old 6.6MB hero-bg.png asset -- publishing it as-is
 * would have reverted both redesigns AND re-attached the oversized
 * image, undoing scripts/optimize-hero-image.ts.
 *
 * The draft also carries two real pending edits of its own (not made
 * by any script): a rewritten hero.backgroundImage.alt (real
 * accessibility text, replacing the "" this project's own migration
 * scripts always left blank) and a tightened craftingStatement.body
 * wording. Both are left completely untouched here -- this patch only
 * brings the three stale/conflicting fields (editionsIntro,
 * collectiveIntro, hero.backgroundImage.asset) up to date with the
 * current published content, so the next Publish in Studio carries
 * forward just those two real edits without reverting anything else.
 *
 * Run via `npx sanity exec scripts/sync-draft-homepage.ts
 * --with-user-token` from within studio/. Safe to re-run.
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "2gbg82w2",
  dataset: "production",
  apiVersion: "2026-10-09",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
  perspective: "raw",
});

async function main() {
  if (!process.env.SANITY_AUTH_TOKEN) {
    throw new Error(
      "No auth token found -- run this via `npx sanity exec scripts/sync-draft-homepage.ts --with-user-token`",
    );
  }

  const published = await client.fetch('*[_id=="homepage"][0]{editionsIntro, collectiveIntro, "heroAsset": hero.backgroundImage.asset}');
  if (!published) throw new Error("Published homepage document not found.");

  const result = await client
    .patch("drafts.homepage")
    .set({
      editionsIntro: published.editionsIntro,
      collectiveIntro: published.collectiveIntro,
      "hero.backgroundImage.asset": published.heroAsset,
    })
    .commit();

  console.log(`Synced drafts.homepage: ${result._id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
