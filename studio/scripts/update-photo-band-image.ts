/**
 * One-time update: replaces collectivePage.photoBand (the standalone
 * band between Craft and Inspiration) with a new sunset-palms photo,
 * converted to WebP (quality 85, resampled to ~1900px wide -- the
 * band displays at 1320x588, so this comfortably covers retina
 * without carrying the source's full 4096px width). Old asset deleted
 * once confirmed unreferenced.
 *
 * Run via `npx sanity exec scripts/update-photo-band-image.ts
 * --with-user-token` from within studio/. Safe to re-run.
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = resolve(__dirname, "../../public");

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
      "No auth token found -- run this via `npx sanity exec scripts/update-photo-band-image.ts --with-user-token`",
    );
  }

  const before = await client.fetch<{ assetId?: string } | null>(
    '*[_id=="collectivePage"][0]{"assetId": photoBand.asset._ref}',
  );
  const oldAssetId = before?.assetId;

  const buffer = readFileSync(resolve(PUBLIC_DIR, "./assets/collective/collective-sunset-palms.webp"));
  console.log(`Uploading collective-sunset-palms.webp (${(buffer.length / 1024).toFixed(0)}KB)...`);
  const asset = await client.assets.upload("image", buffer, { filename: "collective-sunset-palms.webp" });
  console.log(`  -> ${asset._id}`);

  await client
    .patch("collectivePage")
    .set({
      photoBand: {
        asset: { _type: "reference", _ref: asset._id },
        alt: "Silhouetted coconut palms along a ridge, the sun glowing hazy orange behind them at dusk",
      },
    })
    .commit();
  console.log("Updated collectivePage.photoBand");

  if (oldAssetId && oldAssetId !== asset._id) {
    const refs = await client.fetch<number>("count(*[references($id)])", { id: oldAssetId });
    if (refs === 0) {
      await client.delete(oldAssetId);
      console.log(`Deleted old asset: ${oldAssetId}`);
    } else {
      console.log(`Old asset ${oldAssetId} still referenced by ${refs} document(s) -- not deleted`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
