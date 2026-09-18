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
 * Visible only in the middle stretch of the page: hidden until the
 * visitor has scrolled a full viewport past the top (roughly the
 * header plus the hero image, which already show the same info
 * full-size), and hidden again once they reach the final gallery
 * (#edition-final-gallery, the page's last content block) so it stops
 * competing for attention with the "Next Editions" band right after
 * it. It's still `position: sticky` and in normal document flow the
 * whole time (see globals.css) regardless of which state it's in --
 * only opacity changes, so nothing shifts when it appears or hides.
 */
export default function EditionStickyBanner({ data }: { data: EditionData }) {
  const [pastHero, setPastHero] = useState(false);
  const [reachedFinalGallery, setReachedFinalGallery] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const finalGallery = document.getElementById("edition-final-gallery");
    if (!finalGallery) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setReachedFinalGallery(entry.isIntersecting));
      },
      // Triggers as soon as the final gallery's own top edge reaches
      // the sticky banner's bottom edge, not only once it's already
      // deep in view -- rootMargin's negative top shrinks the
      // "viewport" this observer checks against by roughly that much.
      { threshold: 0, rootMargin: "-120px 0px 0px 0px" },
    );
    observer.observe(finalGallery);
    return () => observer.disconnect();
  }, []);

  const visible = pastHero && !reachedFinalGallery;
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
