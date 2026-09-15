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
  /** List row's two-paragraph blurb (node 232:4659) -- still the same
   * Design-Anthology-flavored placeholder Figma itself reuses there,
   * not edition-specific copy yet. */
  listSummary: string[];
  /** Detail page header's paragraph (node 232:4758) -- still Figma's
   * own Lorem Ipsum placeholder; swap in real copy when it's ready. */
  detailIntro: string;
  title: string;
  lede: string[];
  heroImage: { src: string; alt: string };
  row: {
    main: { image: { src: string; alt: string }; text: string[] };
    side: { image: { src: string; alt: string }; text: string };
  };
  banner: { src: string; alt: string };
};

// Both entries are drawn from the same "TSUKI" content because the source
// Figma frame (nodes 173:1455 and 232:4674) currently renders the same
// block twice -- there's no distinct Sora copy in the file yet, for
// either the list row or a Sora detail frame. Swap the second entry's
// fields in once that content exists; every component here is already
// fully data-driven off this file, so a real Sora edition is a one-object
// change, not a new component.
const tsuki: EditionData = {
  slug: "umah-tsuki",
  index: "I/VII",
  name: "Umah Tsuki",
  exploreLabel: "Explore Umah Tsuki",
  listSummary: [
    "We are so pleased for our Tsuki Edition be featured in the September 2024 Edition of Design Anthology,  the premier English-language interiors, design, architecture and urban living magazine.",
    "“An Island Haven in Bali’s Tumbak Bayuh",
  ],
  detailIntro:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  title: "TSUKI (月 - Moon)",
  lede: [
    `"Our first expression" — the seed a growing collection has since grown from, each edition shaped by the same quiet reverence for nature and the pace of slow living.`,
    "Set into a sloping site in Tumbak Bayuh, Bali, Umah Tsuki is a four-level family home, conceived by a former chef whose pursuit of a simpler, richer life closer to nature led him to design. Encased in shou sugi ban cladding under a sweeping roofline, a set of cantilevered volumes reference an archetypal Japanese wood cabin. Across 600 square metres, the constellation of spaces appears to float above a tranquil rock garden and koi pond. Extensive windows keep the rewilded jungle in constant view.",
  ],
  heroImage: {
    src: "/assets/editions/tsuki-hero.png",
    alt: "Umah Tsuki's black-clad cantilevered volume seen through the surrounding tree canopy",
  },
  row: {
    main: {
      image: {
        src: "/assets/editions/tsuki-edition-1.png",
        alt: "Detail of Umah Tsuki's shou sugi ban roofline and timber-framed window",
      },
      text: [
        "“Designed to belong, Tsuki editions disappear into the landscape, honoring the land rather than overtaking it”",
        "In both materials and construction, Umah Tsuki emphasizes provenance — hand-built on site from locally sourced paras stone and recycled ulin hardwood, its traditional techniques and meticulous finishes set the scene for a quality of life attuned to the essential.",
      ],
    },
    side: {
      image: {
        src: "/assets/editions/tsuki-hero.png",
        alt: "Umah Tsuki's black-clad cantilevered volume seen through the surrounding tree canopy",
      },
      text: "Twenty years of service taught one thing above all — a home doesn't gather around a view, it gathers around a kitchen. So Tsuki's kitchen was never an afterthought. It sits at the heart of the home.",
    },
  },
  banner: {
    src: "/assets/editions/tsuki-pool-banner.png",
    alt: "Umah Tsuki's pool area opening onto the surrounding jungle",
  },
};

const sora: EditionData = {
  ...tsuki,
  slug: "umah-sora",
  index: "II/VII",
  name: "Umah Sora",
  exploreLabel: "Explore Umah Sora",
};

export const editions: EditionData[] = [tsuki, sora];
