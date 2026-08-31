"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { useSectionProgress } from "@/lib/useSectionProgress";

/**
 * Wraps a rectangular tile and drifts + rotates it a little as it crosses
 * the viewport, starting from a fixed base tilt so the layout keeps its
 * pinned-photo, scrapbook feel. `useSectionProgress` no-ops under
 * `prefers-reduced-motion`, leaving just the static base tilt.
 */
export default function Opt6Tilt({
  children,
  className = "",
  baseRotate = 0,
  rotate = 3,
  drift = 36,
}: {
  children: ReactNode;
  className?: string;
  baseRotate?: number;
  rotate?: number;
  drift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useSectionProgress(ref, {
    ease: 0.08,
    onProgress: (p) => {
      const el = ref.current;
      if (!el) return;
      el.style.transform = `translate3d(0, ${(p * drift).toFixed(2)}px, 0) rotate(${(
        baseRotate +
        p * rotate
      ).toFixed(2)}deg)`;
    },
  });

  return (
    <div
      ref={ref}
      className={`opt6-tilt${className ? ` ${className}` : ""}`}
      style={{ transform: `rotate(${baseRotate}deg)`, willChange: "transform" }}
    >
      {children}
    </div>
  );
}
