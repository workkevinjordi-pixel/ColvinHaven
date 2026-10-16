import Image from "next/image";
import Swiper from "@/components/ui/Swiper";
import type { EditionData } from "./editions-data";

// Phones swap the row's first photo for this one (Figma 461:797, Tsuki's
// terrace living room); the Sanity photo stays on desktop and tablet.
const TALL_MAIN_PHONE_IMAGE = {
  src: "/assets/editions/detail/row4-main.jpg",
  alt: "Tsuki's living room under a teak ceiling, a lamp and sofa on the terrace above the jungle",
};

export function ImageTextRow({
  row,
  id,
  tallMain = false,
}: {
  row: EditionData["row1"];
  /** Phones: the first photo is the Figma 461:797 one, 520px high, full
   * width (see TALL_MAIN_PHONE_IMAGE). */
  tallMain?: boolean;
  /** Same role as GalleryRow's own `id` -- lets a layout mark whichever
   * block happens to be its last piece of edition content, which is
   * what EditionStickyBanner watches to know when to hide itself. In
   * Sora's layout that's this row, not a gallery. */
  id?: string;
}) {
  // A row whose captions are all empty (Tsuki's own frame leaves them as
  // placeholders) drops its text blocks entirely, and the images' own
  // 24px caption gap with them.
  const hasText = row.main.text.length > 0 || row.side.text !== "";
  return (
    <div
      className={`edition-spotlight__row${hasText ? "" : " edition-spotlight__row--no-text"}`}
      id={id}
    >
      <div className="edition-spotlight__row-main">
        <div
          className={`edition-spotlight__row-image${tallMain ? " edition-spotlight__row-image--tall" : ""}`}
        >
          <Image
            className={
              tallMain ? "edition-spotlight__photo-desktop" : undefined
            }
            src={row.main.image.src}
            alt={row.main.image.alt}
            fill
            sizes="(min-width: 900px) 790px, 100vw"
            style={{ objectFit: "cover" }}
          />
          {tallMain && (
            <Image
              className="edition-spotlight__photo-phone"
              src={TALL_MAIN_PHONE_IMAGE.src}
              alt={TALL_MAIN_PHONE_IMAGE.alt}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
        {row.main.text.length > 0 && (
          <div className="edition-spotlight__row-text">
            {row.main.text.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
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
        {row.side.text !== "" && <p>{row.side.text}</p>}
      </div>
    </div>
  );
}

export function GalleryRow({
  images,
  id,
}: {
  images: EditionData["galleryRow"];
  id?: string;
}) {
  // On phones the row is a swiper (photo per screen); the wrapper adds
  // previous/next buttons and a position indicator only where the row
  // actually scrolls, so desktop and tablet are the plain row as before.
  return (
    <Swiper
      className="edition-story__gallery-swiper"
      trackClassName="edition-story__gallery"
      id={id}
      tone="dark"
      label="Photos"
    >
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
    </Swiper>
  );
}
