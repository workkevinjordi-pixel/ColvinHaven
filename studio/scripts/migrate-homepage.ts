/**
 * One-time migration: populates the singleton "homepage" document
 * (_id: "homepage") with the exact content already live on the site --
 * from components/Hero.tsx, components/landing/CraftingStatement.tsx,
 * components/landing/HomeQuoteRow.tsx, app/page.tsx's own SHARED_COPY
 * + TextIntro usages, components/landing/ApproachGallery.tsx, and the
 * homepage's own Cta override in app/page.tsx.
 *
 * Run via `npx sanity exec scripts/migrate-homepage.ts --with-user-token`
 * from within studio/ -- same mechanism as scripts/migrate.ts, see that
 * file's own comment.
 *
 * Uses createIfNotExists (not create) since this is a singleton with
 * an explicit, predictable _id -- safe to re-run without either
 * erroring on a duplicate or clobbering any edits already made in the
 * Studio since the first run.
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

const PUBLIC_DIR = resolve(__dirname, "../../public");
const assetCache = new Map<string, { _type: "reference"; _ref: string }>();

async function uploadImage(src: string) {
  const cached = assetCache.get(src);
  if (cached) return cached;
  const filePath = resolve(PUBLIC_DIR, `.${src}`);
  const buffer = readFileSync(filePath);
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

// Verbatim from app/page.tsx's own SHARED_COPY -- the exact same three
// paragraphs the live homepage passes to both TextIntro instances.
const SHARED_COPY = [
  "Every CH home is a singular commission one family, one landscape, one house that will never be built again.",
  "The language is constant. Restraint, learned in kitchens rather than classrooms. Materials chosen for how they feel, not how they photograph. A kitchen at the center of every home, because that's where a life is actually lived. What changes is the canvas the land, the light, the hands each place gives us to build with.",
  "Umah Tsuki and Sora are both written in Indonesia. They are the first two homes in a language built to travel one country, one canvas, at a time.",
];

async function main() {
  if (!process.env.SANITY_AUTH_TOKEN) {
    throw new Error(
      "No auth token found -- run this via `npx sanity exec scripts/migrate-homepage.ts --with-user-token`",
    );
  }

  console.log("Uploading homepage images and building the document...");

  const doc = {
    _id: "homepage",
    _type: "homepage" as const,
    hero: {
      title: "Colvin Haven",
      tagline: "Architectural Editions",
      backgroundImage: await img("/assets/hero-bg.png", ""),
    },
    craftingStatement: {
      heading: "CRAFTING SPACES, LIVING SLOWLY.",
      body: "Colvin Haven creates limited edition homes designed for the next chapter of living, where silence is luxury and presence is a new power.",
    },
    quoteRow: [
      {
        _type: "quoteRowItem" as const,
        _key: "quote-1",
        image: await img(
          "/assets/news/pullquote-ceiling-detail.jpg",
          "A warm timber ceiling and roofline overhang above a dark board-and-batten facade",
        ),
        caption:
          "“Designed to belong, Tsuki editions disappear into the landscape, honoring the land rather than overtaking it”",
      },
      {
        _type: "quoteRowItem" as const,
        _key: "quote-2",
        image: await img(
          "/assets/homequoterow-corridor-steps.jpg",
          "A covered timber walkway leading down a staircase toward a garden gate",
        ),
        caption:
          "Twenty years of service taught one thing above all a home doesn't gather around a view, it gathers around a kitchen.",
      },
      {
        _type: "quoteRowItem" as const,
        _key: "quote-3",
        image: await img(
          "/assets/homequoterow-shoji-bedroom.jpg",
          "A shoji-screened bedroom corner with a low bed and two wall sconces",
        ),
        caption:
          "Twenty years of service taught one thing above all a home doesn't gather around a view, it gathers around a kitchen.",
      },
    ],
    editionsIntro: {
      heading: "Editions",
      paragraphs: SHARED_COPY,
      linkLabel: "Editions",
      linkHref: "/editions",
    },
    approachGallery: [
      {
        _type: "approachGalleryItem" as const,
        _key: "approach-1",
        image: await img(
          "/assets/editions/editions-filmstrip-shrine.jpg",
          "Balinese ceremonial umbrellas atop a stone shrine, seen through palm fronds",
        ),
        caption: "Approach",
      },
      {
        _type: "approachGalleryItem" as const,
        _key: "approach-2",
        image: await img(
          "/assets/editions/editions-filmstrip-living-room.jpg",
          "A corner living room opening onto a jungle canopy through floor-to-ceiling glass",
        ),
        caption: "Tresholds",
      },
      {
        _type: "approachGalleryItem" as const,
        _key: "approach-3",
        image: await img(
          "/assets/editions/editions-filmstrip-timber-wall.jpg",
          "Dark timber cladding above an outdoor daybed, seen against the surrounding jungle",
        ),
        caption: "Stillness",
      },
      {
        _type: "approachGalleryItem" as const,
        _key: "approach-4",
        image: await img(
          "/assets/editions/editions-filmstrip-lounge.jpg",
          "A grey sofa with an orange throw pillow beside a window looking onto banana leaves",
        ),
        caption: "Gathering",
      },
      {
        _type: "approachGalleryItem" as const,
        _key: "approach-5",
        image: await img(
          "/assets/editions/editions-filmstrip-koi-pond.jpg",
          "A stone-edged koi pond beneath a dark timber deck",
        ),
        caption: "The Koi",
      },
    ],
    collectiveIntro: {
      heading: "Collective",
      paragraphs: SHARED_COPY,
      linkLabel: "Dive Deeper",
      linkHref: "/collective",
    },
    cta: {
      text: "Those who find us, were meant to.",
      buttonLabel: "Write to Us",
      buttonHref: "/write-to-us",
    },
  };

  const result = await client.createIfNotExists(doc);
  console.log(`\nHomepage document ready: ${result._id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
