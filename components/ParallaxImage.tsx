"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef } from "react";

type ParallaxImageProps = Omit<ImageProps, "fill" | "style"> & {
  /** Max px the image drifts in either direction as its section scrolls
   * through the viewport. Kept small on purpose -- this should read as a
   * subtle depth cue, not a scroll-jack effect. */
  strength?: number;
};

/**
 * Fills its (position: relative, overflow: hidden) parent, drifting
 * vertically as that section scrolls through the viewport -- classic
 * parallax. Used for the hero and CTA backgrounds, which share the same
 * source photo; the matching drift is a deliberate visual echo tying the
 * two together.
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
  strength = 50,
  ...props
}: ParallaxImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    const section = img?.parentElement;
    if (!img || !section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;

    function render() {
      ticking = false;
      const rect = section!.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const sectionCenter = rect.top + rect.height / 2;
      const range = viewportH / 2 + rect.height / 2;
      const progress =
        range > 0
          ? Math.max(-1, Math.min(1, (sectionCenter - viewportH / 2) / range))
          : 0;
      img!.style.transform = `translate3d(0, ${(progress * strength).toFixed(2)}px, 0)`;
    }

    function requestRender() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(render);
      }
    }

    render();
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);
    return () => {
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
    };
  }, [strength]);

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
