"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Quiet one-way fade-and-rise as the element enters the viewport — a
 * Scandinavian-minimal entrance, nothing more. `prefers-reduced-motion`
 * shows the content outright (handled in CSS).
 */
export default function Opt5Reveal({
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
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`opt5-reveal${inView ? " is-in" : ""}${
        className ? ` ${className}` : ""
      }`}
      style={delay && inView ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
