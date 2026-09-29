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
  wide?: boolean;
  /** Figma's own x/y/width (node 319:37965), as percentages of the
   * 1320px-wide canvas its five cards sit on -- left/top keep Figma's
   * real (mixed, not a tidy 2-column grid) positions verbatim; width
   * is 75% of Figma's own card width, per this section's own resize
   * request. Height isn't set here -- each card's aspect-ratio (below)
   * plus its caption determine that intrinsically. */
  x: number;
  y: number;
  w: number;
  /** Figma's own dedicated MOBILE frame (node 321:39281) for this same
   * gallery -- its own independent x/y/w for each card, not derived
   * from the desktop numbers above (confirmed via a dedicated
   * get_design_context call on that mobile frame specifically). Mobile
   * keeps the same mixed/scattered idea as desktop, just its own
   * layout -- this is NOT the single stacked column an earlier mobile
   * pass here used as a generic fallback before this frame existed.
   *
   * my is NOT Figma's own value for every card (mx/mw are) -- Figma's
   * own vertical gaps were sized for its own illegibly tiny scaled-down
   * caption text (see the caption-size comment below), which fits in
   * far less vertical room than the legible size actually rendered
   * here. Left as Figma's own numbers, every second/third card in each
   * column overlapped the card above it by ~40-55px in practice
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
// Ported as-is, mismatched captions included -- this reads as an
// early placeholder pass (two example photos standing in for a set
// that will eventually have one photo per caption), not a fidelity
// bug to silently "fix" by inventing new pairings.
//
// Positions are Figma's own real x for each card (145, 51, 170, 735,
// 777 on a 1320-wide canvas) -- a genuinely mixed/scattered placement,
// not the tidy two-column grid an earlier pass here simplified it to.
// Card width is 75% of Figma's own (431px -> 323px narrow, 480px ->
// 360px wide); left is NOT rescaled to compensate, so the extra room
// the smaller cards free up reads as breathing space around them, per
// this section's own "cleaner look" request.
//
// y is NOT Figma's own value, unlike x/width above -- per a follow-up
// "20% closer" request, the vertical GAP between successive cards in
// each cluster (left: 0/721/1594, right: 55/989) is 20% smaller than
// Figma's own, with each cluster's first card left anchored at its
// original y: left gaps 721 and 873 become 577 (721*0.8) and 698
// (873*0.8), giving 0 / 577 / 1275; the right gap 934 becomes 747
// (934*0.8), giving 55 / 802.
//
// CANVAS_H below is the left cluster's own new bottom edge (1275 +
// its last card's own height: 420 narrow image + 24px image-caption
// gap + ~61px caption block ~= 505, so 1275+505=1780, rounded up to
// 1790 for a hairline's buffer) -- not a round number and not Figma's
// own 2254, deliberately: a follow-up request to close the gap to the
// next section (A Way of Life) found this canvas was still carrying
// ~155px of dead space below the last card even after the gap
// shortening above, because the canvas height hadn't been brought in
// to match. Trimming it to the cards' own real extent removes that
// slack; the remaining gap is now purely .landing-gallery's own
// bottom padding, see globals.css.
const CARDS: Card[] = [
  {
    src: "/assets/sora-bonsai-entrance.jpg",
    alt: "A bonsai pine beside a round wooden door at Umah Sora",
    name: "Sora",
    numeral: "II",
    year: "2026",
    x: 145,
    y: 0,
    w: 323,
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
    wide: true,
    x: 51,
    y: 577,
    w: 360,
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
    x: 170,
    y: 1275,
    w: 323,
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
    wide: true,
    x: 735,
    y: 55,
    w: 360,
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
    x: 777,
    y: 802,
    w: 323,
    mx: 236.4,
    my: 496,
    mw: 131.13,
  },
];

const CANVAS_W = 1320;
const CANVAS_H = 1790;
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
          className={`landing-gallery__card${card.wide ? " landing-gallery__card--wide" : ""}`}
          aria-label={`View ${card.name} ${card.numeral}`}
        >
          <Image
            src={card.src}
            alt={card.alt}
            fill
            sizes="(min-width: 900px) 28vw, 100vw"
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
 * five cards at Figma's own mixed/scattered x positions on a
 * 1320-wide desktop canvas (not a tidy two-column grid), each card's
 * own width scaled to 75% of Figma's, and each cluster's own vertical
 * gaps tightened to 80% of Figma's -- see this file's own comment
 * above CARDS for the exact numbers. Mobile has its own real Figma
 * frame with its own genuinely different mixed layout (not a linear
 * scale-down of the desktop numbers, and not the single stacked column
 * an earlier mobile pass here used before that frame existed) --
 * mx/my/mw below, at their own 100%-scale card sizes (mobile's own
 * caption text was scaled down as part of the same group resize in
 * that Figma frame, landing on illegibly small 7px/5px sizes; the
 * rendered caption sizes here are a deliberate legible substitute, see
 * globals.css). Both layouts are positioned via CSS custom properties
 * (--x/--y/--w desktop, --mx/--my/--mw mobile) consumed by
 * .landing-gallery__item so the actual percentage math lives once in
 * the stylesheet, not repeated as inline left/top/width on every card.
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
