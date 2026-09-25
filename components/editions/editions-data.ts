export type EditionData = {
  /** URL segment -- /editions/[slug] */
  slug: string;
  /** Roman-numeral eyebrow, shared by the list row and the detail
   * page's own header (Figma keeps the same value in both places). */
  index: string;
  /** Plain name ("Umah Tsuki") -- the list row's heading and the detail
   * page's big centered title. Distinct from `title` below, which is
   * the more poetic name ("TSUKI (月 - Moon)") used further down the
   * detail page's own body copy. */
  name: string;
  /** "Explore Umah Tsuki" -- the list row's link text into the detail
   * page. */
  exploreLabel: string;
  /** List row's two-paragraph blurb (node 232:4659) -- each edition's
   * own real press mention (Tsuki's Design Anthology feature, Sora's
   * Wallpaper* one), not the shared Design-Anthology-flavored
   * placeholder Figma itself originally reused for both. */
  listSummary: string[];
  /** Detail header's meta row (node 234:4776): type / location / year,
   * each pair separated by a vertical divider. */
  meta: { type: string; location: string; year: string };

  /** Poetic section title further down the body ("TSUKI (月 - Moon)"). */
  title: string;
  /** Info row's left-hand stat column (node 234:4792). */
  specs: { label: string; value: string }[];
  /** Info row's paragraph column (node 234:4787). */
  craftText: string[];
  /** Info row's portrait image on the right (node 234:4839). */
  portraitImage: { src: string; alt: string };

  heroImage: { src: string; alt: string };
  /** Optional override for the detail page's own top hero banner
   * specifically (EditionSpotlight) -- `heroImage` above is shared with
   * the Editions-list summary row (EditionsList) too, and Figma's own
   * detail-page frame for Sora (node 284:11733) now specs a distinct
   * photo there from what the list row uses (node 250:9150) for the
   * exact same edition. Falls back to `heroImage` when unset (Tsuki:
   * both contexts genuinely use the same photo, confirmed by hash, so
   * it doesn't set this). */
  detailHeroImage?: { src: string; alt: string };
  /** Optional override for the Editions-list summary row (EditionsList)
   * specifically -- the mirror image of `detailHeroImage` above.
   * Falls back to `heroImage` when unset (Sora: no override needed,
   * its list row already uses its own distinct heroImage). Tsuki sets
   * this because Figma's current Editions-list frame (node 250:9141)
   * now specs a different photo there than the detail page's own hero
   * -- confirmed via hash to be the same photo already on the site as
   * tsuki-stair-landing.jpg (the homepage gallery's tall left-column
   * card), just re-exported at a different resolution, so this reuses
   * that file directly rather than downloading a duplicate. */
  listImage?: { src: string; alt: string };
  row1: {
    main: { image: { src: string; alt: string }; text: string[] };
    side: { image: { src: string; alt: string }; text: string };
  };
  banner1: { src: string; alt: string };

  /** Text-left/image-right story block (node 234:4902) -- indented and
   * pushed toward the right edge in the source frame (pl-160,
   * justify-end). */
  storyA: {
    paragraphs: string[];
    image: { src: string; alt: string };
  };

  /** Three-image gallery row (node 234:4912). Originally used twice
   * verbatim (also at node 246:5017), but the current Figma frame
   * (250:9142/284:11732) now specs a genuinely different second set of
   * three -- see `galleryRow2`. */
  galleryRow: { src: string; alt: string }[];
  /** The second gallery row's own three images, once distinct from the
   * first (see `galleryRow` above). Falls back to `galleryRow` when
   * unset, matching how the two used to be identical. */
  galleryRow2?: { src: string; alt: string }[];

  /** Image-left/text-right story block (node 246:4946) -- mirror of
   * storyA. The closing paragraph has one embedded link ("Bali"). */
  storyB: {
    image: { src: string; alt: string };
    paragraphs: string[];
    linkParagraph: {
      before: string;
      linkText: string;
      linkHref: string;
      after: string;
    };
  };

  /** Full-bleed banner + pull-quote block (node 246:4974). */
  quoteBanner: {
    image: { src: string; alt: string };
    heading: string;
    body: string;
  };

  row4: {
    main: { image: { src: string; alt: string }; text: string[] };
    side: { image: { src: string; alt: string }; text: string };
  };

  /** New closing full-bleed photo (node 281:11707/284:11805), right
   * after the final gallery row and before "Next Editions" -- optional
   * since older data (if any is ever added without it) just omits the
   * section rather than falling back to a possibly-wrong reused image. */
  closingBanner?: { src: string; alt: string };

  /** "Next Editions" band at the very end (node 246:5036) -- the other
   * edition to jump to. */
  nextEdition: { slug: string; index: string; name: string };
};

// Both entries are drawn from the same "TSUKI" content because the source
// Figma frame (nodes 173:1455 and 232:4674) currently renders the same
// block twice -- there's no distinct Sora photography or story beats in
// the file yet (galleryRow, storyA/storyB's images, quoteBanner, row4).
// Swap the second entry's fields in once real Sora photography and copy
// exist; every component here is already fully data-driven off this
// file, so a real Sora edition is a one-object change, not a new
// component. `meta`/`specs` below are overridden on the Sora object
// itself where the underlying fact actually differs (year), rather than
// left silently wrong via the spread -- see the funnel strategy's "Edition
// 2 complete" status and the homepage gallery's existing 2024 date for
// both homes.
//
// storyA's paragraphs 1-2 repeat craftText verbatim; its third paragraph
// was still Figma's own Lorem Ipsum placeholder, now replaced with real
// copy grounded in the same material facts already established in row1
// and row4 below (paras stone, ulin hardwood, teak).
const tsuki: EditionData = {
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
    // Re-synced against node 279:11585: now the same koi-pond photo that
    // used to sit at galleryRow[0] (gallery-1.jpg) -- Figma moved it
    // here rather than dropping it, confirmed via hash. Reused directly
    // rather than duplicating the file, with its alt text corrected to
    // actually describe what it shows (the old "Tree branches shading
    // Umah Tsuki's timber deck" alt was already stale/mismatched before
    // this change, a pre-existing inconsistency unrelated to it).
    image: {
      src: "/assets/editions/detail/gallery-1.jpg",
      alt: "A koi pond bordered by stone and ferns",
    },
  },

  // Re-synced against node 279:11585 (frame 279:11602): all three swapped
  // for genuinely new photos -- confirmed via hash, none of these three
  // match what was here before (or each other). The old koi-pond photo
  // that lived at index 0 (gallery-1.jpg) didn't disappear -- storyA
  // below now uses it instead, once Figma moved that same photo there.
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

  // A second, genuinely different three-photo gallery row -- see
  // `galleryRow2`'s own comment on the EditionData type.
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
      src: "/assets/editions/detail/pool-banner-2.png",
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

  nextEdition: { slug: "umah-sora", index: "II/VII", name: "Sora" },
};

const sora: EditionData = {
  ...tsuki,
  slug: "umah-sora",
  index: "II/VII",
  name: "Umah Sora",
  exploreLabel: "Explore Umah Sora",
  // Overridden rather than left inherited from tsuki -- Sora's own press
  // mention is Wallpaper*, not the Design Anthology feature that's
  // actually Tsuki's (see WhatsCooking's checklist and News'
  // PublicationsSection, both already Wallpaper*-specific for Sora).
  listSummary: [
    "Umah Sora was featured on Wallpaper.com, the global design authority — the second home in the collection, and the first to prove the language could travel.",
    "Not a smaller version of Tsuki, but its true essence distilled into an intimate, human scale.",
  ],
  // Overridden rather than left inherited from tsuki -- Sora is a later
  // edition (completed 2024, per the homepage gallery's existing date
  // for it and the funnel strategy's "Edition 2 complete" status), not
  // the same 2022 as Tsuki.
  meta: { type: "RESIDENTIAL", location: "TUMBAK BAYUH", year: "2024" },
  specs: [
    { label: "LAND SIZE", value: "2000 m2" },
    { label: "YEAR", value: "2024" },
    { label: "LOCATION", value: "TUMBAK BAYUH, BALI" },
  ],
  nextEdition: { slug: "umah-tsuki", index: "I/VII", name: "Tsuki" },
  // Overridden rather than left inherited from tsuki -- the Editions
  // overview's list row (node 250:9150) shows a distinct Sora photo,
  // not Tsuki's courtyard shot. (The detail page's own hero is a
  // *third*, different photo again -- see detailHeroImage below.)
  heroImage: {
    src: "/assets/editions/sora-gate.jpg",
    alt: "Umah Sora's dark timber gate with a circular wood inlay, framed by a stone wall",
  },
  // Explicitly unset, not left inherited from tsuki's spread -- tsuki
  // sets this (see its own definition above) to override just its own
  // list row's photo, and without this line the spread below would
  // silently carry that same override into Sora's list row too. Sora's
  // list row already shows its own correct photo via heroImage above.
  listImage: undefined,

  // Every image below is a genuine, distinct Sora photo (Figma node
  // 284:11715, "Editions Details" duplicated with Sora's own header
  // swapped in) -- confirmed one by one via visual diff against tsuki's
  // corresponding image, not just a differing filename/hash (Figma
  // frequently keeps a stale filename, e.g. banner1 below is still
  // named "UMAH+TSUKI+..." despite being a genuinely different photo).
  // The WRITTEN copy in that same Figma frame, by contrast, is still a
  // stale, unedited duplicate of Tsuki's own -- every paragraph still
  // explicitly says "Umah Tsuki"/"Tsuki's kitchen", the poetic `title`
  // still reads "TSUKI (月 - Moon)", `specs`' own YEAR still says 2022
  // (contradicting this same frame's header, which says 2024), and the
  // "Next Editions" pointer still points at "Sora" (i.e. itself) rather
  // than Tsuki -- so unlike the images, none of that text is real
  // Sora-specific content yet. Left entirely inherited from tsuki via
  // the spread above, same as before this pass.
  detailHeroImage: {
    src: "/assets/editions/detail/sora-detail-hero.jpg",
    alt: "A slatted timber facade and shingled roof of Umah Sora, seen through palm fronds",
  },
  portraitImage: {
    src: "/assets/editions/detail/sora-portrait.jpg",
    alt: "A black-and-white portrait of a man descending timber stairs beside Umah Sora",
  },
  row1: {
    main: {
      image: {
        src: "/assets/editions/detail/sora-row1-main.jpg",
        alt: "A covered walkway between two of Umah Sora's overlapping roof planes",
      },
      text: tsuki.row1.main.text,
    },
    side: {
      image: {
        src: "/assets/editions/detail/sora-row1-side.jpg",
        alt: "A round window and built-in bench seat on Umah Sora's timber deck",
      },
      text: tsuki.row1.side.text,
    },
  },
  banner1: {
    src: "/assets/editions/detail/sora-banner1.jpg",
    alt: "A shoji-screened bedroom opening onto a dark timber corridor at Umah Sora",
  },
  storyA: {
    paragraphs: tsuki.storyA.paragraphs,
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
  storyB: {
    image: {
      src: "/assets/editions/detail/sora-storyB.jpg",
      alt: "A round window opening onto a garden view, framed by Umah Sora's shoji-screened corridor",
    },
    paragraphs: tsuki.storyB.paragraphs,
    linkParagraph: tsuki.storyB.linkParagraph,
  },
  quoteBanner: {
    image: {
      src: "/assets/editions/detail/sora-quote-banner.jpg",
      alt: "A black timber roofline and covered walkway at Umah Sora, seen among palms",
    },
    heading: tsuki.quoteBanner.heading,
    body: tsuki.quoteBanner.body,
  },
  row4: {
    main: {
      image: {
        src: "/assets/editions/detail/sora-row4-main.jpg",
        alt: "A living room at Umah Sora opening onto its pool and garden",
      },
      text: tsuki.row4.main.text,
    },
    side: {
      image: {
        src: "/assets/editions/detail/sora-row4-side.jpg",
        alt: "A framed artwork of scattered blue dots beside Umah Sora's kitchen counter",
      },
      text: tsuki.row4.side.text,
    },
  },
  // Own genuinely distinct photos -- explicitly set, not left inherited
  // from tsuki's spread above (same reasoning as listImage's own
  // comment: without this, tsuki's galleryRow2/closingBanner values
  // would silently carry over into Sora's too).
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
};

export const editions: EditionData[] = [tsuki, sora];
