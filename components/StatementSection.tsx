import ScrollFade from "./ScrollFade";

export type StatementSectionProps = {
  heading: string;
  tag: string;
  paragraphs: string[];
};

/**
 * Heading + divider + label-tag + paragraph column, reusing the site's
 * .values__body/aside/text layout. Used by Editions' "CH Collections",
 * Collective's "Inspiration", and News' "News"/"Publications" -- same
 * treatment every time, only the copy changes.
 */
export default function StatementSection({
  heading,
  tag,
  paragraphs,
}: StatementSectionProps) {
  return (
    <section className="statement-section">
      <ScrollFade>
        <h2 className="section-heading">{heading}</h2>
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
