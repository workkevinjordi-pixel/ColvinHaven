"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import ParallaxImage from "./ParallaxImage";
import ParallaxLayer from "./ParallaxLayer";

type CtaProps = {
  /** Background photo -- defaults to the same crop the hero uses. */
  bgSrc?: string;
  bgAlt?: string;
  bgWidth?: number;
  bgHeight?: number;
  text?: ReactNode;
  buttonHref?: string;
  buttonLabel?: string;
  id?: string;
};

/**
 * Inquiry banner: full-bleed photo, dark overlay, a line of copy and a
 * "Write to Us" button. Every field is overridable -- Collective's
 * closing section (Figma node 222:4432) reuses this exact shell with a
 * different background and a quotation instead of the standard inquiry
 * line, rather than duplicating the whole banner as a second component,
 * since the two are pixel-identical apart from content.
 */
export default function Cta({
  bgSrc = "/assets/hero-bg.png",
  bgAlt = "",
  bgWidth = 3018,
  bgHeight = 1416,
  text = (
    <>
      We work with a select number of clients each year. Those who find
      us, were meant to.
    </>
  ),
  buttonHref = "/write-to-us",
  buttonLabel = "Write to Us",
  id = "inquiry",
}: CtaProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section className="cta" id={id} ref={sectionRef}>
      <ParallaxImage
        sectionRef={sectionRef}
        className="cta__bg"
        src={bgSrc}
        alt={bgAlt}
        width={bgWidth}
        height={bgHeight}
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
          <p className="cta__text">{text}</p>
          <a href={buttonHref} className="cta__button">
            {buttonLabel}
          </a>
        </ParallaxLayer>
      </div>
    </section>
  );
}
