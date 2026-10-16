"use client";

import { useEffect, useState } from "react";
import type { RefObject } from "react";

/**
 * Tracks the full-screen sections of a phone layout (elements carrying
 * data-hm-section="<index>") while the page scrolls normally:
 *  - `active`: the section under the middle of the screen (drives the nav
 *    tone and the closest-section decisions);
 *  - `seen`: every section that has come into view from below (the lowest
 *    ~20% of the screen counts as in view). Reveal animations key off this
 *    and stay on, so text is already there when a section is half on
 *    screen and doesn't re-run when scrolling back up.
 */
export function useSectionState(rootRef: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState<ReadonlySet<number>>(() => new Set([0]));

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-hm-section]"));
    const index = (el: Element) => Number((el as HTMLElement).dataset.hmSection);

    const middle = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(index(entry.target));
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    const reveal = new IntersectionObserver(
      (entries) => {
        const entered = entries.filter((e) => e.isIntersecting).map((e) => index(e.target));
        if (entered.length === 0) return;
        setSeen((prev) => {
          if (entered.every((i) => prev.has(i))) return prev;
          const next = new Set(prev);
          entered.forEach((i) => next.add(i));
          return next;
        });
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0 },
    );

    els.forEach((el) => {
      middle.observe(el);
      reveal.observe(el);
    });
    return () => {
      middle.disconnect();
      reveal.disconnect();
    };
  }, [rootRef]);

  return { active, seen };
}
