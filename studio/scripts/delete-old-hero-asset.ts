/**
 * One-off cleanup: deletes the old 6.6MB hero-bg.png asset from
 * Sanity's asset store now that nothing references it (superseded by
 * the optimized hero-bg.jpg, see scripts/optimize-hero-image.ts).
 * Run via `npx sanity exec scripts/delete-old-hero-asset.ts
 * --with-user-token` from within studio/.
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
      "No auth token found -- run this via `npx sanity exec scripts/delete-old-hero-asset.ts --with-user-token`",
    );
  }
  const id = "image-1e7e84004c90551ad8686e62f2a577646b258ede-3018x1416-png";
  const result = await client.delete(id);
  console.log("Deleted old asset:", result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
