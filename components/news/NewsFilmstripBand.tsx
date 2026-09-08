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
 * Mid-page eyebrow + lede + filmstrip band (Figma node 205:540) -- the
 * same .centered-statement pattern Editions' intro uses, minus its CTA
 * button (this Figma instance has none), in its own .news-filmstrip-band
 * wrapper rather than .editions-intro's fixed-navbar-clearance padding.
 */
export default function NewsFilmstripBand() {
  return (
    <div className="news-filmstrip-band">
      <ScrollFade className="centered-statement">
        <p className="centered-statement__eyebrow">II/VII</p>
        <p className="centered-statement__lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </ScrollFade>
      <Filmstrip images={REEL} />
    </div>
  );
}
