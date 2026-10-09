import Image from "next/image";
import { getPublications, type Publication } from "@/lib/sanity/publications";

function PublicationSlide({ pub }: { pub: Publication }) {
  const cover = pub.coverImage ?? { src: "", alt: "" };
  return (
    <div className="collective-publications__slide">
      <div className="collective-publications__cover">
        <Image
          src={cover.src}
          alt={cover.alt}
          width={542}
          height={767}
          sizes="(min-width: 900px) 400px, 55vw"
          className="collective-publications__cover-img"
        />
      </div>
      <div className="collective-publications__body">
        <p className="collective-publications__date">{pub.date}</p>
        <h3 className="collective-publications__title">{pub.title}</h3>
        <div className="collective-publications__text">
          {pub.paragraphs.map((p, j) => (
            <p key={j}>{p}</p>
          ))}
        </div>
        <a
          href={pub.readMoreHref}
          target="_blank"
          rel="noopener noreferrer"
          className="collective-publications__link"
        >
          Read more
        </a>
      </div>
    </div>
  );
}

/**
 * Two publication mentions (Figma node 222:4394), one full viewport of
 * space each, stacked in plain normal document flow -- no scroll-jacked
 * pin, no scroll-triggered animation, just a static section.
 *
 * Publications now come from Sanity (getPublications(), ordered by the
 * Studio's own `order` field) rather than a hardcoded array -- was a
 * "use client" component (no actual client-only behavior in it, just
 * vestigial), now a plain async Server Component so it can fetch
 * directly, same pattern as News' own PublicationsSection.
 */
export default async function Publications() {
  const publications = await getPublications();

  return (
    <section className="collective-publications">
      <div className="collective-publications__intro">
        <h2 className="section-heading">Publications</h2>
        <hr className="values__divider" />
      </div>
      {publications.map((pub) => (
        <PublicationSlide key={pub.title} pub={pub} />
      ))}
    </section>
  );
}
