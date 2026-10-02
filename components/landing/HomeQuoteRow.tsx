import Image from "next/image";
import ScrollFade from "../ScrollFade";

type QuoteItem = {
  image: { src: string; alt: string };
  caption: string;
  /** Figma's own fixed pixel width for this slot (638/flex/449) --
   * the middle slot is the only flexible one. */
  width?: number;
};

// Both photos are the same two new assets already downloaded for
// News' own PullQuote collage (pullquote-ceiling-detail.jpg,
// pullquote-walkway-pond.jpg) -- confirmed via identical Figma asset
// hashes between that frame and this one, reused directly rather than
// downloading duplicate files. The walkway photo appears twice here
// (Figma's own two right-hand slots both reference the same "Image"
// layer), not a mistake.
const ITEMS: QuoteItem[] = [
  {
    image: {
      src: "/assets/news/pullquote-ceiling-detail.jpg",
      alt: "A warm timber ceiling and roofline overhang above a dark board-and-batten facade",
    },
    caption:
      "“Designed to belong, Tsuki editions disappear into the landscape, honoring the land rather than overtaking it”",
    width: 638,
  },
  {
    image: {
      src: "/assets/news/pullquote-walkway-pond.jpg",
      alt: "A timber walkway over a koi pond leading toward a dark timber pavilion",
    },
    // Figma's own two caption instances here are the same quote split
    // across two overlapping text boxes -- the second box shows the
    // full, non-truncated sentence, confirming this is one real quote
    // duplicated by a layout accident, not two distinct intended
    // captions. Ported as the one complete sentence for both slots.
    caption:
      "Twenty years of service taught one thing above all a home doesn't gather around a view, it gathers around a kitchen.",
  },
  {
    image: {
      src: "/assets/news/pullquote-walkway-pond.jpg",
      alt: "A timber walkway over a koi pond leading toward a dark timber pavilion",
    },
    caption:
      "Twenty years of service taught one thing above all a home doesn't gather around a view, it gathers around a kitchen.",
    width: 449,
  },
];

/**
 * Three-photo captioned row (Figma node 371:40199), new on the current
 * "Homepage" frame -- no equivalent section existed on the previous
 * build. Each photo has its own caption directly beneath it, all three
 * at a fixed 520px height; the first and third slots are fixed-width,
 * the middle one fills the remaining space.
 */
export default function HomeQuoteRow() {
  return (
    <section className="landing-quote-row">
      <ScrollFade className="landing-quote-row__inner">
        {ITEMS.map((item, i) => (
          <div
            className="landing-quote-row__item"
            key={i}
            style={item.width ? { flex: `0 0 ${item.width}px` } : undefined}
          >
            <div className="landing-quote-row__image">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(min-width: 900px) 638px, 100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="landing-quote-row__caption">{item.caption}</p>
          </div>
        ))}
      </ScrollFade>
    </section>
  );
}
