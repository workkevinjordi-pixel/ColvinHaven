import ScrollFade from "../ScrollFade";
import EditionsFilmstrip, {
  type EditionsFilmstripImage,
} from "./EditionsFilmstrip";

// Re-synced against the current Figma "Editions" frame (node 250:9129,
// filmstrip at node 250:9164): five genuinely distinct photos, not the
// two reused ones (tsuki-hero.png / tsuki-edition-1.png) this used to
// alternate -- confirmed via hash, none of these match any asset
// already on the site.
const REEL: EditionsFilmstripImage[] = [
  {
    src: "/assets/editions/editions-filmstrip-shrine.jpg",
    alt: "Balinese ceremonial umbrellas atop a stone shrine, seen through palm fronds",
  },
  {
    src: "/assets/editions/editions-filmstrip-living-room.jpg",
    alt: "A corner living room opening onto a jungle canopy through floor-to-ceiling glass",
  },
  {
    src: "/assets/editions/editions-filmstrip-timber-wall.jpg",
    alt: "Dark timber cladding above an outdoor daybed, seen against the surrounding jungle",
  },
  {
    src: "/assets/editions/editions-filmstrip-lounge.jpg",
    alt: "A grey sofa with an orange throw pillow beside a window looking onto banana leaves",
  },
  {
    src: "/assets/editions/editions-filmstrip-koi-pond.jpg",
    alt: "A stone-edged koi pond beneath a dark timber deck",
  },
];

/**
 * Top-of-page intro: faded roman-numeral eyebrow, a lede paragraph
 * (real copy, per the funnel strategy's "seven Editions, ever" framing
 * -- Figma's own placeholder was still Lorem Ipsum here), an outline
 * CTA, and a filmstrip that spans the full page width.
 *
 * The filmstrip itself is EditionsFilmstrip, not the shared Filmstrip
 * component News/Collective use -- this page's own mobile interaction
 * is a swiper (each photo scales up as it's swiped to center) rather
 * than their auto-scrolling marquee, a deliberate, page-specific
 * request rather than a shared pattern.
 */
export default function EditionsIntro() {
  return (
    <section className="editions-intro">
      <ScrollFade className="centered-statement">
        <p className="centered-statement__eyebrow">II/VII</p>
        <p className="centered-statement__lead">
          There will only ever be seven Editions in this first series —
          each one a singular commission, conceived for a single family and
          built entirely by hand. Some are already complete. Others are
          still taking shape. This is where they stand today.
        </p>
        <a href="#editions" className="centered-statement__cta">
          Explore II/VII
        </a>
      </ScrollFade>

      <EditionsFilmstrip images={REEL} />
    </section>
  );
}
