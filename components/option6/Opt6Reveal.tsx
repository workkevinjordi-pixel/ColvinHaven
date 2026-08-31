"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Snappy fade-and-rise as the element enters view — a little more punch
 * than the other options' fades to match the poster energy.
 * `prefers-reduced-motion` shows the content outright (handled in CSS).
 */
export default function Opt6Reveal({
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
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`opt6-reveal${inView ? " is-in" : ""}${
        className ? ` ${className}` : ""
      }`}
      style={delay && inView ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
