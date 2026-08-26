"use client";

import { useRef } from "react";
import type { CSSProperties, ReactNode, RefObject } from "react";
import { useSectionProgress } from "@/lib/useSectionProgress";

type ParallaxLayerProps = {
  sectionRef: RefObject<HTMLElement | null>;
  /** Px of drift in either direction. Use a smaller magnitude (and
   * ideally the opposite sign) from the background layer's strength --
   * the differential between the two rates is what actually reads as
   * depth, not either layer's motion in isolation. */
  strength?: number;
  ease?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/**
 * A generic foreground layer (not an image) that drifts a small amount as
 * its section scrolls through the viewport. Paired with ParallaxImage on
 * the same sectionRef, the differing drift rates between background and
 * content are what create the sense of depth.
 */
export default function ParallaxLayer({
  sectionRef,
  strength = -24,
  ease = 0.07,
  className,
  style,
  children,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useSectionProgress(sectionRef, {
    ease,
    onProgress: (progress) => {
      const el = ref.current;
      if (!el) return;
      el.style.transform = `translate3d(0, ${(progress * strength).toFixed(2)}px, 0)`;
    },
  });

  return (
    <div ref={ref} className={className} style={{ ...style, willChange: "transform" }}>
      {children}
    </div>
  );
}
