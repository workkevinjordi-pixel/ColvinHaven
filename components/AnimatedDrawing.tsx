"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders inline SVG markup (required so its individual <path> elements
 * are addressable by CSS -- an <img src="..."> treats an SVG as an
 * opaque raster and gives no access to its internals) and toggles a
 * class that triggers each path's staggered reveal animation
 * (.draw-path / animation-delay, set per-path when the source SVG was
 * preprocessed) once the section scrolls into view. Reactive like
 * ScrollFade: scrolling back out resets it, so it replays if you scroll
 * back to it, rather than a one-shot entrance.
 */
export default function AnimatedDrawing({ svgMarkup }: { svgMarkup: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setVisible(entry.isIntersecting));
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`drawing__svg${visible ? " drawing__svg--visible" : ""}`}
      // Static, build-time-read local SVG asset, not user input.
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
}
