"use client";

import { useRef } from "react";
import ParallaxImage from "./ParallaxImage";
import ParallaxLayer from "./ParallaxLayer";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <header className="hero" ref={sectionRef}>
      <ParallaxImage
        sectionRef={sectionRef}
        className="hero__bg"
        src="/assets/hero-bg.png"
        alt=""
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
        <p className="hero__title">Colvin Haven</p>
        <p className="hero__tagline">Architectural Editions</p>
      </ParallaxLayer>
    </header>
  );
}
