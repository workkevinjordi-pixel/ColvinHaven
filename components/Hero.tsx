"use client";

import { useRef } from "react";
import Image from "next/image";
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
        <div className="brand">
          <span className="brand__word">Colvin</span>
          <Image
            className="brand__dot"
            src="/assets/dot-nav.png"
            alt=""
            width={40}
            height={40}
          />
          <span className="brand__word">Haven</span>
        </div>
        <p className="hero__tagline">Wellness Architecture &amp; Design</p>
      </ParallaxLayer>
      <p className="hero__scroll">Scroll for more</p>
    </header>
  );
}
