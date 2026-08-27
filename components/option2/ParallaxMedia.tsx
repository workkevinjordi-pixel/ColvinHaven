"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { useSectionProgress } from "@/lib/useSectionProgress";

/**
 * Wraps an image (a next/image `fill`, usually) and drifts it a few
 * pixels against the scroll as it crosses the viewport -- the same
 * eased, inertial feel as the homepage hero, just dialled down. The
 * inner element is inset slightly larger than the frame so the drift
 * always has headroom and the frame stays fully covered.
 *
 * `useSectionProgress` no-ops under `prefers-reduced-motion`, so the
 * image simply sits still.
 */
export default function ParallaxMedia({
  children,
  className = "",
  strength = 26,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useSectionProgress(rootRef, {
    ease: 0.09,
    onProgress: (p) => {
      const el = innerRef.current;
      if (el) {
        el.style.transform = `translate3d(0, ${(p * strength).toFixed(2)}px, 0)`;
      }
    },
  });

  return (
    <div ref={rootRef} className={`opt2-pm${className ? ` ${className}` : ""}`}>
      <div ref={innerRef} className="opt2-pm__inner">
        {children}
      </div>
    </div>
  );
}
