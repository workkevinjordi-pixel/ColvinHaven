/**
 * One-time migration: populates five more singleton page documents
 * with the exact content already live on the site --
 * collectivePage, contactPage, requestCollectionsPage, editionsPage,
 * newsPage. Same mechanism/discipline as scripts/migrate-homepage.ts
 * (see that file's own comment): run via
 * `npx sanity exec scripts/migrate-pages.ts --with-user-token` from
 * within studio/, createIfNotExists per doc so re-running is safe.
 *
 * Source components:
 *  - collectivePage:        components/collective/{Foundation,Craft,
 *                            PhotoBand,Inspiration}.tsx +
 *                            app/collective/page.tsx's own REEL
 *  - contactPage:            components/write-to-us/WriteToUsSection.tsx
 *  - requestCollectionsPage: components/request-collections/
 *                            RequestCollectionsSection.tsx
 *  - editionsPage:           components/editions/EditionsHero.tsx
 *  - newsPage:               components/news/{WhatsCooking,
 *                            NewsFilmstripBand,MoriProfile,
 *                            SocialAction,PullQuote}.tsx
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

// Same five photos Collective and News both use in their own
// filmstrip, each page keeps its own independently-editable copy of
// this array -- matching how the live components already duplicate
// this REEL constant rather than sharing one import (see
// NewsFilmstripBand.tsx's own comment on this).
async function filmstripReel() {
  return [
    {
      _type: "filmstripImage" as const,
      _key: "reel-1",
      image: await img(
        "/assets/collective/filmstrip-lounge-chair.jpg",
        "A dark timber lounge chair on a deck backed by bamboo",
      ),
      wide: false,
    },
    {
      _type: "filmstripImage" as const,
      _key: "reel-2",
      image: await img(
        "/assets/collective/filmstrip-bonsai-wall.jpg",
        "A cloud-pruned pine beside a stone wall and dark timber house",
      ),
      wide: true,
    },
    {
      _type: "filmstripImage" as const,
      _key: "reel-3",
      image: await img(
        "/assets/collective/filmstrip-timber-edge.jpg",
        "A pale timber batten set into a dark board-and-batten wall",
      ),
      wide: false,
    },
    {
      _type: "filmstripImage" as const,
      _key: "reel-4",
      image: await img(
        "/assets/collective/filmstrip-shrine-umbrellas.jpg",
        "Balinese ceremonial umbrellas atop a stone shrine, seen through palms",
      ),
      wide: true,
    },
    {
      _type: "filmstripImage" as const,
      _key: "reel-5",
      image: await img(
        "/assets/collective/filmstrip-bench-pond.jpg",
        "A timber bench on a deck overlooking a stone-edged pond",
      ),
      wide: false,
    },
  ];
}

async function migrateCollectivePage() {
  const doc = {
    _id: "collectivePage",
    _type: "collectivePage" as const,
    foundation: {
      heading: "Foundation",
      tag: "BACKGROUND STORY",
      collageImageA: await img(
        "/assets/collective/foundation-river-stones.jpg",
        "River stones and a large boulder against a black timber base",
      ),
      collageImageB: await img(
        "/assets/collective/foundation-portrait.jpg",
        "A black-and-white portrait of a man descending timber stairs beside a Colvin Haven home",
      ),
      paragraphs: [
        "Twenty years in kitchens, not classrooms Gramercy Tavern, Gary Danko, and co-founding Mixt before the first Colvin Haven home was ever built. No architecture degree, no design training. What came instead was real: building out Mixt's restaurants, then designing Umah Tsuki from nothing. The discipline every good kitchen teaches carried straight through the best result is never the largest, it's the most precisely composed.",
        "That instinct is the entire practice. Every material chosen for what it does, not what it announces. Every room built around how a body actually wants to move through a day. Nothing added that isn't earning its place the same rule that once applied to a plate, now applied to a home.",
        "The philosophy hasn't changed. Only the medium.",
        "Where Andrew once asked how food could nourish a person's body, mind, community. He now asks the same of the spaces they inhabit. A Colvin Haven home is, at its heart, an act of nourishment. Conceived entirely for one family. Completed entirely by hand.",
      ],
    },
    craft: {
      heading: "Craft",
      tag: "THE CORE",
      row: {
        main: {
          image: await img(
            "/assets/collective/craft-detail.png",
            "A timber A-frame hoist unloading materials from a delivery truck on site",
          ),
          text: [
            "Every Colvin Haven home is built by Indonesian master craftsmen and artisans whose knowledge of local timber, stone, and joinery has passed through generations.",
            "It's the core of how these homes get made. Colvin Haven doesn't design a home and then have it built. The two happen together, craftsman and founder, on site, for as long as each home takes. We offer a limited turnkey home to our clients.",
            "Materials are chosen the same way ingredients once were — for provenance, not convenience. Paras stone quarried in Bali. Ulin hardwood, reclaimed rather than freshly felled. Teak, hand-cut and laid by local woodworkers who've done this for generations. Nothing shipped in that the island couldn't already give.",
          ],
        },
        side: {
          image: await img(
            "/assets/collective/craft-tall.png",
            "An Indonesian craftsman assembling a wooden lattice panel in a workshop",
          ),
        },
      },
    },
    photoBand: await img(
      "/assets/collective/collective-sunset-palms.webp",
      "Silhouetted coconut palms along a ridge, the sun glowing hazy orange behind them at dusk",
    ),
    inspiration: {
      heading: "Inspiration",
      tag: "WARM WELCOME TO OUR COLLECTIONS",
      paragraphs: [
        "The design language draws from two traditions at once. Japanese and Scandinavian, the two schools that understood minimalism before the word existed. Danish design in particular: furniture and interiors built on the same instinct as a well-run kitchen, nothing decorative, everything earning its place.",
        "That instinct extends to how a home is organized around living, not just looking. Twenty years of service taught one thing above all: people gather in the kitchen, not the living room. So in every Colvin Haven home, the kitchen is never an afterthought it's the room the rest of the house is built around.",
      ],
    },
    filmstrip: await filmstripReel(),
  };
  const result = await client.createIfNotExists(doc);
  console.log(`Collective page ready: ${result._id}`);
}

async function migrateContactPage() {
  const doc = {
    _id: "contactPage",
    _type: "contactPage" as const,
    heading: "Write to Us",
    image: await img(
      "/assets/write-to-us-water.jpg",
      "Dark, textured ocean water seen from above",
    ),
    tag: "LET US KNOW YOUR THOUGHTS",
    intro:
      "Whether one of the remaining Editions feels right, or you'd simply like to know more about the practice, we'd genuinely love to hear from you.",
    submitLabel: "Send",
  };
  const result = await client.createIfNotExists(doc);
  console.log(`Contact page ready: ${result._id}`);
}

async function migrateRequestCollectionsPage() {
  const doc = {
    _id: "requestCollectionsPage",
    _type: "requestCollectionsPage" as const,
    heading: "The Collections",
    image: await img(
      "/assets/request-collection/porch-detail.jpg",
      "A shou sugi ban-clad entrance with a timber bench, seen beneath an overhanging shingled roof",
    ),
    tag: "Access to CH Collections",
    intro:
      "Seven Editions, total, ever. A private look at where each one stands today, and which are still able to be claimed.",
    submitLabel: "Request the collections",
    privacyNote: "Sent privately. Never shared. Never published.",
  };
  const result = await client.createIfNotExists(doc);
  console.log(`Request the Collections page ready: ${result._id}`);
}

async function migrateEditionsPage() {
  const doc = {
    _id: "editionsPage",
    _type: "editionsPage" as const,
    heroImage: await img(
      "/assets/editions/editions-hero-palms-sunset.jpg",
      "Silhouetted palm trees against an amber sunset sky",
    ),
  };
  const result = await client.createIfNotExists(doc);
  console.log(`Editions page ready: ${result._id}`);
}

async function migrateNewsPage() {
  const doc = {
    _id: "newsPage",
    _type: "newsPage" as const,
    whatsCooking: {
      heading: "What’s Cooking",
      subtitle: "A taste of what’s happening",
      column1: [
        {
          _type: "checklistItem" as const,
          _key: "col1-1",
          title: "Edition III/VII: MORI (森 - Jungle)",
          description:
            "A 2000m2 house, the second express in our collection. Not a smaller version of Tsuki, but its true essence distilled.",
        },
        {
          _type: "checklistItem" as const,
          _key: "col1-2",
          title: "Last Publications: Wallpaper*",
          description:
            "We are so pleased for our flagship home, Umah Tsuki, to be featured on Wallpaper.com.",
        },
      ],
      column2: [
        {
          _type: "checklistItem" as const,
          _key: "col2-1",
          title: "Social Action: Colvin Haven Foundation",
          description:
            "A Social foundation under Colvin Haven Funding, who funded some social action in Bali to keep the cultural and nature.",
        },
      ],
    },
    filmstripBand: {
      eyebrow: "III/VII",
      lead: "Mori is the third express in the collection — not a smaller version of Tsuki, but its true essence distilled into an intimate, human scale. The same philosophy, carried forward one home at a time.",
      images: await filmstripReel(),
    },
    moriProfile: {
      heading: "MORI (森 - Jungle)",
      description:
        "The third express in our collection. Not a smaller version of Tsuki, but its true essence distilled. Mori distils the same philosophy into an intimate, human scale. Every metre purposeful.",
      landSize: "Land Size: 2000 m2",
      timeToComplete: "Time to complete: 2028",
      heroImage: await img(
        "/assets/news/news-craftsman-timber.jpg",
        "A craftsman measuring timber against a dark board-and-batten wall",
      ),
      paragraphs: [
        "Every Colvin Haven home is built by Indonesian master craftsmen and artisans whose knowledge of local timber, stone, and joinery has passed through generations.",
        "It's the core of how these homes get made. Colvin Haven doesn't design a home and then have it built. The two happen together, craftsman and founder, on site, for as long as each home takes. We offer a limited turnkey home to our clients.",
        "Materials are chosen the same way ingredients once were — for provenance, not convenience. Paras stone quarried in Bali. Ulin hardwood, reclaimed rather than freshly felled. Teak, hand-cut and laid by local woodworkers who've done this for generations. Nothing shipped in that the island couldn't already give.",
      ],
    },
    socialAction: {
      statement: {
        heading: "Social Action",
        tag: "INSIDE COLVIN HAVEN FOUNDATION",
        paragraphs: [
          "The Colvin Haven Foundation grew out of the same instinct that shaped the homes themselves — that building well in a place means investing in it, not just building on it.",
          "It supports cultural and community initiatives in and around Tumbak Bayuh village, in the same quiet, unpublicized way the homes themselves get made — craftsman by craftsman, one commitment at a time.",
        ],
      },
      bandImage: await img(
        "/assets/collective/palm-trees-2.jpg",
        "Silhouetted palm trees against a golden dusk sky",
      ),
    },
    pullQuote: {
      collageImageA: await img(
        "/assets/news/pullquote-ceiling-detail.jpg",
        "A warm timber ceiling and roofline overhang above a dark board-and-batten facade",
      ),
      collageImageB: await img(
        "/assets/news/pullquote-walkway-pond.jpg",
        "A timber walkway over a koi pond leading toward a dark timber pavilion",
      ),
      quoteText:
        "“Colvin Haven is more than just building a house. It’s about creating an environment, fostering a community, and building a lifestyle around it.”",
    },
  };
  const result = await client.createIfNotExists(doc);
  console.log(`News page ready: ${result._id}`);
}

async function main() {
  if (!process.env.SANITY_AUTH_TOKEN) {
    throw new Error(
      "No auth token found -- run this via `npx sanity exec scripts/migrate-pages.ts --with-user-token`",
    );
  }

  console.log("Uploading page images and building documents...");
  await migrateCollectivePage();
  await migrateContactPage();
  await migrateRequestCollectionsPage();
  await migrateEditionsPage();
  await migrateNewsPage();
  console.log("\nAll five page documents ready.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
