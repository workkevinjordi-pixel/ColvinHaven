import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollFade from "../ScrollFade";

// Keyed by the caption's own displayed name (not which photo a card
// happens to use -- see CARDS' own comment on the Tsuki/Sora photo
// reuse) -- "the card captioned Sora links to Sora's detail page" is
// what was actually asked for, so a card that (per that same mismatch)
// shows the Sora photo under a "Tsuki" caption still links to Tsuki.
const EDITION_HREF: Record<string, string> = {
  Sora: "/editions/umah-sora",
  Tsuki: "/editions/umah-tsuki",
};

type Card = {
  src: string;
  alt: string;
  /** Bare name ("Sora"/"Tsuki") -- desktop's own caption (below) no
   * longer appends a roman numeral to it directly, unlike mobile's. */
  name: string;
  /** Mobile-only caption pieces (numeral appended to name, year on its
   * own line below) -- Figma's own mobile frame (321:39281) is
   * unchanged from the original build, still this older two-line
   * format, confirmed via a dedicated re-fetch during this same
   * desktop re-sync rather than assumed to have changed alongside it. */
  numeral: string;
  year: string;
  /** Desktop-only caption label ("Edition II"/"Edition I") -- this
   * frame's own re-sync replaced the old name+numeral/year caption
   * with an "Edition <numeral>" / bare name row instead, confirmed via
   * a dedicated get_design_context call on this exact frame. */
  edition: string;
  /** Figma's own x/y/width/height (node 319:37965) for this card's own
   * photo, as percentages of the 1440px-wide (edge-to-edge, no side
   * inset) desktop canvas. Every card has its own distinct
   * crop/aspect-ratio, applied as an inline aspect-ratio per card
   * rather than a shared CSS modifier class. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Figma's own dedicated MOBILE frame (node 321:39281) for this same
   * gallery -- its own independent x/y/w for each card, not derived
   * from the desktop numbers above. Mobile keeps the same
   * mixed/scattered idea as desktop, just its own layout.
   *
   * my is NOT Figma's own value for every card (mx/mw are) -- Figma's
   * own vertical gaps were sized for its own illegibly tiny scaled-down
   * caption text, which fits in far less vertical room than the
   * legible size actually rendered here. Every card after the first in
   * its column is instead positioned at that previous card's own
   * measured bottom edge plus a 24px gap -- see globals.css's own
   * comment on the caption sizes for the full story. Only the left
   * column's first card (index 0) keeps Figma's own my untouched;
   * the right column's own my (index 2 and 3 below) is shifted down
   * ~133px on top of that so its own vertical center lines up with
   * the left column's, so its second card sits roughly alongside the
   * left column's bottom card rather than well above it. */
  mx: number;
  my: number;
  mw: number;
};

// Figma (node 319:37965) reuses just two source photos across all five
// caption slots -- confirmed via the same hash-matching pipeline used
// throughout this codebase (sips jpeg/resample/recompress) against
// this project's own existing assets, not new photography:
// sora-bonsai-entrance.jpg (the bonsai tree beside the round wooden
// door, already used on /editions) for every "Sora" card, and
// gallery.png (the boardwalk/bench courtyard shot the live homepage's
// own Drawing/masonry sections already use) for every "Tsuki" card.
// Ported as-is, mismatched captions included (card index 4 below: the
// Sora photo under a "Tsuki"/"Edition I" caption) -- this reads as an
// early placeholder pass (two example photos standing in for a set
// that will eventually have one photo per caption), not a fidelity
// bug to silently "fix" by inventing new pairings. Both asset URLs'
// own hashes are unchanged since this frame was first fetched.
//
// x/y/w/h are this frame's own real numbers, re-fetched fresh on a
// follow-up "implement this design from Figma" request that turned out
// to have changed several things at once: every card's own position,
// size and crop shifted again (bigger still than the previous re-sync
// in most cases), and the caption format switched from "name+numeral"
// / "year" to "Edition <numeral>" / bare name (see the Card type's own
// comment) -- confirmed via a dedicated metadata + design-context
// fetch, not assumed from the earlier pass. Rendered at this frame's
// own 100% scale, same as the previous re-sync (no shrink reapplied).
//
// CANVAS_H is trimmed to the real content extent (card index 2's own
// bottom edge, 1455+753=2208, rounded up to 2210 for a hairline's
// buffer) -- not Figma's own 2203, same "close the gap to the next
// section" reasoning as every earlier pass here: leaving Figma's own
// trailing canvas space would just be dead space below the last card.
const CARDS: Card[] = [
  {
    src: "/assets/sora-bonsai-entrance.jpg",
    alt: "A bonsai pine beside a round wooden door at Umah Sora",
    name: "Sora",
    numeral: "II",
    year: "2026",
    edition: "Edition II",
    x: 96,
    y: 22,
    w: 560,
    h: 720,
    mx: 44.12,
    my: 0,
    mw: 131.13,
  },
  {
    src: "/assets/gallery.png",
    alt: "Umah Tsuki courtyard",
    name: "Tsuki",
    numeral: "I",
    year: "2024",
    edition: "Edition I",
    x: 20,
    y: 938,
    w: 640,
    h: 910,
    mx: 15.52,
    my: 298,
    mw: 146.04,
  },
  {
    src: "/assets/sora-bonsai-entrance.jpg",
    alt: "A bonsai pine beside a round wooden door at Umah Sora",
    name: "Sora",
    numeral: "II",
    year: "2026",
    edition: "Edition II",
    x: 811,
    y: 1455,
    w: 480,
    h: 720,
    mx: 51.72,
    my: 645,
    mw: 131.13,
  },
  {
    src: "/assets/gallery.png",
    alt: "Umah Tsuki courtyard",
    name: "Tsuki",
    numeral: "I",
    year: "2024",
    edition: "Edition I",
    x: 851,
    y: 58,
    w: 400,
    h: 480,
    mx: 223.62,
    my: 150,
    mw: 146.04,
  },
  {
    src: "/assets/sora-bonsai-entrance.jpg",
    alt: "A bonsai pine beside a round wooden door at Umah Sora",
    name: "Tsuki",
    numeral: "I",
    year: "2024",
    edition: "Edition I",
    x: 780,
    y: 685,
    w: 600,
    h: 600,
    mx: 236.4,
    my: 496,
    mw: 131.13,
  },
];

const CANVAS_W = 1440;
const CANVAS_H = 2210;
const MOBILE_CANVAS_W = 390;
const MOBILE_CANVAS_H = 920; // Figma's own mobile frame is unchanged; see MOBILE_CANVAS_H's own original comment history for why this isn't that frame's own 686.

// New in this same re-sync (Figma node 332:39703, desktop only -- the
// mobile frame doesn't have this): a lede + "Sneak peak" link into
// /news, sitting in the gap after the left column's own last card.
// "Sneak peak" (not "peek") is Figma's own literal text -- ported
// as-is, same as this codebase's established practice elsewhere
// (CollectionsCard's own "each editions stands") of not silently
// correcting Figma's own copy.
const NEWS_LINK = { x: 120, y: 1972, w: 440 };

function GalleryCard({ card }: { card: Card }) {
  const style = {
    "--x": `${((card.x / CANVAS_W) * 100).toFixed(2)}%`,
    "--y": `${((card.y / CANVAS_H) * 100).toFixed(2)}%`,
    "--w": `${((card.w / CANVAS_W) * 100).toFixed(2)}%`,
    "--mx": `${((card.mx / MOBILE_CANVAS_W) * 100).toFixed(2)}%`,
    "--my": `${((card.my / MOBILE_CANVAS_H) * 100).toFixed(2)}%`,
    "--mw": `${((card.mw / MOBILE_CANVAS_W) * 100).toFixed(2)}%`,
  } as CSSProperties;

  return (
    <div className="landing-gallery__item" style={style}>
      <ScrollFade>
        {/* Only the photo is a link -- the caption below is plain text,
            per an explicit "image clickable, not the text" request. */}
        <Link
          href={EDITION_HREF[card.name]}
          className="landing-gallery__card"
          style={{ aspectRatio: `${card.w} / ${card.h}` }}
          aria-label={`View ${card.name} ${card.numeral}`}
        >
          <Image
            src={card.src}
            alt={card.alt}
            fill
            sizes="(min-width: 900px) 42vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        </Link>
        {/* Desktop's own new "Edition <numeral>" / bare name row and
            mobile's own untouched "name <numeral>" / year rows both
            render -- CSS picks one per breakpoint (globals.css), same
            mechanism as the EditionsFilmstrip/MobileFilmstrip pair. */}
        <div className="landing-gallery__caption landing-gallery__caption--desktop">
          <p className="landing-gallery__caption-edition">{card.edition}</p>
          <p className="landing-gallery__caption-desktop-name">{card.name}</p>
        </div>
        <div className="landing-gallery__caption landing-gallery__caption--mobile">
          <p className="landing-gallery__caption-name">
            {card.name} <span>{card.numeral}</span>
          </p>
          <p className="landing-gallery__caption-year">{card.year}</p>
        </div>
      </ScrollFade>
    </div>
  );
}

function GalleryNewsLink() {
  const style: CSSProperties = {
    left: `${((NEWS_LINK.x / CANVAS_W) * 100).toFixed(2)}%`,
    top: `${((NEWS_LINK.y / CANVAS_H) * 100).toFixed(2)}%`,
    width: `${((NEWS_LINK.w / CANVAS_W) * 100).toFixed(2)}%`,
  };

  return (
    <div className="landing-gallery__news" style={style}>
      <ScrollFade>
        <p className="landing-gallery__news-heading">
          Dive in to what&apos;s cooking at CH
        </p>
        <Link href="/news" className="landing-gallery__news-link">
          Sneak peak <span aria-hidden="true">→</span>
        </Link>
      </ScrollFade>
    </div>
  );
}

/**
 * Captioned Editions gallery (Figma node 319:37965, mobile 321:39281):
 * five cards at Figma's own mixed/scattered positions on a
 * 1440-wide, edge-to-edge desktop canvas (not a tidy two-column grid),
 * each at Figma's own real size and its own real aspect-ratio, plus a
 * "Sneak peak" link into /news new to this same re-sync -- see this
 * file's own comment above CARDS/NEWS_LINK for the exact numbers.
 * Mobile has its own real, unchanged Figma frame with its own
 * genuinely different mixed layout and caption format -- mx/my/mw
 * below (mobile's own caption text was scaled down as part of a group
 * resize in that Figma frame, landing on illegibly small 7px/5px
 * sizes; the rendered caption sizes here are a deliberate legible
 * substitute, see globals.css). Both layouts are positioned via CSS
 * custom properties (--x/--y/--w desktop, --mx/--my/--mw mobile)
 * consumed by .landing-gallery__item so the actual percentage math
 * lives once in the stylesheet, not repeated as inline left/top/width
 * on every card.
 *
 * Each photo links to its own Editions detail page (EDITION_HREF,
 * keyed by caption name) with a subtle hover-zoom (globals.css); the
 * caption below each photo is deliberately plain text, not part of
 * that link.
 */
export default function EditionsGallery() {
  return (
    <section className="landing-gallery">
      <div className="landing-gallery__canvas">
        {CARDS.map((card, i) => (
          <GalleryCard key={`${card.src}-${i}`} card={card} />
        ))}
        <GalleryNewsLink />
      </div>
    </section>
  );
}
