import Image from "next/image";

export type FilmstripImage = { src: string; alt: string; wide?: boolean };

function FilmstripItems({
  images,
  hidden,
}: {
  images: FilmstripImage[];
  hidden?: boolean;
}) {
  return (
    <div className="filmstrip__group" aria-hidden={hidden || undefined}>
      {images.map((item, i) => (
        <div
          key={i}
          className={`filmstrip__item${item.wide ? " filmstrip__item--wide" : ""}`}
        >
          <Image
            src={item.src}
            alt={hidden ? "" : item.alt}
            fill
            sizes={item.wide ? "443px" : "284px"}
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}
    </div>
  );
}

/**
 * Full-bleed alternating narrow/wide image strip -- bleeds 309px past the
 * standard 1216px content column on both sides (1216 + 309*2 = 1834,
 * matching both Figma frames that use this pattern: Editions node 203:131
 * and Collective node 205:377). Shared because both pages reuse it
 * verbatim, not just visually similar.
 *
 * Below .filmstrip's 1000px breakpoint, Figma's own mobile frames just
 * mark this row scrollable -- but a manual horizontal scroll on a strip
 * this wide reads as broken/overflowing rather than intentional, so this
 * instead auto-advances as a slow, continuous marquee (CSS-only, no
 * scroll needed). `.filmstrip__group` is rendered twice -- the second,
 * `aria-hidden` copy is what the loop scrolls onto once the first has
 * passed -- with every `.filmstrip__item` given an explicit trailing
 * margin (rather than the group's own `gap`) so the two groups sit
 * exactly one gap apart, back to back: that makes each group exactly
 * half of .filmstrip__track's total width, so animating to translateX(
 * -50%) lands precisely back on the loop's start with no visible seam
 * or jump. Desktop only shows the first, real group -- see
 * .filmstrip__group[aria-hidden] in globals.css.
 */
export default function Filmstrip({ images }: { images: FilmstripImage[] }) {
  return (
    <div className="filmstrip">
      <div className="filmstrip__track">
        <FilmstripItems images={images} />
        <FilmstripItems images={images} hidden />
      </div>
    </div>
  );
}
