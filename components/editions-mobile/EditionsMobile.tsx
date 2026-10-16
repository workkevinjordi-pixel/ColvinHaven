"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Swiper from "@/components/ui/Swiper";
import type { Img, MobileSection, Slide } from "./plan";

/**
 * Phone /editions (<=560px): one full-screen section per swipe, laid out
 * after the "Editions Mobile scroll" design. The section list comes from
 * buildEditionsPlan(), i.e. the same data the desktop page renders; this
 * only lays it out. It shares the full-screen/reveal/swiper styles with the
 * phone homepage (.hm-*) and adds the edition-specific ones (.em-*).
 * Always in the DOM, hidden above 560px by CSS.
 */

const DARK_KINDS = new Set<MobileSection["kind"]>([
  "photo",
  "title",
  "swiper",
  "quote",
]);

function Photo({ image, priority }: { image: Img; priority?: boolean }) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes="100vw"
      priority={priority}
      style={{ objectFit: "cover" }}
    />
  );
}

function SwiperSection({
  slides,
  label,
  active,
}: {
  slides: Slide[];
  label: string;
  active: boolean;
}) {
  const [slide, setSlide] = useState(0);
  const onIndexChange = useCallback((i: number) => setSlide(i), []);

  return (
    <Swiper
      className="hm-swiper__swp"
      trackClassName="hm-swiper__track"
      tone="light"
      label={label}
      onIndexChange={onIndexChange}
    >
      {slides.map((s, i) => (
        <div
          key={i}
          className={`hm-swiper__slide${active && slide === i ? " is-on" : ""}`}
        >
          <div className="hm-img">
            <Photo image={s.image} />
          </div>
          {s.caption && (
            <>
              <div className="hm-swiper__shade" />
              <p className="hm-swiper__caption em-swiper__caption">
                {s.caption}
              </p>
            </>
          )}
        </div>
      ))}
    </Swiper>
  );
}

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

export default function EditionsMobile({
  sections,
}: {
  sections: MobileSection[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Reveal state is only enabled once JS runs, so the page reads fine
  // without it.
  useEffect(() => {
    rootRef.current?.classList.add("hm--ready");
  }, []);

  // The section under the middle of the screen is the active one.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(
      root.querySelectorAll<HTMLElement>("[data-hm-section]"),
    );
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
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Tells the shared navbar which tone to use over the current section.
  useEffect(() => {
    const kind = sections[active]?.kind;
    document.documentElement.dataset.hm =
      kind && DARK_KINDS.has(kind) ? "dark" : "light";
  }, [active, sections]);
  useEffect(() => {
    return () => {
      delete document.documentElement.dataset.hm;
    };
  }, []);

  const cls = (i: number, extra: string) =>
    `hm-sec ${extra}${active === i ? " is-active" : ""}`;

  return (
    <div ref={rootRef} className="hm em">
      {sections.map((s, i) => {
        switch (s.kind) {
          case "photo":
            return (
              <section
                key={i}
                className={cls(i, "hm-photo")}
                data-hm-section={i}
              >
                <div className="hm-img">
                  <Photo image={s.image} priority={s.priority} />
                </div>
              </section>
            );

          case "title":
            return (
              <section
                key={i}
                className={cls(i, "em-title")}
                data-hm-section={i}
              >
                <div className="hm-img">
                  <Photo image={s.image} />
                </div>
                <div className="em-title__shade" />
                <div className="em-title__text">
                  <p className="em-title__index hm-r">{s.index}</p>
                  <h2 className="em-title__name hm-r hm-r--1">{s.title}</h2>
                </div>
              </section>
            );

          case "details":
            return (
              <section
                key={i}
                className={cls(i, "em-details")}
                data-hm-section={i}
              >
                <div className="em-details__drawing hm-r">
                  <Photo image={s.portrait} />
                </div>
                <div className="em-details__specs hm-r hm-r--1">
                  {s.specs.map((spec) => (
                    <div key={spec.label}>
                      <p className="em-details__label">{spec.label}</p>
                      <p className="em-details__value">{spec.value}</p>
                    </div>
                  ))}
                </div>
                <h3 className="em-details__heading hm-r hm-r--1">
                  {s.heading}
                </h3>
                <div className="em-text">
                  {s.paragraphs.map((p, k) => (
                    <p key={k} className={`hm-r hm-r--${Math.min(k + 2, 4)}`}>
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            );

          case "swiper":
            return (
              <section
                key={i}
                className={cls(i, "hm-swiper")}
                data-hm-section={i}
              >
                <SwiperSection
                  slides={s.slides}
                  label={s.label}
                  active={active === i}
                />
              </section>
            );

          case "story":
            return (
              <section
                key={i}
                className={cls(i, "em-story")}
                data-hm-section={i}
              >
                <div
                  className="em-story__photo hm-r"
                  data-height={s.imageHeight}
                >
                  <Photo image={s.image} />
                </div>
                <div className={`em-text${s.ink ? " em-text--ink" : ""}`}>
                  {s.paragraphs.map((p, k) => (
                    <p key={k} className={`hm-r hm-r--${Math.min(k + 1, 4)}`}>
                      {p}
                    </p>
                  ))}
                </div>
                {s.cta && (
                  <>
                    <p className="em-story__note hm-r hm-r--3">{s.cta.note}</p>
                    <Link
                      href={s.cta.href}
                      className="hm-link em-story__link hm-r hm-r--4"
                    >
                      {s.cta.label} <Arrow />
                    </Link>
                  </>
                )}
              </section>
            );

          case "quote":
            return (
              <section
                key={i}
                className={cls(i, "em-quote")}
                data-hm-section={i}
              >
                <div className="hm-img">
                  <Photo image={s.image} />
                </div>
                <div className="em-quote__shade" />
                <p className="em-quote__text hm-r">{s.text}</p>
              </section>
            );

          case "collection":
            return (
              <section
                key={i}
                className={cls(i, "em-collection")}
                data-hm-section={i}
              >
                <span className="em-collection__eyebrow hm-r">
                  THE COLLECTION
                </span>
                <div className="em-collection__titles hm-r hm-r--1">
                  <p className="em-collection__kicker">
                    Two series so far, both in Indonesia
                  </p>
                  <h2 className="em-collection__heading">
                    TSUKI, THE MOON.
                    <br />
                    SORA, THE SKY
                  </h2>
                </div>
                <p className="em-collection__lead hm-r hm-r--2">
                  Each closes when it’s complete.
                </p>
                <p className="em-collection__list hm-r hm-r--3">
                  Some are complete,
                  <br />
                  Some are under construction,
                  <br />
                  Some are still waiting for their land.
                </p>
                <p className="em-collection__note hm-r hm-r--4">
                  Only ten will be built. See which homes are left.
                </p>
                <Link
                  href="/write-to-us"
                  className="hm-link em-collection__link hm-r hm-r--4"
                >
                  Write to us <Arrow />
                </Link>
              </section>
            );
        }
      })}
    </div>
  );
}
