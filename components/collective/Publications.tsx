import PublicationCover from "./PublicationCover";
import { PUBLICATIONS } from "./publications-data";

/**
 * Press mentions, "shelf" layout (design canvas, Publications D): the three
 * covers stand side by side on a shelf line, and under it each one's
 * edition | year and name, centred. A cover links to its article when we
 * have its address. The descriptions are not part of this layout, so they
 * stay on the page as text for screen readers only. The heading stays
 * "NEWS" (renamed on request).
 */
export default function Publications() {
  return (
    <section className="collective-publications">
      <div className="collective-publications__inner">
        <h2 className="collective-publications__heading">NEWS</h2>
        <div className="collective-publications__shelf">
          <div
            className="collective-publications__shelf-line"
            aria-hidden="true"
          />
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
                className={`collective-publications__slot${pub.href ? " collective-publications__slot--link" : ""}`}
                key={`${pub.title}-${i}`}
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
                  <p className="collective-publications__tags">
                    <span>{edition}</span>
                    <i aria-hidden="true" />
                    <span>{year}</span>
                  </p>
                  <h3 className="collective-publications__title">
                    {pub.title}
                  </h3>
                  <p className="hm-sr">{pub.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
