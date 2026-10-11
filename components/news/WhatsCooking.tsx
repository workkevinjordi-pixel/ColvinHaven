import ScrollFade from "../ScrollFade";

type ChecklistItem = {
  title: string;
  description: string;
};

type WhatsCookingProps = {
  heading?: string;
  subtitle?: string;
  column1?: ChecklistItem[];
  column2?: ChecklistItem[];
};

// Matches the content migrated into Sanity's newsPage.whatsCooking
// (see lib/sanity/newsPage.ts and app/news/page.tsx) -- kept as a
// fallback here in case the fetch ever comes back empty, not the
// source of truth. Figma's own copy still literally says "the second
// express" for Mori here, even though Mori's own section further down
// calls itself "the third express" -- an inconsistency in Figma's own
// source text, kept verbatim rather than silently reconciled.
const DEFAULT_COLUMN_1: ChecklistItem[] = [
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

const DEFAULT_COLUMN_2: ChecklistItem[] = [
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
 * heading-row/divider pieces, same as before. Content now comes from
 * Sanity's newsPage.whatsCooking.
 */
export default function WhatsCooking({
  heading = "What’s Cooking",
  subtitle = "A taste of what’s happening",
  column1 = DEFAULT_COLUMN_1,
  column2 = DEFAULT_COLUMN_2,
}: WhatsCookingProps) {
  return (
    <section className="statement-section">
      <ScrollFade>
        <div className="statement-section__heading-row">
          <h2 className="section-heading">{heading}</h2>
          <p className="statement-section__subtitle">– {subtitle}</p>
        </div>
        <hr className="values__divider" />
        <div className="news-checklist">
          <ChecklistColumn items={column1} />
          <ChecklistColumn items={column2} />
        </div>
      </ScrollFade>
    </section>
  );
}
