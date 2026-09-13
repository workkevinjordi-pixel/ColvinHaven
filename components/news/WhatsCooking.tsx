import ScrollFade from "../ScrollFade";

type ChecklistItem = {
  title: string;
  description: string;
};

// Figma's own copy repeats the SORA description verbatim for the
// "Last Publications" item (203:817 / 208:...) -- kept as-is, faithful
// to the source, rather than inventing different placeholder text.
const COLUMN_1: ChecklistItem[] = [
  {
    title: "Edition II/VII: SORA (空 - Sky)",
    description:
      "A 2000m2 house, the second express in our collection. Not a smaller version of Tsuki, but its true essence distilled.",
  },
  {
    title: "Last Publications: Wallpaper*",
    description:
      "A 2000m2 house, the second express in our collection. Not a smaller version of Tsuki, but its true essence distilled.",
  },
];

const COLUMN_2: ChecklistItem[] = [
  {
    title: "Environmental Actions: Tumbak Bayuh Village",
    description:
      "Tumbak Bayuh village reforesting project. Bring back the nature of Bali landscape as the God’s plan.",
  },
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
 * Page-opening "What's Cooking" statement (Figma node 205:552, updated):
 * same heading-row (heading + "–" + subtitle) as before, but the body
 * is now a 2-column, 4-item checklist summarizing what's below on the
 * page (the Sora edition, latest publication, environmental and social
 * action) instead of a tag + paragraph -- so this no longer reuses
 * StatementSection wholesale, just its heading-row/divider pieces.
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
