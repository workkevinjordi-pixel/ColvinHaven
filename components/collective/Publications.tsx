import PublicationCover from "./PublicationCover";
import { PUBLICATIONS } from "./publications-data";

/**
 * Press mentions (Figma 492:1251): a centred heading, then a column of
 * rows -- a small A4 cover on the left; the publication's name, a short
 * description and a PUBLICATIONS | EDITION | YEAR line on the right --
 * separated by hairlines. The heading stays "NEWS" (renamed on request).
 */
export default function Publications() {
  return (
    <section className="collective-publications">
      <div className="collective-publications__inner">
        <h2 className="collective-publications__heading">NEWS</h2>
        <div className="collective-publications__list">
          {PUBLICATIONS.map((pub, i) => (
            <article
              className="collective-publications__item"
              key={`${pub.title}-${i}`}
            >
              <PublicationCover title={pub.title} cover={pub.cover} />
              <div className="collective-publications__body">
                <h3 className="collective-publications__title">{pub.title}</h3>
                <p className="collective-publications__text">
                  {pub.description}
                </p>
                <ul className="collective-publications__tags">
                  {pub.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
