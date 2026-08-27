"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type ScrollFadeProps = {
  children: ReactNode;
  className?: string;
  /** Fraction of the element that must be visible to count as "in view". */
  threshold?: number;
};

/**
 * Fades its content in as it scrolls into view and back out as it scrolls
 * out -- either direction, reactively, not a one-shot entrance. Meant for
 * sections that don't already have their own dedicated scroll effect
 * (FeatureSplit's pinned zoom, Quote's pop-in, the parallax layers --
 * those already provide their own reveal treatment and would fight with
 * a generic fade layered on top).
 */
export default function ScrollFade({
  children,
  className,
  threshold = 0.15,
}: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setVisible(entry.isIntersecting));
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`scroll-fade${visible ? " scroll-fade--visible" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}
