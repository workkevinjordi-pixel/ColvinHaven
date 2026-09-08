import Image from "next/image";

export type FilmstripImage = { src: string; alt: string; wide?: boolean };

/**
 * Full-bleed alternating narrow/wide image strip -- bleeds 309px past the
 * standard 1216px content column on both sides (1216 + 309*2 = 1834,
 * matching both Figma frames that use this pattern: Editions node 203:131
 * and Collective node 205:377). Shared because both pages reuse it
 * verbatim, not just visually similar.
 */
export default function Filmstrip({ images }: { images: FilmstripImage[] }) {
  return (
    <div className="filmstrip">
      {images.map((item, i) => (
        <div
          key={i}
          className={`filmstrip__item${item.wide ? " filmstrip__item--wide" : ""}`}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes={item.wide ? "443px" : "284px"}
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}
    </div>
  );
}
