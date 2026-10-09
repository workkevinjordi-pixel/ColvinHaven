import Image from "next/image";
import ScrollFade from "../ScrollFade";

type ApproachGalleryProps = {
  items?: { image: { src: string; alt: string }; caption: string }[];
};

// Figma gives the middle ("Stillness") column a fixed 240px width
// (node 371:40266) while the other four flex equally -- a pure layout
// decision, not content, so it stays here in code (tied to array
// index 2) rather than becoming an editable Sanity field.
const FIXED_INDEX = 2;

// Matches the content migrated into Sanity's homepage.approachGallery
// (see lib/sanity/homepage.ts and app/page.tsx) -- kept as a fallback
// here in case the fetch ever comes back empty, not the source of
// truth. "Tresholds" is Figma's own literal spelling, kept as-is (same
// practice this codebase already applies to Figma's own copy
// elsewhere, e.g. CollectionsCard's note on "each editionS stands").
const DEFAULT_ITEMS: ApproachGalleryProps["items"] = [
  {
    image: {
      src: "/assets/editions/editions-filmstrip-shrine.jpg",
      alt: "Balinese ceremonial umbrellas atop a stone shrine, seen through palm fronds",
    },
    caption: "Approach",
  },
  {
    image: {
      src: "/assets/editions/editions-filmstrip-living-room.jpg",
      alt: "A corner living room opening onto a jungle canopy through floor-to-ceiling glass",
    },
    caption: "Tresholds",
  },
  {
    image: {
      src: "/assets/editions/editions-filmstrip-timber-wall.jpg",
      alt: "Dark timber cladding above an outdoor daybed, seen against the surrounding jungle",
    },
    caption: "Stillness",
  },
  {
    image: {
      src: "/assets/editions/editions-filmstrip-lounge.jpg",
      alt: "A grey sofa with an orange throw pillow beside a window looking onto banana leaves",
    },
    caption: "Gathering",
  },
  {
    image: {
      src: "/assets/editions/editions-filmstrip-koi-pond.jpg",
      alt: "A stone-edged koi pond beneath a dark timber deck",
    },
    caption: "The Koi",
  },
];

/**
 * Five-photo captioned gallery row (Figma node 309:23047): five equal-
 * width columns (the middle one narrower), each with a plain italic
 * caption underneath (not a link). Content now comes from Sanity's
 * homepage.approachGallery.
 */
export default function ApproachGallery({ items = DEFAULT_ITEMS }: ApproachGalleryProps) {
  return (
    <section className="landing-approach">
      <ScrollFade className="landing-approach__row">
        {items!.map((item, i) => (
          <div
            className={
              i === FIXED_INDEX
                ? "landing-approach__item landing-approach__item--fixed"
                : "landing-approach__item"
            }
            key={i}
          >
            <div className="landing-approach__image">
              <Image
                src={item.image.src}
                alt={item.image.alt}
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
