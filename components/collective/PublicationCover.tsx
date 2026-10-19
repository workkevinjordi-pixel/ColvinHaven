import Image from "next/image";
import type { Cover } from "./publications-data";

export default function PublicationCover({
  title,
  cover,
}: {
  title: string;
  cover: Cover;
}) {
  if (cover.kind === "image") {
    return (
      <div className="collective-publications__cover">
        <Image
          src={cover.src}
          alt={`${title} cover`}
          fill
          sizes="170px"
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  }
  // The Wallpaper* covers are built from the magazine's logo and the issue
  // photo, laid out like the A4 front page in the design.
  return (
    <div
      className="collective-publications__cover collective-publications__cover--wallpaper"
      role="img"
      aria-label={`${title} cover: ${cover.headline.join("").trim()}`}
    >
      <Image
        className="collective-publications__wp-logo"
        src="/assets/collective/publications/wallpaper-logo.webp"
        alt=""
        width={93}
        height={23}
        sizes="93px"
      />
      <p className="collective-publications__wp-tagline" aria-hidden="true">
        Your Daily Digest of Latest News
      </p>
      <div className="collective-publications__wp-photo" aria-hidden="true">
        <Image
          src={cover.photo}
          alt=""
          fill
          sizes="170px"
          style={{ objectFit: "cover" }}
        />
      </div>
      <p className="collective-publications__wp-headline" aria-hidden="true">
        {cover.headline[0]}
        <br />
        {cover.headline[1]}
      </p>
      <p className="collective-publications__wp-sub" aria-hidden="true">
        {cover.sub}
      </p>
    </div>
  );
}
