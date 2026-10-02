import Image from "next/image";
import ScrollFade from "../ScrollFade";

type QuoteItem = {
  image: { src: string; alt: string };
  caption: string;
  /** Figma's own fixed pixel width for this slot (638/345/449, every
   * slot -- not just the first and last). The three sum with the 4px
   * gaps between them to exactly 1440px, this frame's own full canvas
   * width -- confirmed via metadata, not assumed from the flex
   * classes alone (Tailwind's own `flex-[1_0_0]` on the middle slot
   * reads as fluid, but its sibling `w-[345px]` and the metadata's own
   * x/width values both pin it to that same fixed number). */
  width: number;
};

// Re-verified via a dedicated get_metadata + get_design_context re-fetch
// of this exact node (371:40199) -- the first pass had wrongly reused
// the same photo for both the middle and right slots. All three are
// genuinely distinct photos, confirmed one-by-one via direct visual
// comparison against every other photo already on the site before
// downloading: the left one is still the same ceiling/roofline detail
// already reused from News' own PullQuote collage (confirmed via
// identical Figma asset hash between the two frames); the middle and
// right are both new -- a covered walkway leading down timber steps
// toward a garden gate, and a shoji-screened bedroom corner -- run
// through this project's own export pipeline, not reused from
// anywhere else on the site.
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
      src: "/assets/homequoterow-corridor-steps.jpg",
      alt: "A covered timber walkway leading down a staircase toward a garden gate",
    },
    // Figma's own caption here is a literal text-box overflow
    // truncation of the exact same sentence the third slot's own
    // caption shows in full (confirmed character-for-character: this
    // one is a clean prefix of that one, both boxes fixed at the same
    // single-line 48px height) -- not two distinct intended captions.
    // Ported as the one complete sentence, same as the third slot.
    caption:
      "Twenty years of service taught one thing above all a home doesn't gather around a view, it gathers around a kitchen.",
    width: 345,
  },
  {
    image: {
      src: "/assets/homequoterow-shoji-bedroom.jpg",
      alt: "A shoji-screened bedroom corner with a low bed and two wall sconces",
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
 * at a fixed 520px height. Full-bleed edge-to-edge at this frame's own
 * 1440px canvas width (zero side padding, explicit follow-up request
 * confirming what the frame's own metadata already showed: no gutter,
 * the three fixed widths plus their 4px gaps sum to exactly 1440) --
 * same max-width-but-no-gutter treatment the site's other full-bleed
 * sections already use (e.g. .editions-hero), not inset within the
 * standard --gutter content column like most sections.
 */
export default function HomeQuoteRow() {
  return (
    <section className="landing-quote-row">
      <ScrollFade className="landing-quote-row__inner">
        {ITEMS.map((item, i) => (
          <div
            className="landing-quote-row__item"
            key={i}
            style={{ flexBasis: `${(item.width / 1432) * 100}%` }}
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
