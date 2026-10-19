"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import PublicationCover from "./PublicationCover";
import { PUBLICATIONS, type PublicationItem } from "./publications-data";

/**
 * Press mentions with an ALL / TSUKI / SORA filter (design canvas HTML).
 *
 * Filtering is animated in three beats so nothing jumps: the cards that
 * leave fade out; the rest slide to their new places (FLIP) while the
 * section height eases to its new value; the cards that arrive fade in.
 * Switching quickly just finishes the previous move and starts the next.
 * With reduced motion the list changes instantly.
 */
type Filter = "ALL" | "TSUKI" | "SORA";
const FILTERS: Filter[] = ["ALL", "TSUKI", "SORA"];

const EXIT_MS = 180;
const MOVE_MS = 460;
const ENTER_MS = 380;
const EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)";

const matches = (pub: PublicationItem, f: Filter) =>
  f === "ALL" || pub.tags[1] === f;

export default function Publications() {
  const [active, setActive] = useState<Filter>("ALL");
  const [applied, setApplied] = useState<Filter>("ALL");
  const appliedRef = useRef<Filter>("ALL");
  const pendingRef = useRef<Filter | null>(null);
  const timerRef = useRef<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const commit = useCallback((f: Filter) => {
    appliedRef.current = f;
    flushSync(() => setApplied(f));
  }, []);

  const cancelAll = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    gridRef.current?.getAnimations().forEach((a) => a.cancel());
    itemRefs.current.forEach((el) =>
      el?.getAnimations().forEach((a) => a.cancel()),
    );
  }, []);

  useEffect(() => () => cancelAll(), [cancelAll]);

  const select = (next: Filter) => {
    if (next === active) return;
    setActive(next);

    // Finish whatever was still moving, then work from the settled state.
    cancelAll();
    if (pendingRef.current) {
      commit(pendingRef.current);
      pendingRef.current = null;
    }
    const from = appliedRef.current;
    if (next === from) return;

    const grid = gridRef.current;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!grid || reduce || typeof grid.animate !== "function") {
      commit(next);
      return;
    }

    const idx = PUBLICATIONS.map((_, i) => i);
    const leaving = idx.filter(
      (i) => matches(PUBLICATIONS[i], from) && !matches(PUBLICATIONS[i], next),
    );
    const staying = idx.filter(
      (i) => matches(PUBLICATIONS[i], from) && matches(PUBLICATIONS[i], next),
    );
    const entering = idx.filter(
      (i) => !matches(PUBLICATIONS[i], from) && matches(PUBLICATIONS[i], next),
    );

    const move = () => {
      pendingRef.current = null;
      timerRef.current = null;
      const heightBefore = grid.getBoundingClientRect().height;
      const first = new Map(
        staying.map((i) => [i, itemRefs.current[i]!.getBoundingClientRect()]),
      );

      commit(next);
      leaving.forEach((i) =>
        itemRefs.current[i]?.getAnimations().forEach((a) => a.cancel()),
      );

      const heightAfter = grid.getBoundingClientRect().height;
      if (Math.abs(heightAfter - heightBefore) > 1) {
        grid.animate(
          [{ height: `${heightBefore}px` }, { height: `${heightAfter}px` }],
          { duration: MOVE_MS, easing: EASE },
        );
      }
      staying.forEach((i) => {
        const el = itemRefs.current[i]!;
        const a = first.get(i)!;
        const b = el.getBoundingClientRect();
        const dx = a.left - b.left;
        const dy = a.top - b.top;
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
        el.animate(
          [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }],
          { duration: MOVE_MS, easing: EASE },
        );
      });
      entering.forEach((i) => {
        itemRefs.current[i]?.animate(
          [
            { opacity: 0, transform: "translateY(14px)" },
            { opacity: 1, transform: "none" },
          ],
          {
            duration: ENTER_MS,
            delay: staying.length || leaving.length ? 140 : 0,
            easing: EASE,
            fill: "backwards",
          },
        );
      });
    };

    if (leaving.length === 0) {
      move();
      return;
    }
    pendingRef.current = next;
    leaving.forEach((i) => {
      itemRefs.current[i]?.animate(
        [
          { opacity: 1, transform: "scale(1)" },
          { opacity: 0, transform: "scale(0.96)" },
        ],
        { duration: EXIT_MS, easing: "ease-out", fill: "forwards" },
      );
    });
    timerRef.current = window.setTimeout(move, EXIT_MS);
  };

  const count = PUBLICATIONS.filter((p) => matches(p, active)).length;

  return (
    <section className="collective-publications">
      <div className="collective-publications__inner">
        <div className="collective-publications__head">
          <h2 className="collective-publications__heading">In The Press</h2>
          <div
            className="collective-publications__filters"
            role="group"
            aria-label="Filter publications"
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className="collective-publications__filter"
                aria-pressed={active === f}
                onClick={() => select(f)}
              >
                <span>{f}</span>
              </button>
            ))}
          </div>
          <p className="hm-sr" role="status" aria-live="polite">
            {`Showing ${count} ${count === 1 ? "publication" : "publications"}`}
          </p>
        </div>

        <div className="collective-publications__grid" ref={gridRef}>
          {PUBLICATIONS.map((pub, i) => {
            const [, edition, year] = pub.tags;
            const cover = (
              <div className="collective-publications__shelf-cover">
                <div className="collective-publications__shelf-scale">
                  <PublicationCover title={pub.title} cover={pub.cover} />
                </div>
              </div>
            );
            return (
              <article
                className="collective-publications__card"
                key={`${pub.title}-${i}`}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                hidden={!matches(pub, applied)}
                aria-label={`${pub.title}, ${edition}, ${year}`}
              >
                {pub.href ? (
                  <a
                    className="collective-publications__cover-link"
                    href={pub.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${pub.title}, ${edition}, ${year} (opens in a new tab)`}
                  >
                    {cover}
                  </a>
                ) : (
                  <div className="collective-publications__cover-link">
                    {cover}
                  </div>
                )}
                <div className="collective-publications__caption">
                  <h3 className="collective-publications__title">
                    {pub.title}
                  </h3>
                  <p className="collective-publications__blurb">{pub.blurb}</p>
                  <p className="collective-publications__tags">
                    <span>{edition}</span>
                    <i aria-hidden="true" />
                    <span>{year}</span>
                  </p>
                  {pub.href ? (
                    <a
                      className="collective-publications__read"
                      href={pub.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Read ${pub.title} (opens in a new tab)`}
                    >
                      READ
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
