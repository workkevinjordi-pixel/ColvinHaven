"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * One-way fade-and-rise as the element scrolls into view. Deliberately
 * plain -- Option 3 is an editorial layout, so it gets a single quiet
 * motion and none of Option 2's parallax / reversible wipes.
 * `prefers-reduced-motion` shows the content outright (handled in CSS).
 */
export default function Opt3Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`opt3-reveal${inView ? " is-in" : ""}${
        className ? ` ${className}` : ""
      }`}
      style={delay && inView ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
