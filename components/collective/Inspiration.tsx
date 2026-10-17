import Image from "next/image";
import ScrollFade from "../ScrollFade";

type InspirationProps = {
  heading?: string;
  paragraphs?: string[];
  images?: { src: string; alt: string }[];
};

// Matches the content migrated into Sanity's collectivePage.inspiration
// /inspirationGallery (see lib/sanity/collective.ts and
// app/collective/page.tsx) -- kept as a fallback here in case the
// fetch ever comes back empty, not the source of truth.
const DEFAULT_PARAGRAPHS = [
  "The design language draws from two traditions at once: Japanese and Scandinavian, the schools that understood restraint long before it was a trend. Danish design in particular, furniture and interiors built on the same instinct as a well-run kitchen, nothing decorative, everything earning its place.",
  "Twenty years of service taught one thing above all: people gather in the kitchen, not the living room. So in every Colvin Haven home, the kitchen is never an afterthought. It's the room the rest of the house is built around.",
  "We borrow from nature the space upon which we build.",
];
const DEFAULT_IMAGES: { src: string; alt: string }[] = [
  {
    src: "/assets/collective/inspiration-bamboo-lounge-chair.webp",
    alt: "A dark timber lounge chair against a bamboo grove",
  },
  {
    src: "/assets/collective/inspiration-stone-wall-pine.webp",
    alt: "A cloud-pruned pine beside a concrete wall and dark timber house",
  },
  {
    src: "/assets/collective/inspiration-timber-batten-detail.webp",
    alt: "A pale timber batten set into a dark board-and-batten wall",
  },
  {
    src: "/assets/collective/inspiration-temple-umbrellas-stairs.webp",
    alt: "Balinese ceremonial umbrellas atop a stone shrine, seen through palms",
  },
  {
    src: "/assets/collective/inspiration-timber-bench-pond.webp",
    alt: "A timber bench on a deck overlooking a stone-edged pond",
  },
];

// Figma gives the middle gallery slot a flexible width (the other four
// fixed at 280px) -- a pure layout decision, not content, so it stays
// here in code (tied to array index 2) rather than becoming an
// editable Sanity field, same reasoning as ApproachGallery's own
// FIXED_INDEX.
const FLEX_INDEX = 2;

/**
 * "INSPIRATION" (Figma node 391:1394, replacing the previous frame's
 * own tag+paragraph StatementSection usage entirely): heading and
 * paragraphs now sit side by side with no label tag, and a five-photo
 * gallery row -- full-bleed to this page's own 1440px canvas, not
 * inset to the standard 1216px content column -- sits directly below
 * with no caption, no marquee. Previously two separate pieces (this
 * component via StatementSection, plus a separate <Filmstrip> call in
 * app/collective/page.tsx); now one component owns the whole section
 * since Figma treats them as a single 24px-gapped block.
 *
 * The heading's own typography was re-synced on a second pass against
 * this same frame: now a 24px Cormorant Garamond/2.4px-tracking
 * sentence-style heading (its own scoped
 * .collective-inspiration-v2__heading rule), not the shared 32px Plus
 * Jakarta Sans .section-heading class every other big section heading
 * on the site still uses -- matches the same shift Foundation/Craft's
 * own headings just went through on this page.
 */
export default function Inspiration({
  heading = "INSPIRATIONS",
  paragraphs = DEFAULT_PARAGRAPHS,
  images = DEFAULT_IMAGES,
}: InspirationProps) {
  return (
    <section className="collective-inspiration-v2">
      <ScrollFade className="collective-inspiration-v2__intro">
        <h2 className="collective-inspiration-v2__heading">{heading}</h2>
        <div className="collective-inspiration-v2__text">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </ScrollFade>
      <ScrollFade className="collective-inspiration-v2__gallery">
        {images.map((img, i) => (
          <div
            key={i}
            className={
              i === FLEX_INDEX
                ? "collective-inspiration-v2__gallery-item collective-inspiration-v2__gallery-item--flex"
                : "collective-inspiration-v2__gallery-item"
            }
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 900px) 20vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </ScrollFade>
    </section>
  );
}
