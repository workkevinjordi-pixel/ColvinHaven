"use client";

import type { RefObject } from "react";
import { useSectionProgress } from "./useSectionProgress";

// How much an element shrinks/drifts at the extremes of its scroll range
// (fully collapsed once it's scrolled a full viewport away from center,
// in either direction). Applied to |progress|, so entering from below
// and exiting off the top both read as the same "collapsing" motion.
// Kept deliberately small -- opacity alone already carries the
// collapsing-away read; scale/translate are just a faint accent on top
// of that, not the effect itself. Earlier values here (0.22 / 48px) read
// as an over-eager zoom-and-shove instead of a subtle parallax.
const COLLAPSE_SCALE = 0.05;
const COLLAPSE_TRANSLATE = 14;

/**
 * Shrinks, fades, and nudges an element as it scrolls away from the
 * viewport center in either direction -- so scrolling past it reads as
 * it collapsing away rather than just sliding off screen unchanged. No
 * pin/scroll-jacking involved, just a normal-flow element whose own
 * transform/opacity track scroll position (via useSectionProgress, the
 * same drift-tracking hook ParallaxImage/ParallaxLayer use elsewhere).
 *
 * Shared by Collective's Publications section and the Editions list --
 * both use this exact effect by explicit request ("exactly similar"),
 * so it lives here once rather than as two copies that could drift.
 */
export function useCollapseOnScroll(ref: RefObject<HTMLElement | null>) {
  useSectionProgress(ref, {
    // A touch snappier than the drift-parallax default (0.07) -- with
    // the motion this subtle, too much lag just reads as unresponsive
    // rather than smooth.
    ease: 0.12,
    onProgress: (progress) => {
      const el = ref.current;
      if (!el) return;
      const intensity = Math.min(1, Math.abs(progress));
      const scale = 1 - intensity * COLLAPSE_SCALE;
      const translate =
        progress > 0
          ? -intensity * COLLAPSE_TRANSLATE
          : intensity * COLLAPSE_TRANSLATE * 0.4;
      el.style.transform = `translateY(${translate.toFixed(2)}px) scale(${scale.toFixed(4)})`;
      el.style.opacity = (1 - intensity).toFixed(3);
    },
  });
}
