"use client";

import { useEffect, useState } from "react";
import type { EditionData } from "./editions-data";

/**
 * Sticky info strip (Figma node 248:5222) -- sits flush against the
 * fixed navbar's own bottom edge as the visitor scrolls through an
 * edition's detail page, keeping which project they're on (and its
 * basic facts) always in view. Same index/name/meta fields
 * EditionDetailHeader already shows up top; this is just a persistent,
 * compact echo of it.
 *
 * Visible only while the viewport is actually within the project's own
 * content (EditionSpotlight -- hero through the closing gallery):
 * hidden above it (header/hero, which already show the same info
 * full-size) and hidden below it ("Next Editions" and the Cta/Footer,
 * which aren't about this project specifically anymore). Fully
 * reactive in both directions -- scroll back up into the content and
 * it reappears, scroll past either edge and it hides, tracked live off
 * scroll position rather than a one-shot trigger. It's still
 * `position: sticky` and in normal document flow the whole time (see
 * globals.css) regardless of which state it's in -- only opacity
 * changes, so nothing shifts when it appears or hides.
 */
export default function EditionStickyBanner({ data }: { data: EditionData }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const pastHero = window.scrollY > window.innerHeight;

      // "Below the content" once the closing gallery's own bottom edge
      // has scrolled up past the sticky banner's own height (~40px) --
      // at that point nothing of the project's content is left on
      // screen, just "Next Editions" and what follows. Recomputed live
      // on every scroll, not a one-shot latch, so scrolling back up
      // past that same line brings the banner back.
      const finalGallery = document.getElementById("edition-final-gallery");
      const belowContent = finalGallery
        ? finalGallery.getBoundingClientRect().bottom <= 40
        : false;

      setVisible(pastHero && !belowContent);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const { type, location, year } = data.meta;

  return (
    <div
      className={`edition-sticky-banner${visible ? " edition-sticky-banner--visible" : ""}`}
    >
      <div className="edition-sticky-banner__title">
        <span className="edition-sticky-banner__index">{data.index}</span>
        <span className="edition-sticky-banner__name">{data.name}</span>
      </div>
      <div className="edition-sticky-banner__meta">
        <span>{type}</span>
        <span className="edition-sticky-banner__meta-divider" aria-hidden="true" />
        <span>{location}</span>
        <span className="edition-sticky-banner__meta-divider" aria-hidden="true" />
        <span>{year}</span>
      </div>
    </div>
  );
}
