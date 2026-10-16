"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { Homepage } from "@/lib/sanity/homepage";

/**
 * Phone homepage (<=560px): one full-screen section per swipe, laid out
 * after the "Homepage Mobile scroll" design reference (scroll-snapped
 * sections, a swipeable edition photo set with a pager, a staggered
 * reveal per section, a progress rail, a tap-to-expand gallery and a
 * full-screen closing invitation). All copy and type styles come from
 * the desktop homepage; the section nine-pack below is the layout.
 *
 * It is always in the DOM and hidden above 560px by CSS, the same way
 * the rest of this site toggles phone/desktop variants, so desktop and
 * tablet never see it. Images below the first screen are lazy, so a
 * desktop visitor never downloads them.
 */

type Img = { src: string; alt: string };

type Props = {
  homepage?: Homepage;
};

// Section indexes -- the progress rail and nav tone are driven by these.
const SECTION_COUNT = 9;
const DARK_SECTIONS = new Set([0, 2, 4, 8]); // photo sections: light nav

// The pool and living-room/staircase photos aren't part of the desktop
// homepage; they come from the Umah Sora / Umah Tsuki stories on
// /editions, with the copy those pages already carry. (The pool photo is
// the tall, high-resolution Sora pool-deck shot: the wide Tsuki pool
// banner is only 611px tall and goes soft at full-screen height.)
const POOL_IMAGE: Img = {
  src: "/assets/editions/detail/sora-gallery2-pooldeck.jpg",
  alt: "A shingled pavilion roof and timber deck beside a still pool under a clear sky",
};
const STORIES: { image: Img; caption: string }[] = [
  {
    image: {
      src: "/assets/editions/detail/sora-row4-main.jpg",
      alt: "Umah Sora's living room opening onto the garden and pool",
    },
    caption:
      "Welcome to the living room: the place to go gather with friends and family. When the day warms up, the natural salt pool is just beyond the sofa.",
  },
  {
    image: {
      src: "/assets/homequoterow-corridor-steps.jpg",
      alt: "A covered timber walkway leading down a staircase toward a garden gate",
    },
    caption: "Seven steps down come up and the day gets quitter. Welcome to Sora.",
  },
];

const FALLBACK_HERO: Img = { src: "/assets/hero-bg.jpg", alt: "" };

function lines(text: string): ReactNode {
  return text.split("\n").map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {part}
    </Fragment>
  ));
}

/** Staggered reveal: --i is the delay slot (140ms apart). */
function r(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}

export default function HomeMobile({ homepage }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [slide, setSlide] = useState(0);
  const [focus, setFocus] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  const hero = homepage?.hero.backgroundImage ?? FALLBACK_HERO;
  const statement = homepage?.craftingStatement;
  const slides = homepage?.quoteRow ?? [];
  const editions = homepage?.editionsIntro;
  const gallery = homepage?.approachGallery ?? [];
  const collective = homepage?.collectiveIntro;
  const cta = homepage?.cta;

  // Enables the hidden "before reveal" state only once JS is running, so
  // the page is fully readable without it.
  useEffect(() => setReady(true), []);

  // Active section = the one under the middle of the screen.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-hm-section]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.hmSection));
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Tells the shared navbar which tone to use (light over photos, dark
  // brown over the cream sections). Only this page ever sets it.
  useEffect(() => {
    const el = document.documentElement;
    el.dataset.hm = DARK_SECTIONS.has(active) && focus === null ? "dark" : "light";
  }, [active, focus]);
  useEffect(() => {
    return () => {
      delete document.documentElement.dataset.hm;
    };
  }, []);

  // Lock page scroll while a gallery photo is expanded.
  useEffect(() => {
    if (focus === null) return;
    const el = document.documentElement;
    const prev = el.style.overflow;
    el.style.overflow = "hidden";
    return () => {
      el.style.overflow = prev;
    };
  }, [focus]);

  const goToSection = useCallback((i: number) => {
    const target = rootRef.current?.querySelector<HTMLElement>(`[data-hm-section="${i}"]`);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const onSwipe = () => {
    const el = swiperRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== slide) setSlide(i);
  };

  const goToSlide = (i: number) => {
    const el = swiperRef.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  const sec = (i: number) =>
    `hm-sec${active === i ? " is-active" : ""}`;

  const editionsHeading = (editions?.heading ?? "TSUKI, THE MOON. SORA, THE SKY").replace(
    /\.\s+/,
    ".\n",
  );

  return (
    <div ref={rootRef} className={`hm${ready ? " hm--ready" : ""}`}>
      {/* 1 HERO */}
      <section className={`${sec(0)} hm-hero`} data-hm-section={0}>
        <div className="hm-img">
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="hm-hero__shade" />
        <h1 className="hm-sr">{homepage?.hero.title ?? "Colvin Haven"}</h1>
      </section>

      {/* 2 STATEMENT */}
      <section className={`${sec(1)} hm-statement`} data-hm-section={1}>
        <h2 className="hm-statement__heading hm-r" style={r(0)}>
          {statement?.heading ?? "CRAFTING SPACES, LIVING SLOWLY."}
        </h2>
        <span className="hm-line" />
        <p className="hm-statement__body hm-r" style={r(2)}>
          {statement?.body ??
            "Colvin Haven creates limited edition homes designed for the next chapter of living, where silence is luxury and presence is a new power."}
        </p>
      </section>

      {/* 3 EDITION SWIPER */}
      {slides.length > 0 && (
        <section className={`${sec(2)} hm-swiper`} data-hm-section={2}>
          <div ref={swiperRef} className="hm-swiper__track" onScroll={onSwipe}>
            {slides.map((s, i) => (
              <div
                key={i}
                className={`hm-swiper__slide${active === 2 && slide === i ? " is-on" : ""}`}
              >
                <div className="hm-img">
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="hm-swiper__shade" />
                <p className="hm-swiper__caption">{s.caption}</p>
              </div>
            ))}
          </div>
          <div className="hm-swiper__pager">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to photo ${i + 1}`}
                onClick={() => goToSlide(i)}
              >
                <span className={slide === i ? "is-on" : ""} />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 4 EDITIONS */}
      <section className={`${sec(3)} hm-intro`} data-hm-section={3}>
        <span className="hm-intro__eyebrow hm-r" style={r(0)}>
          {editions?.eyebrow ?? "EDITIONS"}
        </span>
        <div className="hm-intro__titles hm-r" style={r(1)}>
          <h2 className="hm-intro__heading">{lines(editionsHeading)}</h2>
          {editions?.subtitle && <p className="hm-intro__subtitle">{editions.subtitle}</p>}
        </div>
        <p className="hm-intro__lead hm-r" style={r(2)}>
          {editions?.lead ?? "Stillness and wellness, built into every room."}
        </p>
        <div className="hm-intro__text hm-r" style={r(3)}>
          {(editions?.paragraphs ?? []).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <Link
          href={editions?.linkHref ?? "/editions"}
          className="hm-link hm-r"
          style={r(4)}
        >
          {editions?.linkLabel ?? "Dive deeper"} <span aria-hidden="true">→</span>
        </Link>
      </section>

      {/* 5 POOL */}
      <section className={`${sec(4)} hm-photo`} data-hm-section={4}>
        <div className="hm-img">
          <Image
            src={POOL_IMAGE.src}
            alt={POOL_IMAGE.alt}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      {/* 6 GALLERY */}
      {gallery.length > 0 && (
        <section className={`${sec(5)} hm-gallery`} data-hm-section={5}>
          <div className="hm-gallery__grid hm-r" style={r(0)}>
            {gallery.map((g, i) => (
              <button
                key={i}
                type="button"
                className="hm-gallery__tile"
                aria-label={`View ${g.caption}`}
                onClick={() => setFocus(i)}
              >
                <span className="hm-gallery__img">
                  <Image
                    src={g.image.src}
                    alt={g.image.alt}
                    fill
                    sizes="50vw"
                    style={{ objectFit: "cover" }}
                  />
                </span>
                <span className="hm-gallery__name">{g.caption}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 7 STORIES */}
      <section className={`${sec(6)} hm-stories`} data-hm-section={6}>
        {STORIES.map((s, i) => (
          <figure key={i} className="hm-stories__item hm-r" style={r(i)}>
            <div className="hm-stories__img">
              <Image
                src={s.image.src}
                alt={s.image.alt}
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption>{s.caption}</figcaption>
          </figure>
        ))}
      </section>

      {/* 8 COLLECTIVE */}
      <section className={`${sec(7)} hm-intro hm-intro--collective`} data-hm-section={7}>
        <span className="hm-intro__eyebrow hm-r" style={r(0)}>
          {collective?.eyebrow ?? "COLLECTIVE"}
        </span>
        <h2 className="hm-intro__heading hm-r" style={r(1)}>
          {lines(
            collective?.heading ??
              "UMAH TSUKI IS WHERE OUR FOUNDER LIVES,\nSORA WAS BUILT FOR OUR FIRST CLIENT.",
          )}
        </h2>
        <div className="hm-intro__text hm-r" style={r(2)}>
          {(collective?.paragraphs ?? []).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <Link
          href={collective?.linkHref ?? "/collective"}
          className="hm-link hm-r"
          style={r(3)}
        >
          {collective?.linkLabel ?? "Meet the collective"} <span aria-hidden="true">→</span>
        </Link>
      </section>

      {/* 9 INVITATION */}
      <section className={`${sec(8)} hm-invite`} data-hm-section={8}>
        <div className="hm-img">
          <Image
            src="/assets/hero-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="hm-invite__shade" />
        <div className="hm-invite__content">
          <h2 className="hm-invite__text hm-r" style={r(0)}>
            {cta?.text ?? "Visit one of our projects by invitation"}
          </h2>
          <Link
            href={cta?.buttonHref ?? "/write-to-us"}
            className="hm-invite__link hm-r"
            style={r(1)}
          >
            {cta?.buttonLabel ?? "Write to Us"} <span aria-hidden="true">→</span>
          </Link>
          <button
            type="button"
            className="hm-invite__top hm-r"
            style={r(2)}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            BACK TO TOP
          </button>
        </div>
      </section>

      {/* PROGRESS RAIL */}
      <nav
        aria-label="Sections"
        className={`hm-rail${DARK_SECTIONS.has(active) && focus === null ? " hm-rail--dark" : ""}`}
      >
        {Array.from({ length: SECTION_COUNT }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to section ${i + 1}`}
            onClick={() => goToSection(i)}
          >
            <span className={active === i ? "is-on" : ""} />
          </button>
        ))}
      </nav>

      {/* GALLERY FOCUS */}
      <div
        className={`hm-focus${focus !== null ? " is-open" : ""}`}
        aria-hidden={focus === null}
      >
        {focus !== null && gallery[focus] && (
          <>
            <div className="hm-focus__img">
              <Image
                src={gallery[focus].image.src}
                alt={gallery[focus].image.alt}
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="hm-focus__shade" />
            <p className="hm-focus__name">{gallery[focus].caption}</p>
          </>
        )}
        <button
          type="button"
          className="hm-focus__close"
          aria-label="Close photo"
          onClick={() => setFocus(null)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f2eee8" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}
