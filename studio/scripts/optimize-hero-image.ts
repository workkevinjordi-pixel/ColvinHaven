/**
 * One-time update: replaces the singleton "homepage" document's own
 * hero.backgroundImage asset with an optimized JPEG. The original
 * (/assets/hero-bg.png, now deleted) was a 6.6MB PNG with an unused
 * alpha channel -- by far the largest asset anywhere in this project
 * (everything else is 100-470KB) -- which measurably slowed down
 * Studio's publish step for the Homepage document specifically (it has
 * to confirm every referenced asset is fully uploaded/processed before
 * a publish can complete). Re-exported as public/assets/hero-bg.jpg
 * (quality 80, no alpha, same 3018x1416 dimensions) -- 1.1MB, keeps
 * the same hero.backgroundImage.alt ("").
 *
 * Run via `npx sanity exec scripts/optimize-hero-image.ts
 * --with-user-token` from within studio/, same mechanism as
 * scripts/update-editions-intro.ts. Safe to re-run -- uploads a fresh
 * asset and re-patches the reference each time (the old asset, if
 * unreferenced after this, can be cleaned up separately in the Studio's
 * own Media library).
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

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
      "No auth token found -- run this via `npx sanity exec scripts/optimize-hero-image.ts --with-user-token`",
    );
  }

  const filePath = resolve(__dirname, "../../public/assets/hero-bg.jpg");
  const buffer = readFileSync(filePath);
  console.log(`Uploading optimized hero-bg.jpg (${(buffer.length / 1024 / 1024).toFixed(2)}MB)...`);
  const asset = await client.assets.upload("image", buffer, { filename: "hero-bg.jpg" });
  console.log(`  uploaded -> ${asset._id}`);

  const result = await client
    .patch("homepage")
    .set({
      "hero.backgroundImage.asset": { _type: "reference", _ref: asset._id },
    })
    .commit();

  console.log(`Updated homepage.hero.backgroundImage: ${result._id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
