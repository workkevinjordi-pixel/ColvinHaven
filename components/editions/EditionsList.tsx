"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCollapseOnScroll } from "@/lib/useCollapseOnScroll";
import type { EditionData } from "./editions-data";

function EditionRow({ edition }: { edition: EditionData }) {
  const rowRef = useRef<HTMLDivElement>(null);
  useCollapseOnScroll(rowRef);

  return (
    <div className="editions-list__row" ref={rowRef}>
      <div className="editions-list__image">
        <Image
          src={edition.heroImage.src}
          alt={edition.heroImage.alt}
          fill
          sizes="(min-width: 900px) 50vw, 100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="editions-list__body">
        <div className="editions-list__meta">
          <p className="editions-list__eyebrow">{edition.index}</p>
          <div className="editions-list__heading">
            <p className="editions-list__name">{edition.name}</p>
            <div className="editions-list__summary">
              {edition.listSummary.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
        <Link
          href={`/editions/${edition.slug}`}
          className="editions-list__explore"
        >
          {edition.exploreLabel}
        </Link>
      </div>
    </div>
  );
}

/**
 * "Editions" (Figma node 232:4626): one summary row per edition, each
 * linking to its own detail page (app/editions/[slug]/page.tsx) --
 * replaces what used to be the full EditionSpotlight content rendered
 * inline here; that full story moved to the detail page, and this is
 * just the teaser.
 *
 * The scroll-collapse effect (each row shrinking/fading away as it
 * scrolls past, via useCollapseOnScroll) is the same one Collective's
 * Publications section uses, by explicit request ("exactly similar").
 */
export default function EditionsList({ editions }: { editions: EditionData[] }) {
  return (
    <section className="editions-list">
      <div className="editions-list__intro">
        <h2 className="section-heading">Editions</h2>
        <hr className="values__divider" />
      </div>
      {editions.map((edition) => (
        <EditionRow key={edition.slug} edition={edition} />
      ))}
    </section>
  );
}
