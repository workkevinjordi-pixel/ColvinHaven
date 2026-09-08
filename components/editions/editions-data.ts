import type { EditionSpotlightData } from "./EditionSpotlight";

// Both entries are drawn from the same "TSUKI" content because the source
// Figma frame (node 173:1455) currently renders the same block twice --
// there's no distinct Sora copy in the file yet. Swap the second entry's
// fields in once that content exists; the component itself is already
// data-driven.
const tsuki: EditionSpotlightData = {
  index: "I/VII",
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

export const editions: EditionSpotlightData[] = [tsuki, tsuki];
