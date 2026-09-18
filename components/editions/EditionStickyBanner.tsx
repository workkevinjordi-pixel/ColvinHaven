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
 * Stays hidden until the visitor has scrolled a full viewport past the
 * top of the page -- roughly the header plus the hero image -- so it
 * doesn't clutter the view while that content (which already shows the
 * same info, full-size) is still on screen. It's still `position:
 * sticky` and in normal document flow the whole time (see globals.css),
 * just faded to invisible until then, so nothing shifts when it
 * appears.
 */
export default function EditionStickyBanner({ data }: { data: EditionData }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
