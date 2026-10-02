import Image from "next/image";
import ScrollFade from "../ScrollFade";

type GalleryItem = { src: string; alt: string; caption: string };

// All five photos are the exact same assets this page's own old
// EditionsFilmstrip reel already used (editions-filmstrip-*.jpg) --
// confirmed one-by-one via direct pixel comparison against each
// downloaded Figma asset, not assumed from similar framing. Figma
// presents them here as a static 5-up captioned row instead of a
// scrolling marquee -- same five photos, new layout, new italic
// captions replacing the filmstrip's own lack of captions.
const ITEMS: GalleryItem[] = [
  {
    src: "/assets/editions/editions-filmstrip-shrine.jpg",
    alt: "Balinese ceremonial umbrellas atop a stone shrine, seen through palm fronds",
    caption: "Approach",
  },
  {
    src: "/assets/editions/editions-filmstrip-living-room.jpg",
    alt: "A corner living room opening onto a jungle canopy through floor-to-ceiling glass",
    caption: "Tresholds",
  },
  {
    src: "/assets/editions/editions-filmstrip-timber-wall.jpg",
    alt: "Dark timber cladding above an outdoor daybed, seen against the surrounding jungle",
    caption: "Stillness",
  },
  {
    src: "/assets/editions/editions-filmstrip-lounge.jpg",
    alt: "A grey sofa with an orange throw pillow beside a window looking onto banana leaves",
    caption: "Gathering",
  },
  {
    src: "/assets/editions/editions-filmstrip-koi-pond.jpg",
    alt: "A stone-edged koi pond beneath a dark timber deck",
    caption: "The Koi",
  },
];

/**
 * Five-photo captioned gallery row (Figma node 309:23047), new on the
 * current "Homepage" frame -- replaces the previous frame's own
 * scattered-position EditionsGallery (five mixed-size cards linking
 * out to each Edition's detail page) entirely. This version is five
 * equal-width columns, each with a plain italic caption underneath
 * (not a link), same photos as this page's own previous
 * EditionsFilmstrip marquee -- see ITEMS' own comment. "Tresholds" is
 * Figma's own literal spelling, kept as-is (same practice this
 * codebase already applies to Figma's own copy elsewhere, e.g.
 * CollectionsCard's note on "each editionS stands").
 */
export default function ApproachGallery() {
  return (
    <section className="landing-approach">
      <ScrollFade className="landing-approach__row">
        {ITEMS.map((item) => (
          <div className="landing-approach__item" key={item.caption}>
            <div className="landing-approach__image">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 900px) 20vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="landing-approach__caption">{item.caption}</p>
          </div>
        ))}
      </ScrollFade>
    </section>
  );
}
