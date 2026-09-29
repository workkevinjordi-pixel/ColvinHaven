import Image from "next/image";

type Item = { src: string; alt: string; w: number; h: number };

// Figma's own dedicated mobile frame (node 321:39410) uses a genuinely
// different image set from the desktop /landing filmstrip just above
// it in this file (which reuses the standard Editions-page reel) --
// confirmed via a dedicated get_design_context call on this exact
// mobile frame, not assumed to mirror the desktop one just because the
// section sits in the same position. Just two photos, alternating:
// gallery.png (the homepage's own courtyard/boardwalk shot) at the
// three narrower/outer slots, and tsuki-edition-1.png (Umah Tsuki's
// shou sugi ban roofline detail, already used on the real homepage's
// own EditionsCards) at the two wider slots in between.
const ITEMS: Item[] = [
  { src: "/assets/gallery.png", alt: "Umah Tsuki courtyard", w: 144, h: 240 },
  {
    src: "/assets/editions/tsuki-edition-1.png",
    alt: "Detail of Umah Tsuki's shou sugi ban roofline and timber-framed window",
    w: 225,
    h: 240,
  },
  { src: "/assets/gallery.png", alt: "Umah Tsuki courtyard", w: 192, h: 320 },
  {
    src: "/assets/editions/tsuki-edition-1.png",
    alt: "Detail of Umah Tsuki's shou sugi ban roofline and timber-framed window",
    w: 225,
    h: 240,
  },
  { src: "/assets/gallery.png", alt: "Umah Tsuki courtyard", w: 144, h: 240 },
];

/**
 * Mobile-only filmstrip row (Figma node 321:39410): a centered flex
 * row wider than the viewport, so the two "wide" slots' own photo
 * bleeds off both edges rather than being reachable by a swipe --
 * static, not the desktop EditionsFilmstrip's own touch-swiper
 * interaction, since this is a different component for a different
 * image set (see ITEMS' own comment), not a mobile mode of that one.
 * Rendered alongside EditionsFilmstrip in app/landing/page.tsx, with
 * CSS (not JS) choosing which of the two actually displays at a given
 * width -- see globals.css.
 */
export default function MobileFilmstrip() {
  return (
    <div className="landing-mobile-filmstrip">
      {ITEMS.map((item, i) => (
        <div
          key={i}
          className="landing-mobile-filmstrip__item"
          style={{ width: item.w, height: item.h }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="240px"
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}
    </div>
  );
}
