/**
 * One-time update: a second re-sync against the same Figma frame (node
 * 391:1394) as it kept evolving since scripts/update-collective-page-
 * redesign.ts ran. This pass:
 *
 *  - Foundation/Craft both move from "heading + dot-tag" to "eyebrow +
 *    heading sentence" -- `tag` now holds the short eyebrow text,
 *    `heading` now holds the longer sentence (repurposing both
 *    existing fields rather than adding new ones).
 *  - Foundation's paragraphs drop two short lines ("The medium
 *    changed..."/"The kitchen grew...") and gain a new standalone
 *    `closingNote`.
 *  - Craft's paragraphs drop their old opening line ("Behind every
 *    home is the same team.") -- it's now the heading instead, reworded.
 *  - No image/gallery changes this pass -- every photo in this frame
 *    is byte-identical to what's already uploaded (verified via a
 *    content-length/dimension check before writing this script), so
 *    nothing is re-uploaded here.
 *
 * Run via `npx sanity exec scripts/update-collective-page-redesign-v2.ts
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
      "No auth token found -- run this via `npx sanity exec scripts/update-collective-page-redesign-v2.ts --with-user-token`",
    );
  }

  const result = await client
    .patch("collectivePage")
    .set({
      "foundation.tag": "FOUNDATION",
      "foundation.heading": "A chef who learned to design and build homes.",
      "foundation.paragraphs": [
        "Andrew trained as a cook at the Culinary Institute of America and worked in Michelin-starred restaurants in New York and San Francisco. In 2006 he helped open the first Mixt in San Francisco's Financial District, his first restaurant business. Chef-driven, it brought farm-to-table seasonality, sustainability and health to everyday eating, part of the first wave of American restaurants to do it, with spaces built to LEED green-building guidelines.",
        "In time, designing restaurants became the part of the work he loved most. So he left, to chase it fully.",
        "He stepped away from Mixt for the thing he could no longer ignore: architecture and design. His first project was designing and building Umah Tsuki, a home on a sloping site in Bali. From it grew Colvin Haven, a quiet collective of designers, architects and craftspeople, its name a coinage of his middle name and his daughter's first, built on one belief: that a home, like a dish, should be felt before it's seen.",
        "Umah Tsuki became the proof, a sanctuary praised by Wallpaper* and Design Anthology for the quiet intentionality he once brought to a plate. Today it is both Colvin Haven's showroom and his family's home. Sora followed, built for the collective's first client, and two more homes are taking shape. Only a limited number will ever be built, never meant to scale.",
        "Today, with Colvin Haven, he creates limited-edition homes in Indonesia, built from local materials and made for wellness. He curates the whole experience, from architecture to table.",
      ],
      "foundation.closingNote": "He once fed people. Now he gives them somewhere to be still",

      "craft.tag": "COLLECTIVE",
      "craft.heading": "Behind every home is the same local team",
      "craft.row.main.text": [
        "Astrid leads the architecture.",
        "Nyoman leads the build.",
        "Runta is the master of the gardens.",
        "Around them, Indonesian designers and engineers, joiners and stonemasons, all local to the land they build on, working on site beside the founder for as long as each home takes.",
        "We plant the trees before we build. We carry into every home the same sustainable design approaches the founder first practiced at Mixt: responsible materials, light on the land. The most sustainable home is the one that is never torn down, so we build slowly, to last.",
      ],
    })
    .commit();

  console.log(`Collective page redesign (v2) applied: ${result._id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
