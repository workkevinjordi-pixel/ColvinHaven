import ScrollFade from "../ScrollFade";
import EditionsFilmstrip, {
  type EditionsFilmstripImage,
} from "../editions/EditionsFilmstrip";

// Same five photos as the Editions page's own intro filmstrip (Figma
// node 250:9164) -- this frame's own filmstrip (node 303:15092) is a
// verbatim reuse, confirmed via hash on every image, not a new set.
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
 * Top-of-page lede + filmstrip (Figma node 303:15089): simpler than
 * the /editions page's own intro (EditionsIntro) -- no "II/VII"
 * eyebrow, no "Explore" CTA, just the centered paragraph. That
 * paragraph is literal Lorem Ipsum in this Figma frame; real copy
 * adapted from Editions' own intro lede is used here instead (same
 * seven-Editions framing, minus the eyebrow/CTA this frame has no
 * room for) -- matching this codebase's established practice of not
 * porting a stale/placeholder paragraph just because Figma still
 * shows one, per the CH Collections and Editions-card precedent
 * elsewhere on this page.
 */
export default function EditionsNewIntro() {
  return (
    <section className="edn-intro">
      <ScrollFade>
        <p className="edn-intro__lede">
          There will only ever be seven Editions in this first series —
          each one a singular commission, conceived for a single family
          and built entirely by hand. Some are already complete. Others
          are still taking shape.
        </p>
      </ScrollFade>
      <EditionsFilmstrip images={REEL} showDots dotCount={6} />
    </section>
  );
}
