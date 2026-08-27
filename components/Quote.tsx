"use client";

import { useEffect, useRef, useState } from "react";

export default function Quote() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // No JS-side reduced-motion branch here: the CSS
    // `prefers-reduced-motion` rule unconditionally forces the mark/text
    // to their final, static state, so this observer path is harmless to
    // run either way and there's no need to special-case setState here.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`quote${visible ? " quote--visible" : ""}`}
      ref={sectionRef}
    >
      <blockquote className="quote__blockquote">
        <span className="quote__mark" aria-hidden="true">
          &ldquo;
        </span>
        <span className="quote__text">
          Inside, every space serves your wellbeing. Yoga deck open to the
          canopy. A training area that flows to the pool. Biohacking spa.
          Meditation gardens. Gathering spaces that hold the people you
          love. All of it woven seamlessly into the land — so the boundary
          between inside and outside dissolves entirely. It&apos;s the same
          core, in every CH home.&rdquo;
        </span>
      </blockquote>
    </section>
  );
}
