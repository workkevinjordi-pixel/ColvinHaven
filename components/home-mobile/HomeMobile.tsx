"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Homepage } from "@/lib/sanity/homepage";
import Swiper from "@/components/ui/Swiper";
import { useSectionState } from "@/components/ui/useSectionState";

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

// Section indexes -- the nav tone is driven by these.
const DARK_SECTIONS = new Set([0, 2, 4, 8, 9]); // photo sections: light nav

// The Approach gallery shows four photos on phones: the "Stillness" one
// is left out (latest Figma release of the homepage content).
const HIDDEN_GALLERY_CAPTIONS = new Set(["stillness"]);

// The pool and living-room/staircase photos aren't part of the desktop
// homepage; they come from the Umah Sora / Umah Tsuki stories on
// /editions, with the copy those pages already carry. (The pool photo is
// the tall, high-resolution Sora pool-deck shot: the wide Tsuki pool
// banner is only 611px tall and goes soft at full-screen height.)
const POOL_IMAGE: Img = {
  src: "/assets/home-corridor-bedroom.jpg",
  alt: "A dark timber-slatted corridor beside a warm teak bedroom with shoji screens",
};
// Hidden for now (waiting on the copy), like the desktop row.
const SHOW_STORIES = false;
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
      src: "/assets/home-stories-sora-stairs.jpg",
      alt: "A charred timber house on stilts with a round window, a staircase descending to the garden",
    },
    caption: "We need text here",
  },
];

// Photos 4-7 of the swiper (same Figma nodes as the desktop row: 461:803,
// 461:807, 385:1272, 385:1264); captions from the copywriter. Mirrors
// EXTRA_ITEMS in components/landing/HomeQuoteRow.tsx.
const EXTRA_SLIDES: { image: Img; caption: string }[] = [
  {
    image: {
      src: "/assets/home-quote-4-pavilion.jpg",
      alt: "A dark timber pavilion on a raised deck, a boardwalk crossing a pond in a tropical garden",
    },
    caption:
      "Cross the floating walkway, with the garden on either side and the koi drifting beneath. This is how you arrive at the main cabin.",
  },
  {
    image: {
      src: "/assets/home-quote-5-koi-pond.jpg",
      alt: "Koi swimming in a dark pond beneath tree ferns and river stones",
    },
    caption:
      "Every koi here is chosen with care, for its colour, its pattern, and the way it moves. Watch them for a while, and the day slows down",
  },
  {
    image: {
      src: "/assets/home-quote-6-kitchen.jpg",
      alt: "A teak kitchen with a black stone island, a tall gridded window opening onto tropical foliage",
    },
    caption:
      "A chef designs a kitchen the way he’d want to cook in one. Simple, like the best Japanese counters, with nothing here that doesn’t need to be.",
  },
  {
    image: {
      src: "/assets/home-quote-7-garden-gate.jpg",
      alt: "A black timber garden gate framed by a stone wall, lawn and stone steps",
    },
    caption:
      "A black timber gate, set in river stone. Calm begins here, a few steps before the door. Let the garden do the first of the welcoming.",
  },
];

// Phone-only portrait crop of the Tsuki exterior for the swiper's first
// slide (the desktop row keeps the Sanity photo).
const FIRST_SLIDE_IMAGE: Img = {
  src: "/assets/home-tsuki-exterior-portrait.jpg",
  alt: "A dark timber facade under a teak ceiling, a monstera framed in the wooden window",
};

const FALLBACK_HERO: Img = { src: "/assets/hero-bg.jpg", alt: "" };

function lines(text: string): ReactNode {
  return text.split("\n").map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {part}
    </Fragment>
  ));
}

/**
 * Spelling fixes for the phone layout only. The shared homepage copy
 * (Sanity, also shown on desktop) is left untouched on purpose.
 */
const COPY_FIXES: [RegExp, string][] = [
  [/Cut form /g, "Cut from "],
  [/Tresholds/g, "Thresholds"],
  [/quitter/g, "quieter"],
];

function mobileCopy(text: string): string {
  return COPY_FIXES.reduce(
    (out, [pattern, fix]) => out.replace(pattern, fix),
    text,
  );
}

// Photos 4-7 and the swiper buttons/indicator are on again now that their
// captions are in. Set to false for just the three main photos.
const SHOW_EXTRA_SLIDES = true;

function withExtras<T extends { image: Img; caption: string }>(real: T[]) {
  return real.length === 0 || !SHOW_EXTRA_SLIDES
    ? real
    : [...real, ...EXTRA_SLIDES];
}

export default function HomeMobile({ homepage }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const [focus, setFocus] = useState<number | null>(null);

  const hero = homepage?.hero.backgroundImage ?? FALLBACK_HERO;
  const statement = homepage?.craftingStatement;
  const slides = withExtras(homepage?.quoteRow ?? []);
  const editions = homepage?.editionsIntro;
  const gallery = (homepage?.approachGallery ?? []).filter(
    (g) => !HIDDEN_GALLERY_CAPTIONS.has(g.caption.trim().toLowerCase()),
  );
  const collective = homepage?.collectiveIntro;
  const cta = homepage?.cta;

  // Enables the hidden "before reveal" state only once JS is running, so
  // the page is fully readable without it. (A class added on the DOM node
  // rather than state: the className prop never changes, so React leaves
  // it alone.)
  useEffect(() => {
    rootRef.current?.classList.add("hm--ready");
  }, []);

  // Section under the middle of the screen (nav tone) and sections seen so
  // far (reveals) -- the page scrolls normally, no snapping.
  const { active, seen } = useSectionState(rootRef);

  // Tells the shared navbar which tone to use (light over photos, dark
  // brown over the cream sections). Only this page ever sets it.
  useEffect(() => {
    const el = document.documentElement;
    // "hero" = over the opening banner (gold wordmark), "dark" = over any
    // other photo section, "light" = over cream sections.
    el.dataset.hm =
      active === 0 && focus === null
        ? "hero"
        : DARK_SECTIONS.has(active) && focus === null
          ? "dark"
          : "light";
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

  const onSlideChange = useCallback((i: number) => setSlide(i), []);

  const sec = (i: number) => `hm-sec${seen.has(i) ? " is-seen" : ""}`;

  const editionsHeading = (
    editions?.heading ?? "TSUKI, THE MOON. SORA, THE SKY"
  ).replace(/\.\s+/, ".\n");

  return (
    <div ref={rootRef} className="hm">
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
        <h2 className="hm-statement__heading hm-r hm-r--0">
          {statement?.heading ?? "CRAFTING SPACES, LIVING SLOWLY."}
        </h2>
        <p className="hm-statement__body hm-r hm-r--2">
          {statement?.body ??
            "Colvin Haven creates limited edition homes designed for the next chapter of living, where silence is luxury and presence is a new power."}
        </p>
      </section>

      {/* 3 EDITION SWIPER */}
      {slides.length > 0 && (
        <section className={`${sec(2)} hm-swiper`} data-hm-section={2}>
          <Swiper
            className={`hm-swiper__swp${SHOW_EXTRA_SLIDES ? "" : " hm-swiper__swp--bare"}`}
            trackClassName="hm-swiper__track"
            tone="light"
            label="Edition photos"
            onIndexChange={onSlideChange}
          >
            {slides.map((s, i) => (
              <div
                key={i}
                className={`hm-swiper__slide${seen.has(2) && slide === i ? " is-on" : ""}`}
              >
                <div className="hm-img">
                  <Image
                    src={i === 0 ? FIRST_SLIDE_IMAGE.src : s.image.src}
                    alt={i === 0 ? FIRST_SLIDE_IMAGE.alt : s.image.alt}
                    fill
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                {s.caption && (
                  <>
                    <div className="hm-swiper__shade" />
                    <p className="hm-swiper__caption">
                      {mobileCopy(s.caption)}
                    </p>
                  </>
                )}
              </div>
            ))}
          </Swiper>
        </section>
      )}

      {/* 4 EDITIONS */}
      <section className={`${sec(3)} hm-intro`} data-hm-section={3}>
        <span className="hm-intro__eyebrow hm-r hm-r--0">
          {editions?.eyebrow ?? "EDITIONS"}
        </span>
        <div className="hm-intro__titles hm-r hm-r--1">
          <h2 className="hm-intro__heading">{lines(editionsHeading)}</h2>
          {editions?.subtitle && (
            <p className="hm-intro__subtitle">
              {mobileCopy(editions.subtitle)}
            </p>
          )}
        </div>
        <p className="hm-intro__lead hm-r hm-r--2">
          {editions?.lead ?? "Stillness and wellness, built into every room."}
        </p>
        <div className="hm-intro__text hm-r hm-r--3">
          {(editions?.paragraphs ?? []).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <Link
          href={editions?.linkHref ?? "/editions"}
          className="hm-link hm-r hm-r--4"
        >
          {editions?.linkLabel ?? "Dive deeper"}{" "}
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      {/* 5 POOL */}
      <section
        className={`${sec(4)} hm-photo hm-photo--band`}
        data-hm-section={4}
      >
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
          <div className="hm-gallery__grid hm-r hm-r--0">
            {gallery.map((g, i) => (
              <button
                key={i}
                type="button"
                className="hm-gallery__tile"
                aria-label={`View ${mobileCopy(g.caption)}`}
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
                <span className="hm-gallery__name">
                  {mobileCopy(g.caption)}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 7 STORIES */}
      {SHOW_STORIES && (
        <section className={`${sec(6)} hm-stories`} data-hm-section={6}>
          {STORIES.map((s, i) => (
            <figure key={i} className={`hm-stories__item hm-r hm-r--${i}`}>
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
      )}

      {/* Pool photo band (Figma 459:796), below the stories */}
      <section
        className={`${sec(9)} hm-photo hm-photo--pool`}
        data-hm-section={9}
      >
        <div className="hm-img">
          <Image
            src="/assets/editions/detail/tsuki-closing-pool-deck.jpg"
            alt="A timber deck with loungers beside a stone-edged pool among tropical foliage"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      {/* 8 COLLECTIVE */}
      <section
        className={`${sec(7)} hm-intro hm-intro--collective`}
        data-hm-section={7}
      >
        <span className="hm-intro__eyebrow hm-r hm-r--0">
          {collective?.eyebrow ?? "COLLECTIVE"}
        </span>
        <h2 className="hm-intro__heading hm-r hm-r--1">
          {lines(
            collective?.heading ??
              "UMAH TSUKI IS WHERE OUR FOUNDER LIVES,\nSORA WAS BUILT FOR OUR FIRST CLIENT.",
          )}
        </h2>
        <div className="hm-intro__text hm-r hm-r--2">
          {(collective?.paragraphs ?? []).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <Link
          href={collective?.linkHref ?? "/collective"}
          className="hm-link hm-r hm-r--3"
        >
          {collective?.linkLabel ?? "Meet the collective"}{" "}
          <span aria-hidden="true">→</span>
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
          <h2 className="hm-invite__text hm-r hm-r--0">
            {cta?.text ?? "Visit one of our projects by invitation"}
          </h2>
          <Link
            href={cta?.buttonHref ?? "/write-to-us"}
            className="hm-invite__link hm-r hm-r--1"
          >
            {cta?.buttonLabel ?? "Write to Us"}{" "}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

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
            <p className="hm-focus__name">
              {mobileCopy(gallery[focus].caption)}
            </p>
          </>
        )}
        <button
          type="button"
          className="hm-focus__close"
          aria-label="Close photo"
          onClick={() => setFocus(null)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f2eee8"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}
