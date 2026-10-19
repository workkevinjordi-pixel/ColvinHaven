export type Cover =
  | {
      kind: "wallpaper";
      photo: string;
      headline: [string, string];
      sub: string;
    }
  | { kind: "image"; src: string };

export type PublicationItem = {
  title: string;
  description: string;
  /** One-line teaser shown on the desktop card (the full text is `description`). */
  blurb: string;
  tags: [string, string, string];
  cover: Cover;
  /** The article this publication links to (none known yet for Sora). */
  href?: string;
};

// Content and layout from the Figma publications frame (node 492:1251).
// Copy is verbatim, including the stray "d a past, similarly thoughtful
// family home" fragment in the second description.
export const PUBLICATIONS: PublicationItem[] = [
  {
    title: "WALLPAPER*",
    description:
      "Titled Sora, this is the brainchild of locally based creative Andrew Swallow and his studio, Colvin Haven – the minds also behind a past, similarly thoughtful family home, Umah Tsuki.",
    blurb:
      "Step inside this Bali villa, an intimate, yet conceptually expansive home.",
    tags: ["PUBLICATIONS", "SORA", "2026"],
    cover: {
      kind: "wallpaper",
      photo: "/assets/collective/publications/wallpaper-sora-photo.webp",
      headline: [
        "Step inside this Bali villa, an intimate, ",
        "yet conceptually expansive home",
      ],
      sub: "Sora, a new Bali villa by Colvin Haven.",
    },
  },
  {
    title: "Design Anthology 39",
    description:
      "The issue, helmed by editors-in-chief Simone Schultz and Jeremy Smart, delivers a global tour of the most interesting new design, style, travel, art and architecture stories from Asia Pacific and beyond.",
    blurb:
      "A global tour of the most interesting new design from Asia Pacific.",
    tags: ["PUBLICATIONS", "TSUKI", "2024"],
    cover: {
      kind: "image",
      src: "/assets/collective/publications/design-anthology-39-cover.webp",
    },
    href: "https://design-anthology.com/story/issue-39/home/bali",
  },
  {
    title: "WALLPAPER*",
    description:
      "We are so pleased for our flagship home, Umah Tsuki, to be featured on Wallpaper.com. Wallpaper* is the global design authority, leading the way in architecture, design, art, entertaining, beauty & grooming, transport, technology, fashion, and watches & jewellery. d a past, similarly thoughtful family home, Umah Tsuki.",
    blurb: "Discover a nature-conscious take on Balinese architecture.",
    tags: ["PUBLICATIONS", "TSUKI", "2024"],
    cover: {
      kind: "wallpaper",
      photo: "/assets/collective/publications/wallpaper-tsuki-photo.webp",
      headline: [
        "Discover a nature-conscious take on ",
        "Balinese architecture",
      ],
      sub: "Umah Tsuki by Colvin Haven is an idyllic family",
    },
    href: "https://www.wallpaper.com/architecture/residential/umah-tsuki-colvin-haven-bali-indonesia",
  },
];
