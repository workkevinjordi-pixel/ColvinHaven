import Image from "next/image";

export type ArticleCardData = {
  image: { src: string; alt: string };
  date: string;
  title: string;
  /** One entry per paragraph -- Environmental Actions' card has two. */
  description: string[];
  /** Publications' card shows a "Read more" line; Environmental Actions'
   * doesn't. */
  readMore?: boolean;
};

/**
 * Image + date + title + description (+ optional "Read more") article
 * card, always at the 790px "main" width -- reused by both Publications
 * (paired with a tag, standing alone) and Environmental Actions (paired
 * with a tall side image). Extracted from what was a two-card-only
 * PublicationsGrid; the .publications__card* classes are unchanged.
 */
export default function ArticleCard({
  image,
  date,
  title,
  description,
  readMore = false,
}: ArticleCardData) {
  return (
    <article className="publications__card publications__card--main">
      <div className="publications__card-image">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 900px) 790px, 100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="publications__card-body">
        <div className="publications__card-meta">
          <p className="publications__card-date">{date}</p>
          <div className="publications__card-heading">
            <h3 className="publications__card-title">{title}</h3>
            {description.map((p, i) => (
              <p key={i} className="publications__card-description">
                {p}
              </p>
            ))}
          </div>
        </div>
        {readMore && <p className="publications__card-link">Read more</p>}
      </div>
    </article>
  );
}
