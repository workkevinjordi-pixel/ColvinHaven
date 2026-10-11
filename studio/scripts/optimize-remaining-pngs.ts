/**
 * One-time update: replaces the remaining three oversized PNG assets
 * found during a full-site Sanity integration audit (follow-up to
 * scripts/optimize-hero-image.ts, which fixed the same issue on
 * Homepage's hero image):
 *
 *  - newsPage.socialAction.bandImage (palm-trees-2.png, 4.32MB)
 *  - Umah Tsuki edition's row4.main.image (row4-main.png, 2.45MB)
 *  - Umah Tsuki edition's row4.side.image (row4-side.png, 3.78MB)
 *
 * Same cause every time: a PNG with an unused alpha channel, used for
 * plain photographic content. Re-exported as JPEGs (quality 82, same
 * pixel dimensions) -- see public/assets/collective/palm-trees-2.jpg
 * and public/assets/editions/detail/row4-{main,side}.jpg.
 *
 * Run via `npx sanity exec scripts/optimize-remaining-pngs.ts
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

async function uploadImage(relPath: string, filename: string) {
  const buffer = readFileSync(resolve(PUBLIC_DIR, `.${relPath}`));
  console.log(`Uploading ${relPath} (${(buffer.length / 1024 / 1024).toFixed(2)}MB)...`);
  const asset = await client.assets.upload("image", buffer, { filename });
  console.log(`  -> ${asset._id}`);
  return { _type: "reference" as const, _ref: asset._id };
}

async function main() {
  if (!process.env.SANITY_AUTH_TOKEN) {
    throw new Error(
      "No auth token found -- run this via `npx sanity exec scripts/optimize-remaining-pngs.ts --with-user-token`",
    );
  }

  const palmTreesRef = await uploadImage("/assets/collective/palm-trees-2.jpg", "palm-trees-2.jpg");
  await client
    .patch("newsPage")
    .set({ "socialAction.bandImage.asset": palmTreesRef })
    .commit();
  console.log("Updated newsPage.socialAction.bandImage");

  const row4MainRef = await uploadImage("/assets/editions/detail/row4-main.jpg", "row4-main.jpg");
  const row4SideRef = await uploadImage("/assets/editions/detail/row4-side.jpg", "row4-side.jpg");
  const tsuki = await client.fetch<{ _id: string } | null>(
    '*[_type=="edition" && name=="Umah Tsuki"][0]{_id}',
  );
  if (!tsuki) throw new Error("Umah Tsuki edition document not found.");
  await client
    .patch(tsuki._id)
    .set({
      "row4.main.image.asset": row4MainRef,
      "row4.side.image.asset": row4SideRef,
    })
    .commit();
  console.log(`Updated edition ${tsuki._id} (Umah Tsuki) row4 images`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
