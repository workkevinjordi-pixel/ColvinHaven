"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

// Matches the CSS draw-stroke keyframe this replaces: each path spends
// the first 65% of its own local window tracing its outline
// (stroke-dashoffset 1 -> 0) and the remaining 35% filling in solid
// (fill-opacity 0 -> 1).
const OUTLINE_FRACTION = 0.65;
// ms -- must match the per-path duration the SVG's own animation-delay
// values were authored against (see public/assets/section-drawing.svg's
// preprocessing), since a path's local window is [delay, delay+DURATION].
const DURATION = 1200;

/**
 * Scroll-scrubbed variant of AnimatedDrawing, for the homepage's Drawing
 * section only -- deliberately a separate component (own drawing-scroll__*
 * classes) rather than a mode on the shared one, so option4/5/6's
 * AnimatedDrawing usage (IntersectionObserver + CSS-driven one-shot
 * reveal) is untouched.
 *
 * Renders its own tall "runway" section with a position: sticky pin
 * (same mechanism as FeatureSplit's scroll-scrub) holding the SVG in
 * place while the page scrolls through it. Instead of a CSS animation
 * running on a wall clock, each path's stroke-dashoffset/fill-opacity is
 * set directly from scroll progress every frame, mapped against that
 * path's own [delay, delay+DURATION] window (parsed from the
 * animation-delay the SVG already carries) -- so the drawing completes
 * exactly when the user finishes scrolling through the section, not on
 * its own timer, and reverses cleanly if they scroll back up.
 */
export default function ScrollDrawing({
  svgMarkup,
  src,
  heading,
  className,
  scroll = true,
}: {
  /** The SVG source inlined by the server (what the homepage did). */
  svgMarkup?: string;
  /** Or a URL to fetch it from after the page loads -- keeps the ~490 KB
   * of markup out of the page's HTML (and its RSC payload). */
  src?: string;
  /** Optional heading shown above the drawing, inside the pinned frame. */
  heading?: ReactNode;
  className?: string;
  /** false = no scroll effect: the finished drawing is simply shown (no
   * pinned runway, no scroll listener). */
  scroll?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [markup, setMarkup] = useState(svgMarkup ?? "");

  useEffect(() => {
    if (svgMarkup || !src) return;
    let cancelled = false;
    fetch(src)
      .then((res) => (res.ok ? res.text() : ""))
      .then((text) => {
        if (!cancelled) setMarkup(text);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [svgMarkup, src]);

  useEffect(() => {
    const section = sectionRef.current;
    const svgContainer = svgContainerRef.current;
    if (!scroll || !section || !svgContainer || !markup) return;

    const paths = Array.from(
      svgContainer.querySelectorAll<SVGPathElement>(".draw-path"),
    );
    const entries = paths.map((path) => ({
      path,
      delay: parseFloat(path.style.animationDelay) || 0,
    }));
    const maxDelay = entries.reduce((m, e) => Math.max(m, e.delay), 0);
    const timeline = maxDelay + DURATION;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      // No scroll-jacked runway for these users (handled in CSS too) --
      // just show the finished drawing.
      entries.forEach(({ path }) => {
        path.style.strokeDashoffset = "0";
        path.style.fillOpacity = "1";
      });
      return;
    }

    let targetProgress = 0;
    let shownProgress = -1; // -1 so the very first render always applies
    let ticking = false;
    let rafId = 0;

    function computeProgress() {
      const rect = section!.getBoundingClientRect();
      const scrollable = section!.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return 1;
      const scrolled = -rect.top;
      let p = scrolled / scrollable;
      if (p < 0) p = 0;
      if (p > 1) p = 1;
      return p;
    }

    function render() {
      ticking = false;
      if (shownProgress < 0) {
        shownProgress = targetProgress;
      } else {
        const diff = targetProgress - shownProgress;
        shownProgress += diff * 0.2;
        if (Math.abs(diff) < 0.0005) shownProgress = targetProgress;
      }

      const t = shownProgress * timeline;
      entries.forEach(({ path, delay }) => {
        let local = (t - delay) / DURATION;
        if (local < 0) local = 0;
        if (local > 1) local = 1;

        let dashoffset: number;
        let fillOpacity: number;
        if (local <= OUTLINE_FRACTION) {
          dashoffset = 1 - local / OUTLINE_FRACTION;
          fillOpacity = 0;
        } else {
          dashoffset = 0;
          fillOpacity = (local - OUTLINE_FRACTION) / (1 - OUTLINE_FRACTION);
        }
        path.style.strokeDashoffset = dashoffset.toFixed(3);
        path.style.fillOpacity = fillOpacity.toFixed(3);
      });

      if (Math.abs(targetProgress - shownProgress) > 0.0005) {
        rafId = requestAnimationFrame(render);
        ticking = true;
      }
    }

    function requestTick() {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(render);
      }
    }

    function onScroll() {
      targetProgress = computeProgress();
      requestTick();
    }

    onScroll(); // set correct state immediately, e.g. on a mid-scroll reload
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [markup, scroll]);

  return (
    <section
      className={`drawing-scroll${scroll ? "" : " drawing-scroll--static"}${className ? ` ${className}` : ""}`}
      ref={sectionRef}
    >
      <div className="drawing-scroll__pin">
        <div className="drawing-scroll__frame">
          {heading}
          <div
            ref={svgContainerRef}
            className="drawing-scroll__svg"
            // Static, build-time-read local SVG asset, not user input.
            dangerouslySetInnerHTML={{ __html: markup }}
          />
        </div>
      </div>
    </section>
  );
}
