import Image from "next/image";
import ScrollFade from "../ScrollFade";
import Swiper from "../ui/Swiper";

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
      "Designed to belong, Tsuki disappear into the landscape, honoring the land rather than overtaking it",
  },
  {
    image: {
      src: "/assets/homequoterow-corridor-steps.jpg",
      alt: "A covered timber walkway leading down a staircase toward a garden gate",
    },
    caption:
      "Seven steps down come up and the day gets quitter. Welcome to Sora.",
  },
  {
    image: {
      src: "/assets/homequoterow-shoji-bedroom.jpg",
      alt: "A shoji-screened bedroom corner with a low bed and two wall sconces",
    },
    caption:
      "A door left open, and the room is already warm.\nA place to settle in.",
  },
];

/**
 * Three-photo captioned row (Figma node 371:40199), full-bleed edge-
 * to-edge at this frame's own 1440px canvas width (captions re-synced
 * to node 385:1262). Content now comes
 * from Sanity's homepage.quoteRow.
 */
// Photos 4-7 of the row (Figma nodes 461:803, 461:807, 385:1272, 385:1264).
// They have no captions in the design. Appended after the photos from
// Sanity; they go away if the editors add their own photos instead.
const EXTRA_ITEMS: NonNullable<QuoteRowProps["items"]> = [
  {
    image: {
      src: "/assets/home-quote-4-pavilion.jpg",
      alt: "A dark timber pavilion on a raised deck, a boardwalk crossing a pond in a tropical garden",
    },
    caption: "",
  },
  {
    image: {
      src: "/assets/home-quote-5-koi-pond.jpg",
      alt: "Koi swimming in a dark pond beneath tree ferns and river stones",
    },
    caption: "",
  },
  {
    image: {
      src: "/assets/home-quote-6-kitchen.jpg",
      alt: "A teak kitchen with a black stone island, a tall gridded window opening onto tropical foliage",
    },
    caption: "",
  },
  {
    image: {
      src: "/assets/home-quote-7-garden-gate.jpg",
      alt: "A black timber garden gate framed by a stone wall, lawn and stone steps",
    },
    caption: "",
  },
];

function withExtras(real: NonNullable<QuoteRowProps["items"]>) {
  return real.length === 0 ? real : [...real, ...EXTRA_ITEMS];
}

export default function HomeQuoteRow({ items = DEFAULT_ITEMS }: QuoteRowProps) {
  const rowItems = withExtras(items!);
  return (
    <section className="landing-quote-row">
      <ScrollFade>
        {/* Swiper: shows up to three photos at once at their Figma widths
            (638/345/449, repeating for any further photos) and scrolls in
            steps; the arrows only appear when there are more than three. */}
        <Swiper
          className="landing-quote-row__swiper"
          trackClassName="landing-quote-row__inner"
          tone="dark"
          label="Photos"
        >
          {rowItems.map((item, i) => (
            <div
              className="landing-quote-row__item"
              key={i}
              style={{
                flexBasis: `calc(${(WIDTHS[i % WIDTHS.length] / 1432) * 100}% - 2.67px)`,
              }}
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
              {item.caption && (
                <p className="landing-quote-row__caption">{item.caption}</p>
              )}
            </div>
          ))}
        </Swiper>
      </ScrollFade>
    </section>
  );
}
