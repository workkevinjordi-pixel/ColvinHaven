import ScrollFade from "../ScrollFade";
import Filmstrip, { type FilmstripImage } from "../Filmstrip";

// Alternating narrow/wide filmstrip, matching the Figma "Editions" frame
// (node 203:131): Image / edition 1 / Image / edition 2 / Image. Figma
// reuses the same two placeholder photos across all five slots -- kept
// as-is here rather than inventing new crops.
const REEL: FilmstripImage[] = [
  { src: "/assets/editions/tsuki-hero.png", alt: "", wide: false },
  { src: "/assets/editions/tsuki-edition-1.png", alt: "", wide: true },
  { src: "/assets/editions/tsuki-hero.png", alt: "", wide: false },
  { src: "/assets/editions/tsuki-edition-1.png", alt: "", wide: true },
  { src: "/assets/editions/tsuki-hero.png", alt: "", wide: false },
];

/**
 * Top-of-page intro: faded roman-numeral eyebrow, a lede paragraph
 * (real copy, per the funnel strategy's "seven Editions, ever" framing
 * -- Figma's own placeholder was still Lorem Ipsum here), an outline
 * CTA, and a filmstrip that bleeds past the standard content column on
 * both sides.
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

      <Filmstrip images={REEL} />
    </section>
  );
}
