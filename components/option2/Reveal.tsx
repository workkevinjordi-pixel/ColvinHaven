"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Reversible reveal: its content is clipped away (a wipe -- up the box
 * for `axis="y"`, left-to-right for `axis="x"`) until it scrolls into
 * view, and folds back the same way when it leaves, so scrolling up
 * un-reveals it rather than leaving it stuck open. Purely
 * IntersectionObserver + a CSS transition on `clip-path`; no scroll
 * handler. `prefers-reduced-motion` shows the content outright.
 */
export default function Reveal({
  children,
  className = "",
  axis = "y",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  axis?: "x" | "y";
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.12, rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`opt2-reveal opt2-reveal--${axis}${inView ? " is-in" : ""}${
        className ? ` ${className}` : ""
      }`}
      style={
        delay ? { transitionDelay: inView ? `${delay}ms` : "0ms" } : undefined
      }
    >
      {children}
    </div>
  );
}
