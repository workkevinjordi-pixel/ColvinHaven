"use client";

import { useRef } from "react";
import ParallaxImage from "./ParallaxImage";
import ParallaxLayer from "./ParallaxLayer";

export default function Cta() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section className="cta" id="inquiry" ref={sectionRef}>
      <ParallaxImage
        sectionRef={sectionRef}
        className="cta__bg"
        src="/assets/hero-bg.png"
        alt=""
        width={3018}
        height={1416}
        sizes="100vw"
        strength={90}
      />
      <div className="cta__overlay" />
      {/* Frames the content at the same max-width + gutter reference used
          by every other section, since .cta itself stays full-bleed for
          the background image. */}
      <div className="cta__frame">
        <ParallaxLayer
          sectionRef={sectionRef}
          strength={-24}
          className="cta__content"
        >
          <p className="cta__text">
            We work with a select number of clients each year. Those who
            find us, were meant to.
          </p>
          <a href="#inquiry" className="cta__button">
            Inquiry
          </a>
        </ParallaxLayer>
      </div>
    </section>
  );
}
