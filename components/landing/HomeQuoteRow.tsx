import Image from "next/image";
import ScrollFade from "../ScrollFade";

type QuoteRowProps = {
  items?: { image: { src: string; alt: string }; caption: string }[];
};

// Figma's own fixed pixel width for each slot (638/345/449, every
// slot -- not just the first and last). The three sum with the 4px
// gaps between them to exactly 1440px, this frame's own full canvas
// width -- confirmed via metadata, not assumed from the flex classes
// alone. A pure layout decision, not content, so it stays here in
// code rather than becoming an editable Sanity field -- zipped with
// the fetched items by index below.
const WIDTHS = [638, 345, 449];

// Matches the content migrated into Sanity's homepage.quoteRow (see
// lib/sanity/homepage.ts and app/page.tsx) -- kept as a fallback here
// in case the fetch ever comes back empty, not the source of truth.
const DEFAULT_ITEMS: QuoteRowProps["items"] = [
  {
    image: {
      src: "/assets/news/pullquote-ceiling-detail.jpg",
      alt: "A warm timber ceiling and roofline overhang above a dark board-and-batten facade",
    },
    caption:
      "“Designed to belong, Tsuki editions disappear into the landscape, honoring the land rather than overtaking it”",
  },
  {
    image: {
      src: "/assets/homequoterow-corridor-steps.jpg",
      alt: "A covered timber walkway leading down a staircase toward a garden gate",
    },
    caption:
      "Twenty years of service taught one thing above all a home doesn't gather around a view, it gathers around a kitchen.",
  },
  {
    image: {
      src: "/assets/homequoterow-shoji-bedroom.jpg",
      alt: "A shoji-screened bedroom corner with a low bed and two wall sconces",
    },
    caption:
      "Twenty years of service taught one thing above all a home doesn't gather around a view, it gathers around a kitchen.",
  },
];

/**
 * Three-photo captioned row (Figma node 371:40199), full-bleed edge-
 * to-edge at this frame's own 1440px canvas width. Content now comes
 * from Sanity's homepage.quoteRow.
 */
export default function HomeQuoteRow({ items = DEFAULT_ITEMS }: QuoteRowProps) {
  return (
    <section className="landing-quote-row">
      <ScrollFade className="landing-quote-row__inner">
        {items!.map((item, i) => (
          <div
            className="landing-quote-row__item"
            key={i}
            style={{ flexBasis: `${(WIDTHS[i] / 1432) * 100}%` }}
          >
            <div className="landing-quote-row__image">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(min-width: 900px) 45vw, 100vw"
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
