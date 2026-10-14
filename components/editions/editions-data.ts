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
  /** Optional override for the hero banner on /editions and /editions1
   * (EditionStorySummary) specifically -- same mirror pattern as
   * `editionsBanner1`/`editionsStoryAImage`/`editionsClosingBanner`
   * below. Falls back to `detailHeroImage ?? heroImage` when unset.
   * Sora sets this on explicit request to a new pavilion/roofline
   * photo -- `heroImage`/`detailHeroImage` themselves still show the
   * gate photo everywhere else (the Editions-list row, /editions/[slug],
   * /editions-new), which this doesn't touch. */
  editionsHeroImage?: { src: string; alt: string };
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
  /** Optional override for the /editions and /editions1 inline-story
   * rendering (EditionStorySummary) specifically -- the mirror of
   * `detailHeroImage`/`listImage` above. Falls back to `banner1` when
   * unset (Sora: no override needed, its own banner1 is already
   * correct everywhere). Tsuki sets this on explicit request after a
   * side-by-side look at the live /editions page -- swaps that page's
   * banner1 slot for the kitchen/dining photo instead of the pool-deck
   * one `banner1` itself still correctly shows on /editions/[slug] and
   * /editions-new, which this doesn't touch. */
  editionsBanner1?: { src: string; alt: string };
  /** Optional override for storyA's own image on /editions and
   * /editions1 (EditionStorySummary) specifically -- same mirror
   * pattern as `editionsBanner1` above. Falls back to `storyA.image`
   * when unset. Tsuki sets this to the genuine Figma asset for this
   * page's own storyA-equivalent block (node 325:39526, within the
   * /editions page's own Umah Tsuki frame 325:39482) -- a dark
   * timber-slatted hallway, not the koi-pond photo `storyA.image`
   * itself still correctly shows on /editions/[slug] and
   * /editions-new, which this doesn't touch. */
  editionsStoryAImage?: { src: string; alt: string };
  /** Optional override for the info-row portrait image on /editions
   * specifically -- same mirror pattern as `editionsStoryAImage`
   * above. Falls back to `portraitImage` when unset. */
  editionsPortraitImage?: { src: string; alt: string };
  /** Optional override for row1.side's own image on /editions
   * specifically -- same mirror pattern. Falls back to
   * `row1.side.image` when unset. */
  editionsRow1SideImage?: { src: string; alt: string };
  /** Optional override for storyB's own image on /editions
   * specifically -- same mirror pattern. Falls back to
   * `storyB.image` when unset. */
  editionsStoryBImage?: { src: string; alt: string };
  /** Optional override for row4.side's own image on /editions
   * specifically -- same mirror pattern. Falls back to
   * `row4.side.image` when unset. */
  editionsRow4SideImage?: { src: string; alt: string };

  /** Optional override for craftText on /editions and
   * /editions/[slug] (EditionStorySummary) specifically -- same mirror
   * pattern as the editionsXxx image fields above. Falls back to
   * `craftText` when unset. Tsuki sets this to the new copy from its
   * own frame (node 325:39482); `craftText` itself still shows the
   * older copy on /editions-new, which this doesn't touch. */
  editionsCraftText?: string[];
  /** Caption under the first photo of the two-photo row (row4's main
   * image) on /editions and /editions/[slug] -- same mirror pattern.
   * Unset leaves that caption blank. */
  editionsRow4MainText?: string[];
  /** Same pattern, for the second photo's caption (row4's side image). */
  editionsRow4SideText?: string;
  /** Same pattern, for storyA.paragraphs. Falls back to
   * `storyA.paragraphs` when unset. */
  editionsStoryAParagraphs?: string[];
  /** Same pattern, for quoteBanner.heading. Falls back to
   * `quoteBanner.heading` when unset. */
  editionsQuoteHeading?: string;

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
  /** Optional override for closingBanner's own image on /editions
   * (EditionStorySummary) specifically -- same mirror pattern as
   * `editionsBanner1`/`editionsStoryAImage` above. Falls back to
   * `closingBanner` when unset. Tsuki sets this on explicit request to
   * the genuine "Pool Area (7 of 12)" Figma asset for this page's own
   * closing banner -- `closingBanner` itself still shows the patio
   * photo on /editions/[slug] and /editions-new, which this doesn't
   * touch. */
  editionsClosingBanner?: { src: string; alt: string };

  /** "Next Editions" band at the very end (node 246:5036) -- the other
   * edition to jump to. */
  nextEdition: { slug: string; index: string; name: string };
};

// Every field above EXCEPT the editionsXxx ones now lives in Sanity --
// see lib/sanity/editions.ts's own getEditions(), which fetches the
// canonical content and maps it into this same EditionData shape, so
// every component below (EditionSpotlight, EditionStorySummary,
// EditionDetailHeader, EditionsList, EditionStickyBanner,
// NextEditionBand) needed zero changes when the content's source moved.
//
// The editionsXxx fields stay here, in code, not in the CMS: each one
// exists only because one specific Figma frame (the /editions page's
// own) happened to crop or swap a single image differently from the
// edition's own canonical photo for that slot -- a narrow, page-
// specific technical override, not editorial content a content
// manager would naturally reach for. getEditions() layers this map on
// top of whatever Sanity returns, keyed by slug, via a plain object
// spread -- so a field left out here just falls through to the
// component's own existing `?? ` fallback chain, exactly as before.
export const EDITIONS_PAGE_OVERRIDES: Record<string, Partial<EditionData>> = {
  "umah-tsuki": {
    editionsBanner1: {
      src: "/assets/editions/detail/tsuki-banner-kitchen-dining.jpg",
      alt: "Umah Tsuki's wood-panelled kitchen and dining area beneath a woven pendant light",
    },
    editionsStoryAImage: {
      src: "/assets/editions/detail/tsuki-storyA-hallway.jpg",
      alt: "A dark timber-slatted hallway opening onto a garden path and bench",
    },
    editionsClosingBanner: {
      src: "/assets/editions/detail/tsuki-closing-pool-deck.jpg",
      alt: "Umah Tsuki's timber pool deck beneath a dark roof overhang, opening onto the jungle",
    },
    // Copy from Tsuki's own frame (node 325:39482), body paragraphs
    // re-synced to node 325:39512.
    editionsCraftText: [
      "Our first expression, and the seed from which a growing collection has since grown, each edition shaped by the same quiet reverence for nature and the pace of slow living.",
      "Set into a sloping site in Tumbak Bayuh, Bali, Umah Tsuki is a four-bedroom, four-level family home, conceived by a former chef whose pursuit of a simpler, richer life closer to nature led him to design. Encased in shou sugi ban cladding under a sweeping roofline, a set of cantilevered volumes reference an archetypal Japanese wood cabin. Across 600 square metres, the constellation of spaces appears to float above a tranquil rock garden and koi pond. A chef’s kitchen anchors the home, and an open-air wellness centre sits alongside the river. Extensive windows keep the rewilded jungle in constant view.",
    ],
    editionsRow4MainText: [
      "Tsuki floats in the Jungle: Teak overhead, green on every side, and somewhere pass the trees the rice fields glow. Sit down, and the whole green world comes in to join you.",
    ],
    editionsRow4SideText:
      "One round window, and the whole garden looks back. Charred timber, warm teak, and a stair that barely touches the ground.",
    editionsStoryAParagraphs: [
      "In both materials and construction, Umah Tsuki emphasizes provenance hand-built on site from locally sourced paras stone and recycled ulin hardwood, its traditional techniques and meticulous finishes set the scene for a quality of life attuned to the essential.",
      "Twenty years of service taught one thing above all a home doesn't gather around a view, it gathers around a kitchen. So Tsuki's kitchen was never an afterthought. It sits at the heart of the home.",
    ],
    editionsQuoteHeading:
      "“Designed to belong, Tsuki editions disappear into the landscape, honoring the land rather than overtaking it”",
  },
  "umah-sora": {
    editionsHeroImage: {
      src: "/assets/editions/detail/editions-sora-hero-pavilion.jpg",
      alt: "A dark timber pavilion roofline seen through palm fronds, with a second pavilion beyond",
    },
    // Info-row copy and portrait from Sora's own frame, node 325:39582.
    editionsPortraitImage: {
      src: "/assets/editions/detail/gallery-1.jpg",
      alt: "Ferns arching over a still koi pond edged with river stones",
    },
    editionsCraftText: [
      "Sora carries the same quiet reverence for nature as Tsuki: a two-bedroom home and guest house with a separate office.",
      "Recycled ulin timber, charred in the yakisugi tradition, turns the cladding a deep, quiet black, a Colvin Haven signature, set against warm local teak and river stone from Bali. Restraint does the work: nothing more is needed, and nothing can be taken away. A wellness centre and a koi pond settle into gardens planted long before the house was finished. The office stands apart, so the working day can end when you close its door.",
    ],
    editionsRow1SideImage: {
      src: "/assets/editions/detail/sora-row1-side-bench.jpg",
      alt: "A built-in wooden bench against Umah Sora's dark timber-slatted wall",
    },
    editionsStoryBImage: {
      src: "/assets/editions/detail/sora-storyB-kitchen-lantern.jpg",
      alt: "A round paper pendant light above Umah Sora's kitchen counter",
    },
    editionsRow4SideImage: {
      src: "/assets/editions/detail/sora-row4-side-artwork.jpg",
      alt: "A framed artwork of scattered blue dots beside Umah Sora's kitchen counter",
    },
  },
};
