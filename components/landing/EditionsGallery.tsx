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
  name: string;
  numeral: string;
  year: string;
  /** Figma's own x/y/width/height (node 319:37965) for this card's own
   * photo, as percentages of the 1440px-wide (edge-to-edge, no side
   * inset -- this frame's own x=0/width=1440) desktop canvas. Every
   * card now has its own distinct crop/aspect-ratio (this frame was
   * re-synced since an earlier pass here: five genuinely different
   * ratios now, not two repeated ones), so height is tracked
   * per-card and applied as an inline aspect-ratio rather than a
   * shared CSS modifier class. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Figma's own dedicated MOBILE frame (node 321:39281) for this same
   * gallery -- its own independent x/y/w for each card, not derived
   * from the desktop numbers above (confirmed via a dedicated
   * get_design_context call on that mobile frame specifically). Mobile
   * keeps the same mixed/scattered idea as desktop, just its own
   * layout -- this is NOT the single stacked column an earlier mobile
   * pass here used as a generic fallback before that frame existed,
   * and it's untouched by this desktop re-sync (the mobile frame
   * wasn't part of this pass -- only 319:37965, the desktop node, was
   * re-fetched and found changed).
   *
   * my is NOT Figma's own value for every card (mx/mw are) -- Figma's
   * own vertical gaps were sized for its own illegibly tiny scaled-down
   * caption text (see the caption-size comment in globals.css), which
   * fits in far less vertical room than the legible size actually
   * rendered here. Left as Figma's own numbers, every second/third
   * card in each column overlapped the card above it in practice
   * (confirmed by measuring rendered getBoundingClientRect, not
   * guessed) -- a real visual bug a follow-up request caught. Every
   * card after the first in its column is instead positioned at that
   * previous card's own measured bottom edge (image + 24px gap +
   * caption, all at their real rendered size) plus a 24px gap, the
   * same breathing room Figma's own numbers left after its own
   * (shorter) caption.
   *
   * The right column's own my (index 3 and 4) is a further, deliberate
   * departure from Figma's own value on top of that overlap fix -- a
   * follow-up request found the right column (which only spans roughly
   * the canvas's top third) left the left column's own third/bottom
   * card reading as visually orphaned, with nothing beside it. Both of
   * the right column's cards are shifted down by the same ~133px so
   * the right column's own vertical center lines up with the left
   * column's (their own internal 24px gap to each other is unchanged),
   * putting the right column's second card roughly alongside that
   * bottom-left card instead of well above it. Only the left column's
   * first card (index 0) keeps Figma's own my untouched. */
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
// Ported as-is, mismatched captions included (card D below: the Sora
// photo under a "Tsuki I" caption) -- this reads as an early
// placeholder pass (two example photos standing in for a set that
// will eventually have one photo per caption), not a fidelity bug to
// silently "fix" by inventing new pairings. Both asset URLs' own
// hashes are unchanged from the very first time this frame was
// fetched, confirming the re-sync below is a genuine layout/sizing
// revision, not a different set of photos.
//
// x/y/w/h are Figma's own real numbers for this frame, re-fetched
// fresh (not reused from an earlier pass) on an explicit "implement
// this design from Figma" follow-up -- the frame had changed since
// the original build: bigger photos throughout, a genuinely new
// square crop (card D, 600x600 -- previously every card was one of
// just two repeated ratios), a flipped column balance (left column
// now 2 cards, right column 3 -- previously 3/2), and the canvas
// itself is now edge-to-edge at the full 1440px frame width (x=0,
// width=1440) rather than inset 60px each side. Rendered at Figma's
// own 100% scale this time -- an earlier pass here had deliberately
// shrunk every card to 75% of Figma's size for a "cleaner look"
// request, but that request predates this resize and was against the
// old, smaller Figma numbers; this frame's own photos are already
// substantially bigger, satisfying the (separate, later) "make the
// gallery bigger" request on its own without layering another
// reduction on top.
//
// CANVAS_H is trimmed to the real content extent (card B's own bottom
// edge, 1455+646=2101, rounded up to 2110 for a hairline's buffer) --
// not Figma's own 2254, same "close the gap to the next section"
// reasoning as the original build: leaving Figma's own trailing
// canvas space would just be dead space below the last card again.
const CARDS: Card[] = [
  {
    src: "/assets/sora-bonsai-entrance.jpg",
    alt: "A bonsai pine beside a round wooden door at Umah Sora",
    name: "Sora",
    numeral: "II",
    year: "2026",
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
    x: 60,
    y: 938,
    w: 560,
    h: 840,
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
    x: 811,
    y: 1455,
    w: 480,
    h: 560,
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
const CANVAS_H = 2110;
const MOBILE_CANVAS_W = 390;
const MOBILE_CANVAS_H = 920; // was 686 (Figma's own) -- grown to fit the re-spaced my values above without clipping/overlap.

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
        <div className="landing-gallery__caption">
          <p className="landing-gallery__caption-name">
            {card.name} <span>{card.numeral}</span>
          </p>
          <p className="landing-gallery__caption-year">{card.year}</p>
        </div>
      </ScrollFade>
    </div>
  );
}

/**
 * Captioned Editions gallery (Figma node 319:37965, mobile 321:39281):
 * five cards at Figma's own mixed/scattered positions on a
 * 1440-wide, edge-to-edge desktop canvas (not a tidy two-column grid),
 * each at Figma's own real size and its own real aspect-ratio -- see
 * this file's own comment above CARDS for the exact numbers and the
 * re-sync that produced them. Mobile has its own real Figma frame with
 * its own genuinely different mixed layout (not a linear scale-down of
 * the desktop numbers, and not the single stacked column an earlier
 * mobile pass here used before that frame existed) -- mx/my/mw below
 * (mobile's own caption text was scaled down as part of the same group
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
      </div>
    </section>
  );
}
