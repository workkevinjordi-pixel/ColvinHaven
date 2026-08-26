"use client";

import Image, { type ImageProps } from "next/image";
import { useRef } from "react";
import type { RefObject } from "react";
import { useSectionProgress } from "@/lib/useSectionProgress";

type ParallaxImageProps = Omit<ImageProps, "fill" | "style"> & {
  sectionRef: RefObject<HTMLElement | null>;
  /** Max px the image drifts in either direction as its section scrolls
   * through the viewport. */
  strength?: number;
  /** Extra zoom (e.g. 0.06 = 6%) applied at the peak of a subtle
   * "breathing" effect when the section is centered in the viewport,
   * easing back to no zoom toward the edges of its scroll range. */
  scaleAmount?: number;
  ease?: number;
};

/**
 * Fills its (position: relative, overflow: hidden) parent, drifting
 * vertically -- with a subtle zoom "breath" layered on top -- as that
 * section scrolls through the viewport. Used for the hero and CTA
 * backgrounds, which share the same source photo; the matching drift is
 * a deliberate visual echo tying the two together.
 *
 * Deliberately does NOT use next/image's `fill` prop: fill forbids
 * overriding `style.height` (it throws at render time), which is exactly
 * what this needs to render the image taller than its container so the
 * drift always has buffer to move within -- the section itself clips the
 * overscan via overflow: hidden. width/height below are just the
 * intrinsic-size hint next/image needs for its srcset math; actual
 * layout is entirely CSS-driven.
 */
export default function ParallaxImage({
  sectionRef,
  strength = 90,
  scaleAmount = 0.06,
  ease = 0.07,
  ...props
}: ParallaxImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  useSectionProgress(sectionRef, {
    ease,
    onProgress: (progress) => {
      const img = imgRef.current;
      if (!img) return;
      const shift = progress * strength;
      const scale = 1 + (1 - Math.abs(progress)) * scaleAmount;
      img.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
    },
  });

  const buffer = strength + 8;

  return (
    // alt is required by ImageProps and supplied via ...props at every
    // call site; the linter can't see through the spread.
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      ref={imgRef}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        width: "100%",
        top: -buffer,
        bottom: "auto",
        height: `calc(100% + ${buffer * 2}px)`,
        willChange: "transform",
      }}
      {...props}
    />
  );
}
