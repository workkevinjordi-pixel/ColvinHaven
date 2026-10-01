import Image from "next/image";
import type { EditionData } from "./editions-data";
import { ImageTextRow, GalleryRow } from "./EditionSpotlight";

/**
 * Each edition's full story as it actually appears inline on the
 * /editions page (the "Editions" frame, 325:39444) -- used by
 * /editions and /editions1. NOT the same section sequence as
 * EditionSpotlight's own fixed order (the one app/editions/[slug] and
 * /editions-new use) -- confirmed via a dedicated get_design_context
 * pass on each edition's own sub-nodes after the live page was flagged
 * as not matching this frame, and each edition turned out to have its
 * own distinct, bespoke order here (not one shared template reused
 * twice):
 *
 * Tsuki (node 325:39482, `layout="tsuki"`, the default): hero -> title
 * -> info-row -> ImageTextRow(row4, not row1) -> banner1 -> storyA
 * side-block -> quoteBanner (heading only -- its body text node is
 * hidden on this frame) -> GalleryRow(galleryRow2, not galleryRow) ->
 * closingBanner. row1's own content, storyB, and the first
 * `galleryRow` don't appear anywhere on this edition's frame at all.
 *
 * Sora (node 325:39567, `layout="sora"`): hero -> title -> info-row ->
 * ImageTextRow(row1) -> banner1 -> storyA side-block ->
 * GalleryRow(galleryRow) -> storyB side-block -> ImageTextRow(row4) ->
 * closingBanner. No quoteBanner at all on this edition's frame.
 * Structurally this is EditionSpotlight's own full default order minus
 * quoteBanner and the second gallery row -- not Tsuki's layout above.
 *
 * Every "UMAH+TSUKI+-+5.+Pool+Area+(7+of+12)+-+IMG_0066" -named node on
 * BOTH editions' frames (hero/banner1/closingBanner slots) is the same
 * handful of generic placeholder photos Figma reused across both
 * editions' copies of this frame, not genuine distinct photography --
 * unlike those slots, every image actually used below for Sora already
 * went through its own one-by-one visual-diff confirmation against a
 * dedicated Sora detail-page frame (see editions-data.ts's own
 * comments on the `sora` object), so this keeps those already-real
 * photos instead of swapping in this frame's reused placeholders.
 *
 * Reuses ImageTextRow/GalleryRow from EditionSpotlight.tsx and every
 * one of its existing `.edition-spotlight__*`/`.edition-story__*` CSS
 * classes verbatim (all already generic, not page-scoped) -- only the
 * JSX arrangement and which EditionData fields feed which slot differ
 * per layout, so no new CSS was needed for either one.
 */
export default function EditionStorySummary({
  data,
  layout = "tsuki",
  finalGalleryId = "edition-final-gallery",
}: {
  data: EditionData;
  layout?: "tsuki" | "sora";
  finalGalleryId?: string;
}) {
  const {
    title,
    specs,
    craftText,
    portraitImage,
    heroImage,
    detailHeroImage,
    row1,
    banner1,
    editionsBanner1,
    storyA,
    editionsStoryAImage,
    galleryRow,
    galleryRow2,
    storyB,
    quoteBanner,
    row4,
    closingBanner,
    editionsClosingBanner,
  } = data;

  const hero = detailHeroImage ?? heroImage;
  const banner1Image = editionsBanner1 ?? banner1;
  const storyAImage = editionsStoryAImage ?? storyA.image;
  const closingBannerImage = editionsClosingBanner ?? closingBanner;

  const banner1Block = (
    <div className="edition-spotlight__banner">
      <Image
        src={banner1Image.src}
        alt={banner1Image.alt}
        fill
        sizes="(min-width: 900px) 1216px, 100vw"
        style={{ objectFit: "cover" }}
      />
    </div>
  );

  const storyABlock = (
    <div className="edition-story__side-block edition-story__side-block--a">
      <div className="edition-story__side-block-text">
        {storyA.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="edition-story__side-block-image">
        <Image
          src={storyAImage.src}
          alt={storyAImage.alt}
          fill
          sizes="(min-width: 900px) 313px, 100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );

  return (
    <section className="edition-spotlight">
      <div className="edition-spotlight__body">
        <div className="edition-spotlight__hero-image">
          <Image
            src={hero.src}
            alt={hero.alt}
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

        {layout === "sora" ? (
          <>
            <ImageTextRow row={row1} />
            {banner1Block}
            {storyABlock}
            <GalleryRow images={galleryRow} id={finalGalleryId} />

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

            <ImageTextRow row={row4} />
          </>
        ) : (
          <>
            <ImageTextRow row={row4} />
            {banner1Block}
            {storyABlock}

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
              </div>
            </div>

            <GalleryRow
              images={galleryRow2 ?? galleryRow}
              id={finalGalleryId}
            />
          </>
        )}

        {closingBannerImage && (
          <div className="edition-spotlight__banner">
            <Image
              src={closingBannerImage.src}
              alt={closingBannerImage.alt}
              fill
              sizes="(min-width: 900px) 1216px, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
