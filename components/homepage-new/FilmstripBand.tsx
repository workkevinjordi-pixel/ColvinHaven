import ScrollFade from "../ScrollFade";
import EditionsFilmstrip, {
  type EditionsFilmstripImage,
} from "../editions/EditionsFilmstrip";

// Same five photos, same 280/280/flex/280/280 composition, as the
// Editions page's own intro filmstrip (Figma node 250:9164) -- this
// frame (298:13386) is a verbatim reuse of that filmstrip, confirmed
// via hash on every image, not a new set.
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
 * Lede paragraph + filmstrip (Figma node 298:13386). The lede is
 * literal Lorem Ipsum in this Figma frame -- per explicit "make sure
 * the text exactly the same" direction, ported as-is rather than
 * swapped for real copy (this page's earlier pass here had used
 * Editions' own intro lede instead; reverted).
 */
export default function FilmstripBand() {
  return (
    <div className="hpn-filmstrip-band">
      <ScrollFade>
        <p className="hpn-filmstrip-band__lede">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      </ScrollFade>
      <EditionsFilmstrip images={REEL} />
    </div>
  );
}
