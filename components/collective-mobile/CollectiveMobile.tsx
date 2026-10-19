"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Swiper from "@/components/ui/Swiper";
import { useSectionState } from "@/components/ui/useSectionState";
import PublicationCover from "@/components/collective/PublicationCover";
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

          case "sketch":
            return (
              <section
                key={i}
                className={cls(on, "cm-sketch")}
                data-hm-section={i}
              >
                <Image
                  className="cm-sketch__art hm-r"
                  src={s.src}
                  alt={s.alt}
                  width={1095}
                  height={589}
                  unoptimized
                  priority
                />
                <div className="cm-sketch__caption hm-r hm-r--1">
                  <h2 className="cm-sketch__title">{s.title}</h2>
                  <p className="cm-sketch__text">{s.text}</p>
                </div>
              </section>
            );

          case "news":
            return (
              <section
                key={i}
                className={cls(on, "cm-news")}
                data-hm-section={i}
              >
                <h2 className="cm-news__heading hm-r">{s.heading}</h2>
                <div className="cm-news__list">
                  {s.items.map((item, k) => (
                    <article
                      key={`${item.title}-${k}`}
                      className={`cm-news__item hm-r hm-r--${Math.min(k + 1, 3)}`}
                    >
                      <div className="cm-news__top">
                        <PublicationCover
                          title={item.title}
                          cover={item.cover}
                        />
                        <div className="cm-news__meta">
                          <h3 className="cm-news__title">{item.title}</h3>
                          <ul className="cm-news__tags">
                            {item.tags.map((tag) => (
                              <li key={tag}>{tag}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <p className="cm-news__text">{item.description}</p>
                    </article>
                  ))}
                </div>
              </section>
            );
        }
      })}
    </div>
  );
}
