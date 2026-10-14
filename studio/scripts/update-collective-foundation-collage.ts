/**
 * One-time update: the two Foundation collage photos on the singleton
 * "collectivePage" document (node 391:1410) -- a dark timber house with
 * a round window above a garden stair (left), a man standing in a
 * timber doorway (right). Uploads both from public/assets/collective/
 * and patches foundation.collageImageA/B. Run from studio/ via
 * `npx sanity exec scripts/update-collective-foundation-collage.ts
 * --with-user-token`. Safe to re-run (uploads dedupe by content hash).
 */
import { createClient } from "@sanity/client";
import { createReadStream } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS = resolve(__dirname, "../../public/assets/collective");

const client = createClient({
  projectId: "2gbg82w2",
  dataset: "production",
  apiVersion: "2026-10-09",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

const IMAGES = {
  collageImageA: {
    file: "foundation-stair-landing.jpg",
    alt: "A dark timber house with a round window above a garden path and timber stair",
  },
  collageImageB: {
    file: "foundation-man-doorway.jpg",
    alt: "A man standing in the doorway of a dark timber-clad building",
  },
} as const;

async function main() {
  if (!process.env.SANITY_AUTH_TOKEN) {
    throw new Error(
      "No auth token found -- run this via `npx sanity exec scripts/update-collective-foundation-collage.ts --with-user-token`",
    );
  }

  const doc = await client.fetch<{ _id: string } | null>(
    `*[_type == "collectivePage"][0]{_id}`,
  );
  if (!doc) throw new Error("No collectivePage document found");

  const set: Record<string, unknown> = {};
  for (const [field, { file, alt }] of Object.entries(IMAGES)) {
    const asset = await client.assets.upload(
      "image",
      createReadStream(resolve(ASSETS, file)),
      { filename: file },
    );
    set[`foundation.${field}`] = {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt,
    };
    console.log(`Uploaded ${file} -> ${asset._id}`);
  }

  await client.patch(doc._id).set(set).commit();
  console.log(`Updated ${doc._id}.foundation collage images`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
