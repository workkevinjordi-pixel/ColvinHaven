/**
 * One-time update (Figma node 391:1394): Craft names list and the two
 * publications' copy, ported verbatim from the current frame --
 * including "Runta master of the gardens" and
 * "Tsuki Edition be featured", which look like typos in Figma.
 *
 * Run via `npx sanity exec scripts/update-collective-text-figma-391-1394.ts
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
    throw new Error("Run via `npx sanity exec <script> --with-user-token`");
  }

  await client
    .patch("collectivePage")
    .set({
      "craft.row.main.text[1]": "Nyoman leads the craftsman.",
      "craft.row.main.text[2]": "Runta master of the gardens.",
    })
    .commit();

  await client
    .patch("th7bWPrtKjuxUYi2R4QMa6") // Wallpaper*
    .set({
      "paragraphs[1]":
        "“I wanted to create a sanctuary’ – discover a nature-conscious take on Balinese architecture.",
      "paragraphs[2]":
        "Umah Tsuki, the family home for Andrew Swallow, his wife, and their young daughter, sits perched above a verdant, sloping plot in the Balinese village of Tumbak Bayuh.",
    })
    .commit();

  await client
    .patch("4J7k6nYh4Ru5SeB9OZBOSr") // Design Anthology 39
    .set({
      "paragraphs[0]":
        "We are so pleased for our Tsuki Edition be featured in the September 2024 Edition of Design Anthology, the premier English-language interiors, design, architecture and urban living magazine.",
    })
    .commit();

  console.log("Updated collective text");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
