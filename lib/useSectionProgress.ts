"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";

type Options = {
  /** 0-1, how quickly the shown value eases toward its target each frame.
   * Lower = more lag/inertia (a slower, heavier feel); higher = snappier. */
  ease?: number;
  onProgress: (shownProgress: number) => void;
};

/**
 * Tracks an eased -1..1 scroll progress for `sectionRef` (-1 = section
 * fully above the viewport, 0 = centered in it, 1 = fully below), calling
 * `onProgress` every animation frame while the section is near the
 * viewport. The value eases toward its target rather than jumping to it,
 * so motion driven by it reads as physical drift with a bit of inertia
 * rather than rigid 1:1 scroll-tracking.
 */
export function useSectionProgress(
  sectionRef: RefObject<HTMLElement | null>,
  { ease = 0.07, onProgress }: Options,
) {
  const onProgressRef = useRef(onProgress);
  useEffect(() => {
    onProgressRef.current = onProgress;
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetProgress = 0;
    let shownProgress = 0;
    let visible = false;
    let rafId = 0;

    function computeProgress() {
      const rect = section!.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const sectionCenter = rect.top + rect.height / 2;
      const range = viewportH / 2 + rect.height / 2;
      return range > 0
        ? Math.max(-1, Math.min(1, (sectionCenter - viewportH / 2) / range))
        : 0;
    }

    function render() {
      rafId = 0;
      const diff = targetProgress - shownProgress;
      shownProgress += diff * ease;
      if (Math.abs(diff) < 0.0005) shownProgress = targetProgress;
      onProgressRef.current(shownProgress);
      if (visible && Math.abs(targetProgress - shownProgress) > 0.0005) {
        rafId = requestAnimationFrame(render);
      }
    }

    function requestRender() {
      if (!rafId) rafId = requestAnimationFrame(render);
    }

    function onScroll() {
      targetProgress = computeProgress();
      requestRender();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible = entry.isIntersecting;
          if (visible) requestRender();
        });
      },
      { threshold: 0 },
    );
    observer.observe(section);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [sectionRef, ease]);
}
