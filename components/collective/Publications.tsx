"use client";

import { useEffect, useRef } from "react";
import type { ReactNode, RefObject } from "react";
import Image from "next/image";

// The runway is taller than the 2x100vh the two slides actually need --
// the extra length becomes hold time (slide A fully shown before the
// wipe starts, slide B fully shown, still pinned, after it finishes) so
// neither publication feels rushed. Mirrors ScrollDrawing's 220vh choice.
const SECTION_HEIGHT_VH = 220;
// Fraction of the pin's scroll runway the wipe itself consumes; the rest
// holds the finished state. Same idea as FeatureSplit's REVEAL_FRACTION.
const WIPE_FRACTION = 0.55;
const SETTLE_PX = 32;
// Soft edge on the wipe's leading boundary, in px -- see the render()
// comment below for why a hard clip-path edge doesn't work here.
const FEATHER_PX = 36;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

type Publication = {
  date: string;
  title: string;
  paragraphs: string[];
  readMoreHref: string;
  cover: ReactNode;
};

const PUBLICATIONS: Publication[] = [
  {
    date: "11/22/24",
    title: "Wallpaper*",
    paragraphs: [
      "We are so pleased for our flagship home, Umah Tsuki, to be featured on Wallpaper.com. Wallpaper* is the global design authority, leading the way in architecture, design, art, entertaining, beauty & grooming, transport, technology, fashion, and watches & jewellery. The article, helmed by Ellie Stathaki, Architecture & Environment Director and writer Natasha Levy is featured in the Architectural Section of the website, which showcases the best of residential and non-commercial living spaces, and the most inspiring of houses and homes.",
      "“I wanted to create a sanctuary’ – discover a nature-conscious take on Balinese architecture",
      "Umah Tsuki, the family home for Andrew Swallow, his wife, and their young daughter, sits perched above a verdant, sloping plot in the Balinese village of Tumbak Bayuh",
    ],
    readMoreHref:
      "https://www.wallpaper.com/architecture/residential/umah-tsuki-colvin-haven-bali-indonesia",
    cover: (
      <div className="collective-publications__cover">
        <Image
          src="/assets/collective/publications/wallpaper-hero.png"
          alt=""
          width={1920}
          height={1280}
          sizes="(min-width: 900px) 452px, 60vw"
          className="collective-publications__cover-photo"
        />
        <Image
          src="/assets/collective/publications/wallpaper-logo.png"
          alt="Wallpaper* magazine"
          width={3840}
          height={933}
          sizes="(min-width: 900px) 298px, 40vw"
          className="collective-publications__cover-logo"
        />
      </div>
    ),
  },
  {
    date: "8/30/24",
    title: "Design Anthology 39",
    paragraphs: [
      "We are so pleased for our Tsuki Edition be featured in the September 2024 Edition of Design Anthology, the premier English-language interiors, design, architecture and urban living magazine.",
      "The issue, helmed by editors-in-chief Simone Schultz and Jeremy Smart, delivers a global tour of the most interesting new design, style, travel, art and architecture stories from Asia Pacific and beyond.",
      "“An Island Haven in Bali’s Tumbak Bayuh",
      "In verdant Tumbak Bayuh, former chef Andrew Swallow’s first foray into design privileges simplicity and refinement….",
    ],
    readMoreHref: "https://design-anthology.com/story/issue-39/home/bali",
    cover: (
      <div className="collective-publications__cover">
        <Image
          src="/assets/collective/publications/design-anthology-cover.png"
          alt="Design Anthology issue 39 cover"
          width={1920}
          height={2627}
          sizes="(min-width: 900px) 452px, 60vw"
          className="collective-publications__cover-photo collective-publications__cover-photo--full"
        />
      </div>
    ),
  },
];

function PublicationSlide({
  pub,
  variant,
  slideRef,
}: {
  pub: Publication;
  variant: "a" | "b";
  slideRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      className={`collective-publications__slide collective-publications__slide--${variant}`}
      ref={slideRef}
    >
      {pub.cover}
      <div className="collective-publications__body">
        <p className="collective-publications__date">{pub.date}</p>
        <h3 className="collective-publications__title">{pub.title}</h3>
        <div className="collective-publications__text">
          {pub.paragraphs.map((p, j) => (
            <p key={j}>{p}</p>
          ))}
        </div>
        <a
          href={pub.readMoreHref}
          target="_blank"
          rel="noopener noreferrer"
          className="collective-publications__link"
        >
          Read more
        </a>
      </div>
    </div>
  );
}

/**
 * Two publication mentions (Figma node 222:4394), each given a full
 * viewport of space and wiped between -- like FeatureSplit's pinned
 * crossfade elsewhere on the site, but a clip-path wipe rather than an
 * opacity crossfade: these slides are mostly text, and fading two blocks
 * of text through each other reads as a ghosted double-exposure (the
 * exact "double roman numeral" look the splash screen had to be fixed
 * for) rather than a clean transition. A wipe never blends two slides'
 * text on screen at once, so it stays crisp.
 */
export default function Publications() {
  const sectionRef = useRef<HTMLElement>(null);
  const slideARef = useRef<HTMLDivElement>(null);
  const slideBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const slideA = slideARef.current;
    const slideB = slideBRef.current;
    if (!section || !slideA || !slideB) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    let targetProgress = 0;
    let shownProgress = 0;
    let ticking = false;
    let visible = false;
    let rafId = 0;

    function computeProgress() {
      const rect = section!.getBoundingClientRect();
      const scrollable = section!.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return 0;
      const scrolled = -rect.top;
      let p = scrolled / (scrollable * WIPE_FRACTION);
      if (p < 0) p = 0;
      if (p > 1) p = 1;
      return p;
    }

    function render() {
      ticking = false;
      const diff = targetProgress - shownProgress;
      shownProgress += diff * 0.12;
      if (Math.abs(diff) < 0.0005) shownProgress = targetProgress;

      const t = easeInOutCubic(shownProgress);
      // A hard clip-path edge can slice straight through the middle of a
      // text line, leaving only the top halves of one line's glyphs
      // visible right at the boundary -- reads as garbled text while
      // scrolling. A soft mask-image gradient instead fades that edge
      // over FEATHER_PX, so it's the same top-down reveal (date/title
      // first, "Read more" last) but the seam blurs to transparent
      // rather than cutting through a line of type.
      // Scaling t against (viewport + feather), not just the viewport,
      // pushes the transparent stop *past* the visible area once t
      // reaches 1 -- so the finished state is fully opaque top to
      // bottom, with no lingering fade parked on "Read more".
      const revealPx = t * (window.innerHeight + FEATHER_PX);
      const edge = Math.max(0, revealPx - FEATHER_PX);
      const maskB = `linear-gradient(to bottom, #000 0px, #000 ${edge.toFixed(1)}px, transparent ${revealPx.toFixed(1)}px)`;
      slideB!.style.maskImage = maskB;
      slideB!.style.webkitMaskImage = maskB;
      slideB!.style.transform = `translateY(${((1 - t) * -SETTLE_PX).toFixed(2)}px)`;

      // Slide A gets the exact mirror mask, not just a static "sit
      // underneath and hope B covers you" -- B's own content is often
      // shorter than A's (different article lengths), so B finishes
      // revealing its own text well before the wipe line reaches the
      // bottom of A's *longer* content. Without a matching mask on A,
      // A's tail (its last line, "Read more") stays fully opaque and
      // shows through the still-transparent lower band of B for a beat
      // -- a faint ghost of the previous slide's ending under the new
      // one. Mirroring the gradient keeps the two exactly complementary
      // at every row, so there's never a band where both (or neither)
      // are visible.
      const maskA = `linear-gradient(to bottom, transparent 0px, transparent ${edge.toFixed(1)}px, #000 ${revealPx.toFixed(1)}px)`;
      slideA!.style.maskImage = maskA;
      slideA!.style.webkitMaskImage = maskA;
      slideA!.style.transform = `translateY(${(t * (SETTLE_PX * 0.4)).toFixed(2)}px)`;

      if (visible && Math.abs(targetProgress - shownProgress) > 0.0005) {
        rafId = requestAnimationFrame(render);
        ticking = true;
      }
    }

    function requestTick() {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(render);
      }
    }

    function onScroll() {
      targetProgress = computeProgress();
      requestTick();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible = entry.isIntersecting;
          if (visible) requestTick();
        });
      },
      { threshold: 0 },
    );
    observer.observe(section);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      className="collective-publications"
      ref={sectionRef}
      style={{ height: `${SECTION_HEIGHT_VH}vh` }}
    >
      <div className="collective-publications__intro">
        <h2 className="section-heading">Publications</h2>
        <hr className="values__divider" />
      </div>
      <div className="collective-publications__pin">
        <PublicationSlide
          pub={PUBLICATIONS[0]}
          variant="a"
          slideRef={slideARef}
        />
        <PublicationSlide
          pub={PUBLICATIONS[1]}
          variant="b"
          slideRef={slideBRef}
        />
      </div>
    </section>
  );
}
