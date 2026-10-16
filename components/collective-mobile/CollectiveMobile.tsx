"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Swiper from "@/components/ui/Swiper";
import { useSectionState } from "@/components/ui/useSectionState";
import type { CollectiveSection, Img } from "./plan";

/**
 * Phone /collective (<=560px), laid out after the "Collective Mobile
 * scroll" design: full-screen photo sections and swiper like the rest of
 * the phone layout, plus two sticky patterns -- the founder's two photos
 * and each publication's cover stay pinned under the nav while the text
 * scrolls beneath them. The section list comes from buildCollectivePlan()
 * (same content as desktop). Always in the DOM, hidden above 560px by CSS;
 * it shares the .hm-* full-screen/reveal/swiper rules.
 */

const DARK_KINDS = new Set<CollectiveSection["kind"]>(["photo", "swiper"]);

function Photo({ image }: { image: Img }) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes="100vw"
      style={{ objectFit: "cover" }}
    />
  );
}

function SwiperBlock({
  slides,
  label,
  active,
}: {
  slides: Img[];
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
      {slides.map((img, k) => (
        <div
          key={k}
          className={`hm-swiper__slide${active && slide === k ? " is-on" : ""}`}
        >
          <div className="hm-img">
            <Photo image={img} />
          </div>
        </div>
      ))}
    </Swiper>
  );
}

function cls(active: boolean, base: string) {
  return `hm-sec ${base}${active ? " is-seen" : ""}`;
}

export default function CollectiveMobile({
  sections,
}: {
  sections: CollectiveSection[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    rootRef.current?.classList.add("hm--ready");
  }, []);

  // Active section (nav tone) and sections seen so far (reveals); the page
  // scrolls normally.
  const { active, seen } = useSectionState(rootRef);

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

  return (
    <div ref={rootRef} className="hm cm">
      {sections.map((s, i) => {
        const on = seen.has(i);
        switch (s.kind) {
          case "founder":
            return (
              <section
                key={i}
                className={cls(on, "cm-tall cm-founder")}
                data-hm-section={i}
              >
                <div className="cm-pin">
                  <div className="cm-pin__photos hm-r">
                    <div className="cm-pin__photo cm-pin__photo--a">
                      {s.imageA && <Photo image={s.imageA} />}
                    </div>
                    <div className="cm-pin__photo cm-pin__photo--b">
                      {s.imageB && <Photo image={s.imageB} />}
                    </div>
                  </div>
                  <div className="cm-pin__fade" />
                </div>
                <div className="cm-body">
                  <h2 className="cm-heading cm-heading--upper hm-r hm-r--1">
                    {s.heading}
                  </h2>
                  <div className="cm-text hm-r hm-r--2">
                    {s.paragraphs.map((p, k) => (
                      <p key={k}>{p}</p>
                    ))}
                  </div>
                </div>
              </section>
            );

          case "team":
            return (
              <section
                key={i}
                className={cls(on, "cm-team")}
                data-hm-section={i}
              >
                <h2 className="cm-heading cm-heading--upper hm-r">
                  {s.heading}
                </h2>
                {s.image && (
                  <div className="cm-team__photo hm-r hm-r--1">
                    <Photo image={s.image} />
                  </div>
                )}
                <div className="cm-team__text hm-r hm-r--2">
                  {s.people.length > 0 && (
                    <div className="cm-team__people">
                      {s.people.map((p) => (
                        <p key={p.name}>
                          <strong>{p.name}</strong> <em>{p.role}</em>
                        </p>
                      ))}
                    </div>
                  )}
                  {s.paragraphs.map((p, k) => (
                    <p key={k}>{p}</p>
                  ))}
                </div>
              </section>
            );

          case "photo":
            return (
              <section
                key={i}
                className={cls(on, "hm-photo")}
                data-hm-section={i}
              >
                <div className="hm-img">
                  <Photo image={s.image} />
                </div>
              </section>
            );

          case "inspirations":
            return (
              <section
                key={i}
                className={cls(on, "cm-inspirations")}
                data-hm-section={i}
              >
                <h2 className="cm-heading hm-r">{s.heading}</h2>
                <div className="cm-text hm-r hm-r--1">
                  {s.paragraphs.map((p, k) => (
                    <p key={k}>{p}</p>
                  ))}
                </div>
              </section>
            );

          case "swiper":
            return (
              <section
                key={i}
                className={cls(on, "hm-swiper")}
                data-hm-section={i}
              >
                <SwiperBlock slides={s.slides} label={s.label} active={on} />
              </section>
            );

          case "publication":
            return (
              <section
                key={i}
                className={cls(on, "cm-tall cm-pub")}
                data-hm-section={i}
              >
                {s.heading && (
                  <h2 className="cm-pub__title-top hm-r">{s.heading}</h2>
                )}
                <div className="cm-pin">
                  <div className="cm-pin__pub hm-r hm-r--1">
                    <div className="cm-pub__cover">
                      {s.cover && <Photo image={s.cover} />}
                    </div>
                    <div className="cm-pub__meta">
                      <span className="cm-pub__date">{s.date}</span>
                      <span className="cm-pub__name">{s.title}</span>
                    </div>
                  </div>
                  <div className="cm-pin__fade" />
                </div>
                <div className="cm-body hm-r hm-r--2">
                  <div className="cm-text">
                    {s.paragraphs.map((p, k) => (
                      <p key={k}>{p}</p>
                    ))}
                  </div>
                  {s.href && (
                    <a
                      href={s.href}
                      className="cm-pub__link"
                      aria-label={`Read more: ${s.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read more
                    </a>
                  )}
                </div>
              </section>
            );
        }
      })}
    </div>
  );
}
