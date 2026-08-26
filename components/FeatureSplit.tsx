"use client";

import { useEffect, useRef } from "react";

// Figma framing keyframes: 400px (start) -> 680px (mid) -> full-bleed (end).
// Base box keeps the ~1.406 aspect ratio shared by feature-1/feature-2.
const BASE_WIDTH = 400;
const BASE_HEIGHT = 284.615;
const MID_WIDTH = 680;
const MID_HEIGHT = 483.846;
const TEXT_TRAVEL = 56;
// The reveal completes at this fraction of the pin's scroll runway; the
// remainder holds the full-bleed frame in place before the next section.
const REVEAL_FRACTION = 0.75;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  let t = (x - edge0) / (edge1 - edge0);
  if (t < 0) t = 0;
  if (t > 1) t = 1;
  return t * t * (3 - 2 * t);
}

function boxForProgress(t: number, viewportWidth: number, viewportHeight: number) {
  if (t <= 0.5) {
    const e1 = easeInOutCubic(t / 0.5);
    return {
      w: lerp(BASE_WIDTH, MID_WIDTH, e1),
      h: lerp(BASE_HEIGHT, MID_HEIGHT, e1),
    };
  }
  const e2 = easeInOutCubic((t - 0.5) / 0.5);
  return {
    w: lerp(MID_WIDTH, viewportWidth, e2),
    h: lerp(MID_HEIGHT, viewportHeight, e2),
  };
}

export default function FeatureSplit() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);
  const img3Ref = useRef<HTMLImageElement>(null);
  const wordLeftRef = useRef<HTMLHeadingElement>(null);
  const wordRightRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageWrap = imageWrapRef.current;
    const img1 = img1Ref.current;
    const img2 = img2Ref.current;
    const img3 = img3Ref.current;
    const wordLeft = wordLeftRef.current;
    const wordRight = wordRightRef.current;
    if (!section || !imageWrap || !img1 || !img2 || !img3 || !wordLeft || !wordRight) {
      return;
    }

    const mq = window.matchMedia("(min-width: 900px)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!mq.matches || reduceMotion) return;

    let targetProgress = 0;
    let shownProgress = 0;
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    let ticking = false;
    let visible = false;
    let rafId = 0;

    function computeViewport() {
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
    }

    function computeProgress() {
      const rect = section!.getBoundingClientRect();
      const scrollable = section!.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return 0;
      const scrolled = -rect.top;
      let p = scrolled / (scrollable * REVEAL_FRACTION);
      if (p < 0) p = 0;
      if (p > 1) p = 1;
      return p;
    }

    function render() {
      ticking = false;
      const diff = targetProgress - shownProgress;
      shownProgress += diff * 0.12;
      if (Math.abs(diff) < 0.0005) shownProgress = targetProgress;

      const t = shownProgress;
      const box = boxForProgress(t, viewportWidth, viewportHeight);
      const insetX = Math.max(0, (viewportWidth - box.w) / 2);
      const insetY = Math.max(0, (viewportHeight - box.h) / 2);
      imageWrap!.style.clipPath = `inset(${insetY.toFixed(2)}px ${insetX.toFixed(2)}px)`;

      // Seamless crossfade across the three framing keyframes: img1 -> img2 -> img3.
      // clip-path reveals a full-resolution image rather than upscaling a small
      // one, so there's no blur budget to manage here -- windows are just paced
      // for an even, three-way visual split, with img3 settling in time to be
      // the one shown during the full-bleed hold at the end.
      const risingA = smoothstep(0.2, 0.4, t);
      const risingB = smoothstep(0.6, 0.8, t);
      const o1 = 1 - risingA;
      const o2 = risingA - risingB;
      const o3 = risingB;
      img1!.style.opacity = o1.toFixed(4);
      img2!.style.opacity = o2.toFixed(4);
      img3!.style.opacity = o3.toFixed(4);

      // Converging entrance, in the spirit of havenconstructions.com.au's
      // ScrollGallery: the flanking words slide inward from an offset and
      // settle before the image covers them.
      const converge = easeOutCubic(smoothstep(0, 0.45, t));
      const travel = (1 - converge) * TEXT_TRAVEL;
      wordLeft!.style.transform = `translateX(${(-travel).toFixed(2)}px)`;
      wordRight!.style.transform = `translateX(${travel.toFixed(2)}px)`;

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

    function onResize() {
      computeViewport();
      onScroll();
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

    computeViewport();
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="feature-split" ref={sectionRef}>
      <div className="feature-split__pin">
        <div className="feature-split__words">
          <h2
            className="feature-split__word feature-split__word--left"
            ref={wordLeftRef}
          >
            Silence
          </h2>
          <div className="feature-split__spacer" aria-hidden="true" />
          <h2
            className="feature-split__word feature-split__word--right"
            ref={wordRightRef}
          >
            Luxury
          </h2>
        </div>
        {/* Plain <img> deliberately, not next/image: the scroll effect above
            writes to these elements' opacity directly every animation frame
            via refs, which is simpler and more predictable on a native
            element than through next/image's wrapper/loader behavior. */}
        <div className="feature-split__image-wrap" ref={imageWrapRef}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="feature-split__image feature-split__image--1"
            src="/assets/feature-1-koi-pond-crop.jpg"
            alt="Koi pond framed by ferns and stone"
            ref={img1Ref}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="feature-split__image feature-split__image--2"
            src="/assets/feature-2-cabin-crop.jpg"
            alt="Black-clad cabin deck with bench overlooking the pond"
            ref={img2Ref}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="feature-split__image feature-split__image--3"
            src="/assets/feature-3-pool.jpg"
            alt="Pool deck framed by tropical garden"
            ref={img3Ref}
          />
        </div>
      </div>
    </section>
  );
}
