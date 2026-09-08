import ScrollFade from "./ScrollFade";

export type StatementSectionProps = {
  heading: string;
  /** Optional kicker shown beside the heading, e.g. "– A taste of what's
   * happening" (News' "What's Cooking"). Only that section uses it so
   * far; every other StatementSection keeps the plain heading. */
  subtitle?: string;
  tag: string;
  paragraphs: string[];
};

/**
 * Heading + divider + label-tag + paragraph column, reusing the site's
 * .values__body/aside/text layout. Used by Editions' "CH Collections",
 * Collective's "Inspiration", and News' "What's Cooking"/"Publications"
 * -- same treatment every time, only the copy (and News' subtitle)
 * changes.
 */
export default function StatementSection({
  heading,
  subtitle,
  tag,
  paragraphs,
}: StatementSectionProps) {
  return (
    <section className="statement-section">
      <ScrollFade>
        {subtitle ? (
          <div className="statement-section__heading-row">
            <h2 className="section-heading">{heading}</h2>
            <p className="statement-section__subtitle">– {subtitle}</p>
          </div>
        ) : (
          <h2 className="section-heading">{heading}</h2>
        )}
        <hr className="values__divider" />
        <div className="values__body">
          <div className="values__aside">
            <div className="values__tag">
              <span className="values__dot" />
              <span>{tag}</span>
            </div>
          </div>
          <div className="values__text statement-section__text">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </ScrollFade>
    </section>
  );
}
