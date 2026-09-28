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

type FilmstripBandProps = {
  lede?: React.ReactNode;
};

/**
 * Lede paragraph + filmstrip (Figma node 298:13386). The lede is
 * literal Lorem Ipsum in this Figma frame -- default prop here is real
 * copy (same seven-Editions framing as EditionsNewIntro's own lede),
 * same pattern as Cta's own default/override split: a page built under
 * an explicit "make sure the text exactly the same" direction passes
 * the Lorem Ipsum in as an override (see app/homepage-new/page.tsx),
 * every other page -- including the real homepage, which has no such
 * direction -- gets real copy for free via the default.
 */
export default function FilmstripBand({
  lede = (
    <>
      There will only ever be seven Editions in this first series — each
      one a singular commission, conceived for a single family and
      built entirely by hand. Some are already complete. Others are
      still taking shape.
    </>
  ),
}: FilmstripBandProps = {}) {
  return (
    <div className="hpn-filmstrip-band">
      <ScrollFade>
        <p className="hpn-filmstrip-band__lede">{lede}</p>
      </ScrollFade>
      <EditionsFilmstrip images={REEL} showDots dotCount={6} />
    </div>
  );
}
