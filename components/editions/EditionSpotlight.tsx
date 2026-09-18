import Image from "next/image";
import type { EditionData } from "./editions-data";

function ImageTextRow({ row }: { row: EditionData["row1"] }) {
  return (
    <div className="edition-spotlight__row">
      <div className="edition-spotlight__row-main">
        <div className="edition-spotlight__row-image">
          <Image
            src={row.main.image.src}
            alt={row.main.image.alt}
            fill
            sizes="(min-width: 900px) 790px, 100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="edition-spotlight__row-text">
          {row.main.text.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
      <div className="edition-spotlight__row-side">
        <div className="edition-spotlight__row-image">
          <Image
            src={row.side.image.src}
            alt={row.side.image.alt}
            fill
            sizes="(min-width: 900px) 403px, 100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <p>{row.side.text}</p>
      </div>
    </div>
  );
}

function GalleryRow({ images }: { images: EditionData["galleryRow"] }) {
  return (
    <div className="edition-story__gallery">
      {images.map((img, i) => (
        <div className="edition-story__gallery-image" key={i}>
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 900px) 33vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}
    </div>
  );
}

/**
 * The detail page's body content (Figma node 232:4674, everything below
 * its own centered header -- see EditionDetailHeader). Used only by
 * app/editions/[slug]/page.tsx -- the /editions page itself shows the
 * shorter EditionsList summary instead, linking here for the full
 * story.
 */
export default function EditionSpotlight({ data }: { data: EditionData }) {
  const {
    title,
    specs,
    craftText,
    portraitImage,
    heroImage,
    row1,
    banner1,
    storyA,
    galleryRow,
    storyB,
    quoteBanner,
    row4,
  } = data;

  return (
    <section className="edition-spotlight">
      {/* No ScrollFade here (unlike most other sections on the site) --
          it wraps its whole target as a single fade unit, gated by a
          15%-of-target-height intersection threshold. That's fine for a
          normal, roughly-viewport-scale section, but this page's body
          runs 6000px+ tall: 15% of that is taller than the viewport
          itself, so the threshold is float-precision-close to
          unreachable and the entire story would stay invisible through
          most of the scroll. Plain content instead. */}
      <div className="edition-spotlight__body">
        <div className="edition-spotlight__hero-image">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            sizes="(min-width: 900px) 1216px, 100vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="edition-story__title-block">
          <h3 className="edition-story__title">{title}</h3>
          <hr className="values__divider" />
        </div>

        <div className="edition-story__info-row">
          <div className="edition-story__specs">
            {specs.map((spec) => (
              <div className="edition-story__spec" key={spec.label}>
                <p className="edition-story__spec-label">{spec.label}</p>
                <p className="edition-story__spec-value">{spec.value}</p>
              </div>
            ))}
          </div>
          <div className="edition-story__craft-text">
            {craftText.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="edition-story__portrait">
            <Image
              src={portraitImage.src}
              alt={portraitImage.alt}
              fill
              sizes="(min-width: 900px) 253px, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <ImageTextRow row={row1} />

        <div className="edition-spotlight__banner">
          <Image
            src={banner1.src}
            alt={banner1.alt}
            fill
            sizes="(min-width: 900px) 1216px, 100vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="edition-story__side-block edition-story__side-block--a">
          <div className="edition-story__side-block-text">
            {storyA.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="edition-story__side-block-image">
            <Image
              src={storyA.image.src}
              alt={storyA.image.alt}
              fill
              sizes="(min-width: 900px) 313px, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <GalleryRow images={galleryRow} />

        <div className="edition-story__side-block edition-story__side-block--b">
          <div className="edition-story__side-block-image">
            <Image
              src={storyB.image.src}
              alt={storyB.image.alt}
              fill
              sizes="(min-width: 900px) 313px, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="edition-story__side-block-text">
            {storyB.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p>
              {storyB.linkParagraph.before}
              <a
                href={storyB.linkParagraph.linkHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {storyB.linkParagraph.linkText}
              </a>
              {storyB.linkParagraph.after}
            </p>
          </div>
        </div>

        <div className="edition-story__quote-banner">
          <div className="edition-story__quote-image">
            <Image
              src={quoteBanner.image.src}
              alt={quoteBanner.image.alt}
              fill
              sizes="(min-width: 900px) 1216px, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="edition-story__quote-text">
            <p className="edition-story__quote-heading">
              {quoteBanner.heading}
            </p>
            <p className="edition-story__quote-body">{quoteBanner.body}</p>
          </div>
        </div>

        <ImageTextRow row={row4} />

        <GalleryRow images={galleryRow} />
      </div>
    </section>
  );
}
