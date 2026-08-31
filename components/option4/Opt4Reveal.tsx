"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Slow, understated fade-and-rise as the element enters the viewport,
 * folding back out when it leaves (reactive, like the main site's
 * ScrollFade) -- an Aman-style calm entrance, no parallax or clip wipes.
 * `prefers-reduced-motion` shows the content outright (handled in CSS).
 */
export default function Opt4Reveal({
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
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`opt4-reveal${inView ? " is-in" : ""}${
        className ? ` ${className}` : ""
      }`}
      style={delay ? { transitionDelay: inView ? `${delay}ms` : "0ms" } : undefined}
    >
      {children}
    </div>
  );
}
