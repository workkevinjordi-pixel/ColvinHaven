import Image from "next/image";

/**
 * Standalone full-width photo band between Craft and Inspiration (Figma
 * node 203:330) -- same 1320px column and treatment as CollectiveIntro's
 * own photo, just used bare with no accompanying text.
 */
export default function PhotoBand({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="collective-photo-band">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1320px) 1320px, 100vw"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
