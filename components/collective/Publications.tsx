import Image from "next/image";

type Cover =
  | {
      kind: "wallpaper";
      photo: string;
      headline: [string, string];
      sub: string;
    }
  | { kind: "image"; src: string };

type PublicationItem = {
  title: string;
  description: string;
  tags: [string, string, string];
  cover: Cover;
};

// Content and layout from the Figma publications frame (node 492:1251).
// Copy is verbatim, including the stray "d a past, similarly thoughtful
// family home" fragment in the second description.
const PUBLICATIONS: PublicationItem[] = [
  {
    title: "WALLPAPER*",
    description:
      "Titled Sora, this is the brainchild of locally based creative Andrew Swallow and his studio, Colvin Haven – the minds also behind a past, similarly thoughtful family home, Umah Tsuki.",
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
    title: "WALLPAPER*",
    description:
      "We are so pleased for our flagship home, Umah Tsuki, to be featured on Wallpaper.com. Wallpaper* is the global design authority, leading the way in architecture, design, art, entertaining, beauty & grooming, transport, technology, fashion, and watches & jewellery. d a past, similarly thoughtful family home, Umah Tsuki.",
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
  },
  {
    title: "Design Anthology 39",
    description:
      "The issue, helmed by editors-in-chief Simone Schultz and Jeremy Smart, delivers a global tour of the most interesting new design, style, travel, art and architecture stories from Asia Pacific and beyond.",
    tags: ["PUBLICATIONS", "TSUKI", "2024"],
    cover: {
      kind: "image",
      src: "/assets/collective/publications/design-anthology-39-cover.webp",
    },
  },
];

function PublicationCover({ title, cover }: { title: string; cover: Cover }) {
  if (cover.kind === "image") {
    return (
      <div className="collective-publications__cover">
        <Image
          src={cover.src}
          alt={`${title} cover`}
          fill
          sizes="170px"
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  }
  // The Wallpaper* covers are built from the magazine's logo and the issue
  // photo, laid out like the A4 front page in the design.
  return (
    <div
      className="collective-publications__cover collective-publications__cover--wallpaper"
      role="img"
      aria-label={`${title} cover: ${cover.headline.join("").trim()}`}
    >
      <Image
        className="collective-publications__wp-logo"
        src="/assets/collective/publications/wallpaper-logo.webp"
        alt=""
        width={93}
        height={23}
        sizes="93px"
      />
      <p className="collective-publications__wp-tagline" aria-hidden="true">
        Your Daily Digest of Latest News
      </p>
      <div className="collective-publications__wp-photo" aria-hidden="true">
        <Image
          src={cover.photo}
          alt=""
          fill
          sizes="170px"
          style={{ objectFit: "cover" }}
        />
      </div>
      <p className="collective-publications__wp-headline" aria-hidden="true">
        {cover.headline[0]}
        <br />
        {cover.headline[1]}
      </p>
      <p className="collective-publications__wp-sub" aria-hidden="true">
        {cover.sub}
      </p>
    </div>
  );
}

/**
 * Press mentions (Figma 492:1251): a centred heading, then a column of
 * rows -- a small A4 cover on the left; the publication's name, a short
 * description and a PUBLICATIONS | EDITION | YEAR line on the right --
 * separated by hairlines. The heading stays "NEWS" (renamed on request).
 */
export default function Publications() {
  return (
    <section className="collective-publications">
      <div className="collective-publications__inner">
        <h2 className="collective-publications__heading">NEWS</h2>
        <div className="collective-publications__list">
          {PUBLICATIONS.map((pub, i) => (
            <article
              className="collective-publications__item"
              key={`${pub.title}-${i}`}
            >
              <PublicationCover title={pub.title} cover={pub.cover} />
              <div className="collective-publications__body">
                <h3 className="collective-publications__title">{pub.title}</h3>
                <p className="collective-publications__text">
                  {pub.description}
                </p>
                <ul className="collective-publications__tags">
                  {pub.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
