/**
 * One-time update: the singleton "collectivePage" document's
 * inspiration.heading "Inspiration" -> "INSPIRATIONS" (node 401:84 on
 * the Collective frame, 391:1394 -- literal uppercase and plural, as in
 * Figma). Patch .set() on that one field only.
 *
 * Run via `npx sanity exec scripts/update-collective-inspiration-heading.ts
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
      "No auth token found -- run this via `npx sanity exec scripts/update-collective-inspiration-heading.ts --with-user-token`",
    );
  }

  const doc = await client.fetch<{ _id: string } | null>(
    `*[_type == "collectivePage"][0]{_id}`,
  );
  if (!doc) throw new Error("No collectivePage document found");

  await client
    .patch(doc._id)
    .set({ "inspiration.heading": "INSPIRATIONS" })
    .commit();
  console.log(`Updated ${doc._id}.inspiration.heading`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
