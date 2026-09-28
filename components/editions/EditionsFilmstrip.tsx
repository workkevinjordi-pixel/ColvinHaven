"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type EditionsFilmstripImage = { src: string; alt: string };

type EditionsFilmstripProps = {
  images: EditionsFilmstripImage[];
  /** Desktop-only: 0-based index of the one card given the narrower
   * "flex" slot (Figma node 250:9164's fixed 280/280/224/280/280
   * composition). Irrelevant on mobile, where every card is the same
   * base size and swiping is what makes the centered one bigger. */
  narrowIndex?: number;
  /** Renders a small dot-pagination row below the mobile swiper,
   * tracking scroll progress (node 298:14863 -- only the homepage-new
   * usage of this component has this; the Editions page's own intro
   * filmstrip doesn't, so this defaults off). */
  showDots?: boolean;
  /** How many dots to render -- Figma's own dot row (298:14863) shows
   * 6 regardless of this reel's 5 images, so callers that want to
   * match that exactly pass 6 rather than relying on images.length. */
  dotCount?: number;
};

/**
 * Editions-page-only filmstrip (Figma nodes 250:9164 desktop /
 * 250:10471 mobile): five portrait photos in a fixed row on desktop,
 * identical to before. Below the 1000px breakpoint this is NOT the
 * shared Filmstrip component's auto-scrolling marquee (News/Collective/
 * the rest of this same Editions page keep that) -- here it's a
 * touch-swiper instead, deliberately requested as its own distinct
 * interaction: every card shares one base size, and whichever one is
 * nearest the viewport's center as the user swipes scales up in place,
 * scaling back down as it's swiped away from center.
 */
export default function EditionsFilmstrip({
  images,
  narrowIndex = 2,
  showDots = false,
  dotCount,
}: EditionsFilmstripProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scales, setScales] = useState<number[]>(() => images.map(() => 1));
  const [activeDot, setActiveDot] = useState(0);
  const dots = dotCount ?? images.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const mobileQuery = window.matchMedia("(max-width: 1000px)");

    function updateScales() {
      const el = trackRef.current;
      if (!el || !mobileQuery.matches) {
        setScales(images.map(() => 1));
        return;
      }
      const rect = el.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const items = Array.from(
        el.querySelectorAll<HTMLElement>(".editions-swiper__item"),
      );
      setScales(
        items.map((item) => {
          const r = item.getBoundingClientRect();
          const itemCenter = r.left + r.width / 2;
          const dist = Math.abs(itemCenter - center);
          // 1 right at the viewport center, fading to 0 by ~55% of the
          // track's own width away from it.
          const falloff = Math.max(0, 1 - dist / (rect.width * 0.55));
          return 0.85 + falloff * 0.4; // 0.85 (smallest) .. 1.25 (centered)
        }),
      );

      // Maps the track's own scroll progress (0 at the start, 1 at the
      // far end) onto a dot index -- independent of `scales` above,
      // which is per-card and doesn't by itself say "how far along."
      const maxScroll = el.scrollWidth - el.clientWidth;
      const progress = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
      setActiveDot(Math.min(dots - 1, Math.round(progress * (dots - 1))));
    }

    updateScales();
    track.addEventListener("scroll", updateScales, { passive: true });
    window.addEventListener("resize", updateScales);
    mobileQuery.addEventListener("change", updateScales);
    return () => {
      track.removeEventListener("scroll", updateScales);
      window.removeEventListener("resize", updateScales);
      mobileQuery.removeEventListener("change", updateScales);
    };
  }, [images, dots]);

  return (
    <>
      <div
        className="editions-swiper"
        ref={trackRef}
        role="region"
        aria-label="Editions photos"
        tabIndex={0}
      >
        {images.map((img, i) => (
          <div
            key={img.src}
            className={`editions-swiper__item${
              i === narrowIndex ? " editions-swiper__item--narrow" : ""
            }`}
            style={{ transform: `scale(${scales[i] ?? 1})` }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1001px) 280px, 200px"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
      {showDots && (
        <div
          className="editions-swiper__dots"
          aria-hidden="true"
          // Only meaningful/visible below the 1000px breakpoint (same
          // one the swiper interaction itself is scoped to) -- CSS
          // hides this entirely at desktop widths, see globals.css.
        >
          {Array.from({ length: dots }, (_, i) => (
            <span
              key={i}
              className={`editions-swiper__dot${
                i === activeDot ? " editions-swiper__dot--active" : ""
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}
