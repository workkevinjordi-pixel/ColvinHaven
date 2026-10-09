/**
 * One-time migration: populates the (currently empty) Sanity dataset
 * with the exact content already live on the site -- the two editions'
 * full story data (from components/editions/editions-data.ts, minus
 * the editionsXxx page-specific override fields, which are deliberately
 * NOT CMS-managed, see edition.ts's own schema comment) and the two
 * publication mentions (from components/collective/Publications.tsx +
 * components/news/PublicationsSection.tsx).
 *
 * Run via `npx sanity exec scripts/migrate.ts --with-user-token` from
 * within studio/ -- `--with-user-token` runs the script with this CLI
 * session's own authenticated user token (no separate API token to
 * create/manage just for a one-time import), per the Sanity CLI's own
 * documented mechanism for migration scripts.
 *
 * Guarded to run only against a dataset with no existing edition/
 * publication docs, so re-running it by accident can't create
 * duplicates.
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// `sanity exec` runs this through Vite as an ES module (no __dirname),
// not plain CommonJS -- derive the same thing from import.meta.url.
const __dirname = dirname(fileURLToPath(import.meta.url));

const client = createClient({
  projectId: "2gbg82w2",
  dataset: "production",
  apiVersion: "2026-10-09",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

// public/ lives one level up from studio/ (repo root's own Next.js
// app directory) -- every src path below is already relative to that
// folder (e.g. "/assets/editions/tsuki-hero.png"), same convention
// editions-data.ts already uses.
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

type RawEdition = {
  slug: string;
  index: string;
  name: string;
  exploreLabel: string;
  listSummary: string[];
  meta: { type: string; location: string; year: string };
  title: string;
  specs: { label: string; value: string }[];
  craftText: string[];
  portraitImage: { src: string; alt: string };
  heroImage: { src: string; alt: string };
  detailHeroImage?: { src: string; alt: string };
  listImage?: { src: string; alt: string };
  row1: {
    main: { image: { src: string; alt: string }; text: string[] };
    side: { image: { src: string; alt: string }; text: string };
  };
  banner1: { src: string; alt: string };
  storyA: { paragraphs: string[]; image: { src: string; alt: string } };
  galleryRow: { src: string; alt: string }[];
  galleryRow2?: { src: string; alt: string }[];
  storyB: {
    image: { src: string; alt: string };
    paragraphs: string[];
    linkParagraph: { before: string; linkText: string; linkHref: string; after: string };
  };
  quoteBanner: { image: { src: string; alt: string }; heading: string; body: string };
  row4: {
    main: { image: { src: string; alt: string }; text: string[] };
    side: { image: { src: string; alt: string }; text: string };
  };
  closingBanner?: { src: string; alt: string };
  nextEditionSlug: string;
};

// Verbatim from components/editions/editions-data.ts (the `tsuki`/`sora`
// consts), minus the editionsXxx override fields.
const TSUKI: RawEdition = {
  slug: "umah-tsuki",
  index: "I/VII",
  name: "Umah Tsuki",
  exploreLabel: "Explore Umah Tsuki",
  listSummary: [
    "Umah Tsuki was featured in the September 2024 issue of Design Anthology, the premier English-language interiors, design, architecture and urban living magazine — “An Island Haven in Bali’s Tumbak Bayuh.”",
    "In verdant Tumbak Bayuh, former chef Andrew Swallow’s first home privileges simplicity and refinement — provenance over performance, at every scale.",
  ],
  meta: { type: "RESIDENTIAL", location: "TUMBAK BAYUH", year: "2022" },
  title: "TSUKI (月 - Moon)",
  specs: [
    { label: "LAND SIZE", value: "2000 m2" },
    { label: "YEAR", value: "2022" },
    { label: "LOCATION", value: "TUMBAK BAYUH, BALI" },
  ],
  craftText: [
    "Every Colvin Haven home is built by Indonesian master craftsmen and artisans whose knowledge of local timber, stone, and joinery has passed through generations.",
    "It's the core of how these homes get made. Colvin Haven doesn't design a home and then have it built. The two happen together, craftsman and founder, on site, for as long as each home takes. We offer a limited turnkey home to our clients.",
  ],
  portraitImage: {
    src: "/assets/editions/detail/portrait-1.jpg",
    alt: "A dark timber-framed corner of Umah Tsuki seen through tree branches",
  },
  heroImage: {
    src: "/assets/editions/tsuki-hero.png",
    alt: "Umah Tsuki's black-clad cantilevered volume seen through the surrounding tree canopy",
  },
  listImage: {
    src: "/assets/tsuki-stair-landing.jpg",
    alt: "A round window beside a black timber stair landing at Umah Tsuki",
  },
  row1: {
    main: {
      image: {
        src: "/assets/editions/tsuki-edition-1.png",
        alt: "Detail of Umah Tsuki's shou sugi ban roofline and timber-framed window",
      },
      text: [
        "“Designed to belong, Tsuki editions disappear into the landscape, honoring the land rather than overtaking it”",
        "In both materials and construction, Umah Tsuki emphasizes provenance hand-built on site from locally sourced paras stone and recycled ulin hardwood, its traditional techniques and meticulous finishes set the scene for a quality of life attuned to the essential.",
      ],
    },
    side: {
      image: {
        src: "/assets/editions/tsuki-hero.png",
        alt: "Umah Tsuki's black-clad cantilevered volume seen through the surrounding tree canopy",
      },
      text: "Twenty years of service taught one thing above all a home doesn't gather around a view, it gathers around a kitchen. So Tsuki's kitchen was never an afterthought. It sits at the heart of the home.",
    },
  },
  banner1: {
    src: "/assets/editions/tsuki-pool-banner.png",
    alt: "Umah Tsuki's pool area opening onto the surrounding jungle",
  },
  storyA: {
    paragraphs: [
      "Every Colvin Haven home is built by Indonesian master craftsmen and artisans whose knowledge of local timber, stone, and joinery has passed through generations.",
      "It's the core of how these homes get made. Colvin Haven doesn't design a home and then have it built. The two happen together, craftsman and founder, on site, for as long as each home takes. We offer a limited turnkey home to our clients.",
      "Provenance mattered more than convenience at every step — paras stone quarried in Bali, ulin hardwood reclaimed rather than freshly felled, teak hand-cut and laid by the same local woodworkers who built the rest of the home. Nothing shipped in that the island couldn't already give.",
    ],
    image: {
      src: "/assets/editions/detail/gallery-1.jpg",
      alt: "A koi pond bordered by stone and ferns",
    },
  },
  galleryRow: [
    {
      src: "/assets/editions/editions-filmstrip-living-room.jpg",
      alt: "A corner living room opening onto a jungle canopy through floor-to-ceiling glass",
    },
    {
      src: "/assets/editions/detail/tsuki-gallery-hallway.jpg",
      alt: "A dark timber-slatted hallway opening onto a garden deck",
    },
    {
      src: "/assets/editions/detail/tsuki-gallery-dining.jpg",
      alt: "A dining room with a sculptural pendant light and a framed textile on the wall",
    },
  ],
  galleryRow2: [
    {
      src: "/assets/editions/detail/tsuki-gallery2-bedroom-lamp.jpg",
      alt: "A bedroom with a glowing bedside lamp and patterned throw pillows",
    },
    {
      src: "/assets/editions/detail/tsuki-gallery2-dog-porch.jpg",
      alt: "A dog resting on a covered porch against a dark timber-slatted wall",
    },
    {
      src: "/assets/editions/detail/tsuki-gallery2-porch.jpg",
      alt: "A covered porch with lounge chairs overlooking a stone-walled garden and staircase",
    },
  ],
  closingBanner: {
    src: "/assets/editions/detail/tsuki-closing-patio.jpg",
    alt: "An outdoor lounge with a sectional sofa beside a stone retaining wall and garden stairs",
  },
  storyB: {
    image: {
      src: "/assets/editions/detail/tsuki-koipond-bridge.jpg",
      alt: "A koi pond seen from a timber walkway bridge, with a woven hammock chair beyond",
    },
    paragraphs: [
      "Umah Tsuki, the family home for Andrew Swallow, his wife, and their young daughter, sits perched above a verdant, sloping plot in the Balinese village of Tumbak Bayuh. The property is the first built project to be completed by Swallow – a former chef – who spent years devising the menus and interiors of his own restaurants in the US before choosing to fully pursue his interest in design.",
    ],
    linkParagraph: {
      before:
        "‘Designing spaces has many similarities to cooking – you always begin with a blank canvas, then you start to know what you want the dish to taste like, feel like, and look like,’ he says. ‘It was time to change my palette from creating with food ingredients to building materials.’ The decision sparked a permanent move to ",
      linkText: "Bali",
      linkHref: "https://www.wallpaper.com/tag/bali",
      after:
        " and the birth of Swallow’s own design studio, Colvin Haven (a coinage of his middle name, and his daughter’s first name).",
    },
  },
  quoteBanner: {
    image: {
      src: "/assets/editions/detail/tsuki-quote-pool-deck.jpg",
      alt: "Umah Tsuki's pool deck framed by surrounding trees",
    },
    heading:
      "“Step inside Umah Tsuki by Colvin Haven much like Swallow’s culinary practice, which focused on farm-to-table cooking, the design of Umah Tsuki is all about provenance and locality” - Wallpaper* 2024",
    body: "From the beginning I wanted to use a minimal variety of materials native to Indonesia to keep the architecture pure and honest, revealing strength and simplicity,’ explains Swallow, who worked alongside Kevin Kudo-King from architecture firm Olson Kundig, Abbie Labrum of Earth Lines Architects and Nyoman Suryantara from Como Design Studio to realise the home. ‘I really wanted to create a sanctuary that would give you a sense of calm and peace the moment you set foot on the property.’",
  },
  row4: {
    main: {
      image: {
        src: "/assets/editions/detail/row4-main.png",
        alt: "Umah Tsuki's peaked roofline",
      },
      text: [
        "Swallow’s penchant for Japan’s architecture can be seen in other elements of the home. The peaked form of the roof, for example, is inspired by the shape of traditional Japanese cabins, and shou sugi ban – a centuries-old Japanese charring technique that helps preserve and strengthen wood – has been applied to the facade. A large, winding koi pond has also been installed in the garden. ‘I have always loved the simplicity and functionality of Japanese architecture,’ Swallow adds, ‘they’re masters at using natural materials and minimal adornments.’",
      ],
    },
    side: {
      image: {
        src: "/assets/editions/detail/row4-side.png",
        alt: "A teak-panelled interior corner of Umah Tsuki",
      },
      text: "Made up of four stilted volumes, the exterior of the house is entirely clad with ulin wood, a robust type of timber that’s indigenous to Indonesia. Internal rooms are panelled with warm-hued teak, each piece hand-cut and laid by a team of expert local woodworkers. Dark grey paras stone, which is quarried in Bali, has been used to tile some of the home’s wet areas, while all the soft furnishings have been crafted by artisans based around the region.",
    },
  },
  nextEditionSlug: "umah-sora",
};

const SORA: RawEdition = {
  slug: "umah-sora",
  index: "II/VII",
  name: "Umah Sora",
  exploreLabel: "Explore Umah Sora",
  listSummary: [
    "Umah Sora was featured on Wallpaper.com, the global design authority — the second home in the collection, and the first to prove the language could travel.",
    "Not a smaller version of Tsuki, but its true essence distilled into an intimate, human scale.",
  ],
  meta: { type: "RESIDENTIAL", location: "TUMBAK BAYUH", year: "2024" },
  title: "TSUKI (月 - Moon)",
  specs: [
    { label: "LAND SIZE", value: "2000 m2" },
    { label: "YEAR", value: "2024" },
    { label: "LOCATION", value: "TUMBAK BAYUH, BALI" },
  ],
  craftText: [
    "Every Colvin Haven home is built by Indonesian master craftsmen and artisans whose knowledge of local timber, stone, and joinery has passed through generations.",
    "It's the core of how these homes get made. Colvin Haven doesn't design a home and then have it built. The two happen together, craftsman and founder, on site, for as long as each home takes. We offer a limited turnkey home to our clients.",
  ],
  portraitImage: {
    src: "/assets/editions/detail/sora-portrait.jpg",
    alt: "A black-and-white portrait of a man descending timber stairs beside Umah Sora",
  },
  heroImage: {
    src: "/assets/editions/sora-gate.jpg",
    alt: "Umah Sora's dark timber gate with a circular wood inlay, framed by a stone wall",
  },
  detailHeroImage: {
    src: "/assets/editions/detail/sora-detail-hero.jpg",
    alt: "A slatted timber facade and shingled roof of Umah Sora, seen through palm fronds",
  },
  row1: {
    main: {
      image: {
        src: "/assets/editions/detail/sora-row1-main.jpg",
        alt: "A covered walkway between two of Umah Sora's overlapping roof planes",
      },
      text: [
        "“Designed to belong, Tsuki editions disappear into the landscape, honoring the land rather than overtaking it”",
        "In both materials and construction, Umah Tsuki emphasizes provenance hand-built on site from locally sourced paras stone and recycled ulin hardwood, its traditional techniques and meticulous finishes set the scene for a quality of life attuned to the essential.",
      ],
    },
    side: {
      image: {
        src: "/assets/editions/detail/sora-row1-side.jpg",
        alt: "A round window and built-in bench seat on Umah Sora's timber deck",
      },
      text: "Twenty years of service taught one thing above all a home doesn't gather around a view, it gathers around a kitchen. So Tsuki's kitchen was never an afterthought. It sits at the heart of the home.",
    },
  },
  banner1: {
    src: "/assets/editions/detail/sora-banner1.jpg",
    alt: "A shoji-screened bedroom opening onto a dark timber corridor at Umah Sora",
  },
  storyA: {
    paragraphs: [
      "Every Colvin Haven home is built by Indonesian master craftsmen and artisans whose knowledge of local timber, stone, and joinery has passed through generations.",
      "It's the core of how these homes get made. Colvin Haven doesn't design a home and then have it built. The two happen together, craftsman and founder, on site, for as long as each home takes. We offer a limited turnkey home to our clients.",
      "Provenance mattered more than convenience at every step — paras stone quarried in Bali, ulin hardwood reclaimed rather than freshly felled, teak hand-cut and laid by the same local woodworkers who built the rest of the home. Nothing shipped in that the island couldn't already give.",
    ],
    image: {
      src: "/assets/editions/detail/sora-storyA.jpg",
      alt: "A round window set into Umah Sora's timber facade, opening onto a garden view",
    },
  },
  galleryRow: [
    {
      src: "/assets/editions/detail/sora-gallery-1.jpg",
      alt: "A living room opening onto Umah Sora's pool through full-height glass",
    },
    {
      src: "/assets/sora-bonsai-entrance.jpg",
      alt: "A cloud-pruned pine beside Umah Sora's dark timber-clad entrance",
    },
    {
      src: "/assets/editions/detail/sora-gallery-3.jpg",
      alt: "A framed artwork of scattered blue dots beside Umah Sora's kitchen counter",
    },
  ],
  galleryRow2: [
    {
      src: "/assets/editions/detail/sora-gallery2-kitchen.jpg",
      alt: "A round paper pendant light above a kitchen counter and dark stone backsplash",
    },
    {
      src: "/assets/editions/detail/sora-gallery2-sauna.jpg",
      alt: "A timber-framed sauna corner seen through glass, set against a stone wall",
    },
    {
      src: "/assets/editions/detail/sora-gallery2-pooldeck.jpg",
      alt: "A pool deck and lounge seen beneath an overhanging shingled roof",
    },
  ],
  closingBanner: {
    src: "/assets/editions/detail/sora-closing-lounge.jpg",
    alt: "An outdoor lounge and dining area beneath a pyramid roof, overlooking a pool",
  },
  storyB: {
    image: {
      src: "/assets/editions/detail/sora-storyB.jpg",
      alt: "A round window opening onto a garden view, framed by Umah Sora's shoji-screened corridor",
    },
    paragraphs: [
      "Umah Tsuki, the family home for Andrew Swallow, his wife, and their young daughter, sits perched above a verdant, sloping plot in the Balinese village of Tumbak Bayuh. The property is the first built project to be completed by Swallow – a former chef – who spent years devising the menus and interiors of his own restaurants in the US before choosing to fully pursue his interest in design.",
    ],
    linkParagraph: {
      before:
        "‘Designing spaces has many similarities to cooking – you always begin with a blank canvas, then you start to know what you want the dish to taste like, feel like, and look like,’ he says. ‘It was time to change my palette from creating with food ingredients to building materials.’ The decision sparked a permanent move to ",
      linkText: "Bali",
      linkHref: "https://www.wallpaper.com/tag/bali",
      after:
        " and the birth of Swallow’s own design studio, Colvin Haven (a coinage of his middle name, and his daughter’s first name).",
    },
  },
  quoteBanner: {
    image: {
      src: "/assets/editions/detail/sora-quote-banner.jpg",
      alt: "A black timber roofline and covered walkway at Umah Sora, seen among palms",
    },
    heading:
      "“Step inside Umah Tsuki by Colvin Haven much like Swallow’s culinary practice, which focused on farm-to-table cooking, the design of Umah Tsuki is all about provenance and locality” - Wallpaper* 2024",
    body: "From the beginning I wanted to use a minimal variety of materials native to Indonesia to keep the architecture pure and honest, revealing strength and simplicity,’ explains Swallow, who worked alongside Kevin Kudo-King from architecture firm Olson Kundig, Abbie Labrum of Earth Lines Architects and Nyoman Suryantara from Como Design Studio to realise the home. ‘I really wanted to create a sanctuary that would give you a sense of calm and peace the moment you set foot on the property.’",
  },
  row4: {
    main: {
      image: {
        src: "/assets/editions/detail/sora-row4-main.jpg",
        alt: "A living room at Umah Sora opening onto its pool and garden",
      },
      text: [
        "Swallow’s penchant for Japan’s architecture can be seen in other elements of the home. The peaked form of the roof, for example, is inspired by the shape of traditional Japanese cabins, and shou sugi ban – a centuries-old Japanese charring technique that helps preserve and strengthen wood – has been applied to the facade. A large, winding koi pond has also been installed in the garden. ‘I have always loved the simplicity and functionality of Japanese architecture,’ Swallow adds, ‘they’re masters at using natural materials and minimal adornments.’",
      ],
    },
    side: {
      image: {
        src: "/assets/editions/detail/sora-row4-side.jpg",
        alt: "A framed artwork of scattered blue dots beside Umah Sora's kitchen counter",
      },
      text: "Made up of four stilted volumes, the exterior of the house is entirely clad with ulin wood, a robust type of timber that’s indigenous to Indonesia. Internal rooms are panelled with warm-hued teak, each piece hand-cut and laid by a team of expert local woodworkers. Dark grey paras stone, which is quarried in Bali, has been used to tile some of the home’s wet areas, while all the soft furnishings have been crafted by artisans based around the region.",
    },
  },
  nextEditionSlug: "umah-tsuki",
};

type RawPublication = {
  title: string;
  order: number;
  date: string;
  paragraphs: string[];
  readMoreHref: string;
  coverImage: { src: string; alt: string };
  editorialImage?: { src: string; alt: string };
};

const PUBLICATIONS: RawPublication[] = [
  {
    title: "Wallpaper*",
    order: 0,
    date: "11/22/24",
    paragraphs: [
      "We are so pleased for our flagship home, Umah Tsuki, to be featured on Wallpaper.com. Wallpaper* is the global design authority, leading the way in architecture, design, art, entertaining, beauty & grooming, transport, technology, fashion, and watches & jewellery. The article, helmed by Ellie Stathaki, Architecture & Environment Director and writer Natasha Levy is featured in the Architectural Section of the website, which showcases the best of residential and non-commercial living spaces, and the most inspiring of houses and homes.",
      "“I wanted to create a sanctuary’ – discover a nature-conscious take on Balinese architecture",
      "Umah Tsuki, the family home for Andrew Swallow, his wife, and their young daughter, sits perched above a verdant, sloping plot in the Balinese village of Tumbak Bayuh",
    ],
    readMoreHref:
      "https://www.wallpaper.com/architecture/residential/umah-tsuki-colvin-haven-bali-indonesia",
    coverImage: {
      src: "/assets/collective/publications/wallpaper-cover.png",
      alt: "Wallpaper* magazine cover featuring Umah Tsuki",
    },
    editorialImage: {
      src: "/assets/editions/tsuki-edition-1.png",
      alt: "Detail of Umah Tsuki's shou sugi ban roofline and timber-framed window",
    },
  },
  {
    title: "Design Anthology 39",
    order: 1,
    date: "8/30/24",
    paragraphs: [
      "We are so pleased for our Tsuki Edition to be featured in the September 2024 Edition of Design Anthology, the premier English-language interiors, design, architecture and urban living magazine.",
      "The issue, helmed by editors-in-chief Simone Schultz and Jeremy Smart, delivers a global tour of the most interesting new design, style, travel, art and architecture stories from Asia Pacific and beyond.",
      "“An Island Haven in Bali’s Tumbak Bayuh",
      "In verdant Tumbak Bayuh, former chef Andrew Swallow’s first foray into design privileges simplicity and refinement….",
    ],
    readMoreHref: "https://design-anthology.com/story/issue-39/home/bali",
    coverImage: {
      src: "/assets/collective/publications/design-anthology-cover.png",
      alt: "Design Anthology issue 39 cover",
    },
  },
];

async function buildEditionDoc(raw: RawEdition) {
  return {
    _type: "edition" as const,
    name: raw.name,
    slug: { _type: "slug" as const, current: raw.slug },
    index: raw.index,
    exploreLabel: raw.exploreLabel,
    title: raw.title,
    listSummary: raw.listSummary,
    meta: raw.meta,
    specs: raw.specs,
    craftText: raw.craftText,
    portraitImage: await img(raw.portraitImage.src, raw.portraitImage.alt),
    heroImage: await img(raw.heroImage.src, raw.heroImage.alt),
    detailHeroImage: raw.detailHeroImage
      ? await img(raw.detailHeroImage.src, raw.detailHeroImage.alt)
      : undefined,
    listImage: raw.listImage ? await img(raw.listImage.src, raw.listImage.alt) : undefined,
    row1: {
      main: {
        image: await img(raw.row1.main.image.src, raw.row1.main.image.alt),
        text: raw.row1.main.text,
      },
      side: {
        image: await img(raw.row1.side.image.src, raw.row1.side.image.alt),
        text: raw.row1.side.text,
      },
    },
    banner1: await img(raw.banner1.src, raw.banner1.alt),
    storyA: {
      paragraphs: raw.storyA.paragraphs,
      image: await img(raw.storyA.image.src, raw.storyA.image.alt),
    },
    galleryRow: await Promise.all(raw.galleryRow.map((i) => img(i.src, i.alt))),
    galleryRow2: raw.galleryRow2
      ? await Promise.all(raw.galleryRow2.map((i) => img(i.src, i.alt)))
      : undefined,
    storyB: {
      image: await img(raw.storyB.image.src, raw.storyB.image.alt),
      paragraphs: raw.storyB.paragraphs,
      linkParagraph: raw.storyB.linkParagraph,
    },
    quoteBanner: {
      image: await img(raw.quoteBanner.image.src, raw.quoteBanner.image.alt),
      heading: raw.quoteBanner.heading,
      body: raw.quoteBanner.body,
    },
    row4: {
      main: {
        image: await img(raw.row4.main.image.src, raw.row4.main.image.alt),
        text: raw.row4.main.text,
      },
      side: {
        image: await img(raw.row4.side.image.src, raw.row4.side.image.alt),
        text: raw.row4.side.text,
      },
    },
    closingBanner: raw.closingBanner
      ? await img(raw.closingBanner.src, raw.closingBanner.alt)
      : undefined,
  };
}

async function main() {
  if (!process.env.SANITY_AUTH_TOKEN) {
    throw new Error(
      "No auth token found -- run this via `npx sanity exec scripts/migrate.ts --with-user-token`",
    );
  }

  const existing = await client.fetch<number>(
    `count(*[_type in ["edition", "publication"]])`,
  );
  if (existing > 0) {
    throw new Error(
      `Dataset already has ${existing} edition/publication doc(s) -- aborting to avoid duplicates. Delete them first if you really want to re-run this.`,
    );
  }

  console.log("Uploading Tsuki's images and creating its document...");
  const tsukiDoc = await client.create(await buildEditionDoc(TSUKI));
  console.log(`  created edition ${tsukiDoc._id} (${TSUKI.slug})`);

  console.log("Uploading Sora's images and creating its document...");
  const soraDoc = await client.create(await buildEditionDoc(SORA));
  console.log(`  created edition ${soraDoc._id} (${SORA.slug})`);

  console.log("Cross-linking nextEdition...");
  await client
    .patch(tsukiDoc._id)
    .set({ nextEdition: { _type: "reference", _ref: soraDoc._id } })
    .commit();
  await client
    .patch(soraDoc._id)
    .set({ nextEdition: { _type: "reference", _ref: tsukiDoc._id } })
    .commit();

  console.log("Creating publications...");
  for (const pub of PUBLICATIONS) {
    const doc = await client.create({
      _type: "publication" as const,
      title: pub.title,
      order: pub.order,
      date: pub.date,
      paragraphs: pub.paragraphs,
      readMoreHref: pub.readMoreHref,
      coverImage: await img(pub.coverImage.src, pub.coverImage.alt),
      editorialImage: pub.editorialImage
        ? await img(pub.editorialImage.src, pub.editorialImage.alt)
        : undefined,
    });
    console.log(`  created publication ${doc._id} (${pub.title})`);
  }

  console.log("\nMigration complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
