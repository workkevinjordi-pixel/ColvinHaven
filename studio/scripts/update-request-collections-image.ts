/**
 * One-time update: the singleton "requestCollectionsPage" document's
 * image (node 407:620) -- a dark, grayscale water surface, the same
 * photo Write to Us already uses (public/assets/write-to-us-water.jpg).
 * Uploads it and patches `image`. Run from studio/ via
 * `npx sanity exec scripts/update-request-collections-image.ts
 * --with-user-token`. Safe to re-run (uploads dedupe by content hash).
 */
import { createClient } from "@sanity/client";
import { createReadStream } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE = resolve(__dirname, "../../public/assets/write-to-us-water.jpg");

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
      "No auth token found -- run this via `npx sanity exec scripts/update-request-collections-image.ts --with-user-token`",
    );
  }

  const doc = await client.fetch<{ _id: string } | null>(
    `*[_type == "requestCollectionsPage"][0]{_id}`,
  );
  if (!doc) throw new Error("No requestCollectionsPage document found");

  const asset = await client.assets.upload("image", createReadStream(FILE), {
    filename: "write-to-us-water.jpg",
  });
  await client
    .patch(doc._id)
    .set({
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: "Dark, rippling water at dusk, in grayscale",
      },
    })
    .commit();
  console.log(`Updated ${doc._id}.image -> ${asset._id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
