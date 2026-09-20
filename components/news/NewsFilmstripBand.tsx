import ScrollFade from "../ScrollFade";
import Filmstrip, { type FilmstripImage } from "../Filmstrip";

// Same two photos as the Editions/Collective filmstrips (Figma reuses
// them here too, node 205:546).
const REEL: FilmstripImage[] = [
  { src: "/assets/editions/tsuki-hero.png", alt: "", wide: false },
  { src: "/assets/editions/tsuki-edition-1.png", alt: "", wide: true },
  { src: "/assets/editions/tsuki-hero.png", alt: "", wide: false },
  { src: "/assets/editions/tsuki-edition-1.png", alt: "", wide: true },
  { src: "/assets/editions/tsuki-hero.png", alt: "", wide: false },
];

/**
 * Mid-page eyebrow + lede + filmstrip band (Figma node 205:540 desktop,
 * 250:11130 mobile) -- the same .centered-statement pattern Editions'
 * intro uses, in its own .news-filmstrip-band wrapper rather than
 * .editions-intro's fixed-navbar-clearance padding. The mobile frame
 * spec (unlike the desktop one this was first built from) includes the
 * same outline "Explore II/VII" CTA EditionsIntro already has, linking
 * to the Sora profile section right below on this page.
 */
export default function NewsFilmstripBand() {
  return (
    <div className="news-filmstrip-band">
      <ScrollFade className="centered-statement">
        <p className="centered-statement__eyebrow">II/VII</p>
        <p className="centered-statement__lead">
          Sora is the second express in the collection — not a smaller
          version of Tsuki, but its true essence distilled into an
          intimate, human scale. The same philosophy, carried forward one
          home at a time.
        </p>
        <a href="#sora" className="centered-statement__cta">
          Explore II/VII
        </a>
      </ScrollFade>
      <Filmstrip images={REEL} />
    </div>
  );
}
