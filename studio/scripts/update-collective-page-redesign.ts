/**
 * One-time update: redesigns the "collectivePage" document to match
 * node 391:1394 -- new Foundation tag + bio copy + two new collage
 * photos, new "COLLECTIVE"-heading Craft section with new team-bio
 * copy (same images), and an Inspiration section rewritten entirely
 * (no more label tag, new copy, new five-photo gallery replacing the
 * old filmstrip -- that field is unset, not just left stale).
 *
 * Run via `npx sanity exec scripts/update-collective-page-redesign.ts
 * --with-user-token` from within studio/. Safe to re-run -- uploads
 * fresh assets and re-patches every field each time.
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

const assetCache = new Map<string, { _type: "reference"; _ref: string }>();

async function uploadImage(src: string) {
  const cached = assetCache.get(src);
  if (cached) return cached;
  const buffer = readFileSync(resolve(PUBLIC_DIR, `.${src}`));
  const filename = src.split("/").pop()!;
  const asset = await client.assets.upload("image", buffer, { filename });
  const ref = { _type: "reference" as const, _ref: asset._id };
  assetCache.set(src, ref);
  console.log(`  uploaded ${src} -> ${asset._id}`);
  return ref;
}

async function img(src: string, alt: string) {
  return { asset: await uploadImage(src), alt };
}

async function main() {
  if (!process.env.SANITY_AUTH_TOKEN) {
    throw new Error(
      "No auth token found -- run this via `npx sanity exec scripts/update-collective-page-redesign.ts --with-user-token`",
    );
  }

  console.log("Uploading Collective page redesign images...");

  const result = await client
    .patch("collectivePage")
    .set({
      "foundation.tag": "A cook who learned to build homes.",
      "foundation.collageImageA": await img(
        "/assets/collective/foundation-rope-chair-deck.jpg",
        "A woven rope lounge chair on a dark timber deck, backed by lush ferns",
      ),
      "foundation.collageImageB": await img(
        "/assets/collective/foundation-man-stairs-garden.jpg",
        "A man descending timber stairs beside a stone-edged pond, palms overhead",
      ),
      "foundation.paragraphs": [
        "Andrew trained as a cook at the Culinary Institute of America and worked in Michelin-starred restaurants in New York and San Francisco. In 2006 he helped open the first Mixt in San Francisco's Financial District, his first restaurant business. Chef-driven, it brought farm-to-table seasonality, sustainability and health to everyday eating, part of the first wave of American restaurants to do it, with spaces built to LEED green-building guidelines.",
        "In time, designing restaurants became the part of the work he loved most. So he left, to chase it fully.",
        "He stepped away from Mixt for the thing he could no longer ignore: architecture and design. His first project was designing and building Umah Tsuki, a home on a sloping site in Bali. From it grew Colvin Haven, a quiet collective of designers, architects and craftspeople, its name a coinage of his middle name and his daughter's first, built on one belief: that a home, like a dish, should be felt before it's seen.",
        "Umah Tsuki became the proof, a sanctuary praised by Wallpaper* and Design Anthology for the quiet intentionality he once brought to a plate. Today it is both Colvin Haven's showroom and his family's home. Sora followed, built for the collective's first client, and two more homes are taking shape. Only a limited number will ever be built, never meant to scale.",
        "The medium changed. The instinct never did.",
        "The kitchen grew into a home.",
        "Today, with Colvin Haven, he creates limited-edition homes in Indonesia, built from local materials and made for wellness. He curates the whole experience, from architecture to table.",
        "He once fed people. Now he gives them somewhere to be still.",
      ],

      "craft.heading": "COLLECTIVE",
      "craft.row.main.text": [
        "Behind every home is the same team.",
        "Astrid leads the architecture.",
        "Nyoman leads the build.",
        "Runta is the master of the gardens.",
        "Around them, Indonesian designers and engineers, joiners and stonemasons, all local to the land they build on, working on site beside the founder for as long as each home takes.",
        "We plant the trees before we build. We carry into every home the same sustainable design approaches the founder first practiced at Mixt: responsible materials, light on the land. The most sustainable home is the one that is never torn down, so we build slowly, to last.",
      ],

      "inspiration.heading": "Inspiration",
      "inspiration.paragraphs": [
        "The design language draws from two traditions at once: Japanese and Scandinavian, the schools that understood restraint long before it was a trend. Danish design in particular, furniture and interiors built on the same instinct as a well-run kitchen, nothing decorative, everything earning its place.",
        "Twenty years of service taught one thing above all: people gather in the kitchen, not the living room. So in every Colvin Haven home, the kitchen is never an afterthought. It's the room the rest of the house is built around.",
        "We borrow from nature the space upon which we build.",
      ],
      inspirationGallery: [
        await img(
          "/assets/collective/inspiration-bamboo-lounge-chair.jpg",
          "A dark timber lounge chair against a bamboo grove",
        ),
        await img(
          "/assets/collective/inspiration-stone-wall-pine.jpg",
          "A cloud-pruned pine beside a concrete wall and dark timber house",
        ),
        await img(
          "/assets/collective/inspiration-timber-batten-detail.jpg",
          "A pale timber batten set into a dark board-and-batten wall",
        ),
        await img(
          "/assets/collective/inspiration-temple-umbrellas-stairs.jpg",
          "Balinese ceremonial umbrellas atop a stone shrine, seen through palms",
        ),
        await img(
          "/assets/collective/inspiration-timber-bench-pond.jpg",
          "A timber bench on a deck overlooking a stone-edged pond",
        ),
      ].map((image, i) => ({ _type: "imageWithAlt" as const, _key: `gallery-${i + 1}`, ...image })),
    })
    .unset(["inspiration.tag", "filmstrip"])
    .commit();

  console.log(`\nCollective page redesign applied: ${result._id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
