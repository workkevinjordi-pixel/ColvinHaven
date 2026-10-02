import ScrollFade from "../ScrollFade";

type ChecklistItem = {
  title: string;
  description: string;
};

// Re-synced against the current "News" Figma frame (node 368:40022,
// replacing 205:468/250:10858): three items now, not four -- the
// Environmental Actions checklist entry is gone from this frame
// entirely (matching that section's own removal further down the page,
// see app/news/page.tsx's own comment), and the featured edition is
// now Mori, not Sora. Figma's own copy still literally says "the
// second express" for Mori here, even though Mori's own section
// further down calls itself "the third express" -- an inconsistency in
// Figma's own source text, not something introduced by this port --
// kept verbatim rather than silently reconciled, same as this file's
// established practice of porting Figma's own repeated/inconsistent
// copy faithfully rather than inventing a fix.
const COLUMN_1: ChecklistItem[] = [
  {
    title: "Edition III/VII: MORI (森 - Jungle)",
    description:
      "A 2000m2 house, the second express in our collection. Not a smaller version of Tsuki, but its true essence distilled.",
  },
  {
    title: "Last Publications: Wallpaper*",
    description:
      "We are so pleased for our flagship home, Umah Tsuki, to be featured on Wallpaper.com.",
  },
];

const COLUMN_2: ChecklistItem[] = [
  {
    title: "Social Action: Colvin Haven Foundation",
    description:
      "A Social foundation under Colvin Haven Funding, who funded some social action in Bali to keep the cultural and nature.",
  },
];

function ChecklistColumn({ items }: { items: ChecklistItem[] }) {
  return (
    <div className="news-checklist__col">
      {items.map((item) => (
        <div className="news-checklist__item" key={item.title}>
          <span className="news-checklist__icon" aria-hidden="true" />
          <div className="news-checklist__body">
            <p className="news-checklist__title">{item.title}</p>
            <p className="news-checklist__desc">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Page-opening "What's Cooking" statement (Figma node 368:40041,
 * replacing 205:552): same heading-row (heading + "–" + subtitle) as
 * before, body is still a 2-column checklist -- just three items now
 * (two in column 1, one in column 2) instead of four evenly split, so
 * this no longer reuses StatementSection wholesale, just its
 * heading-row/divider pieces, same as before.
 */
export default function WhatsCooking() {
  return (
    <section className="statement-section">
      <ScrollFade>
        <div className="statement-section__heading-row">
          <h2 className="section-heading">What’s Cooking</h2>
          <p className="statement-section__subtitle">
            – A taste of what’s happening
          </p>
        </div>
        <hr className="values__divider" />
        <div className="news-checklist">
          <ChecklistColumn items={COLUMN_1} />
          <ChecklistColumn items={COLUMN_2} />
        </div>
      </ScrollFade>
    </section>
  );
}
