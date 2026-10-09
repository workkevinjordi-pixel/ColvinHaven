"use client";

import { useRef } from "react";
import ParallaxImage from "./ParallaxImage";
import ParallaxLayer from "./ParallaxLayer";

type HeroProps = {
  title?: string;
  tagline?: string;
  backgroundImage?: { src: string; alt: string };
};

/**
 * Content now comes from Sanity's homepage.hero (see
 * lib/sanity/homepage.ts and app/page.tsx, which fetches it once and
 * passes it down -- this stays a client component for the parallax
 * scroll effect, so it can't fetch its own data the way the
 * self-fetching Server Components (Publications, etc.) do). Defaults
 * below match the original hardcoded content, kept as a fallback in
 * case the fetch ever comes back empty.
 */
export default function Hero({
  title = "Colvin Haven",
  tagline = "Architectural Editions",
  backgroundImage = { src: "/assets/hero-bg.png", alt: "" },
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <header className="hero" ref={sectionRef}>
      <ParallaxImage
        sectionRef={sectionRef}
        className="hero__bg"
        src={backgroundImage.src}
        alt={backgroundImage.alt}
        width={3018}
        height={1416}
        priority
        sizes="100vw"
        strength={90}
      />
      <div className="hero__overlay" />
      <ParallaxLayer
        sectionRef={sectionRef}
        strength={-24}
        className="hero__content"
      >
        <p className="hero__title">{title}</p>
        <p className="hero__tagline">{tagline}</p>
      </ParallaxLayer>
    </header>
  );
}
