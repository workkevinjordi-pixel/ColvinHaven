import Image from "next/image";
import type { EditionData } from "./editions-data";

export function ImageTextRow({
  row,
  id,
}: {
  row: EditionData["row1"];
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
        <div className="edition-spotlight__row-image">
          <Image
            src={row.main.image.src}
            alt={row.main.image.alt}
            fill
            sizes="(min-width: 900px) 790px, 100vw"
            style={{ objectFit: "cover" }}
          />
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
  return (
    <div className="edition-story__gallery" id={id}>
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
