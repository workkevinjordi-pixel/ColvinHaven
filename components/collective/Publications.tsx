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
          width={452}
          height={640}
          sizes="(min-width: 900px) 350px, 55vw"
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
 * Two publication mentions. Re-synced against the current Figma frame
 * (node 391:1394, replacing node 222:4394's own sizing): the whole
 * block (heading + both slides) now sits inside the page's standard
 * 1216px content column rather than running full max-width, the
 * centered "PUBLICATIONS" heading drops its divider line (matching
 * this site's established pattern for every other recently-redesigned
 * section heading), each slide's own cover photo shrinks from 542x767
 * to 452x640 (same ~0.707 aspect ratio, just smaller), and each slide
 * is no longer pinned to a full 100vh of space -- a compact
 * pl-120/pr-80/py-60 card row instead of the previous dramatic
 * one-viewport-per-mention pacing.
 *
 * Publications come from Sanity (getPublications(), ordered by the
 * Studio's own `order` field) rather than a hardcoded array -- a plain
 * async Server Component so it can fetch directly, same pattern as
 * News' own PublicationsSection. Still shared with /news' own separate
 * PublicationsSection component (a different, narrower treatment) --
 * only this file's own sizing changed here.
 */
export default async function Publications() {
  const publications = await getPublications();

  return (
    <section className="collective-publications">
      <div className="collective-publications__inner">
        <div className="collective-publications__intro">
          <h2 className="collective-publications__heading">NEWS</h2>
        </div>
        {publications.map((pub) => (
          <PublicationSlide key={pub.title} pub={pub} />
        ))}
      </div>
    </section>
  );
}
