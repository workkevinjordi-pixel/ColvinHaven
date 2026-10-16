import Image from "next/image";

type EditionsHeroProps = {
  image?: { src: string; alt: string };
};

// Matches the content migrated into Sanity's editionsPage.heroImage
// (see lib/sanity/editionsPage.ts and app/editions/page.tsx) -- kept
// as a fallback here in case the fetch ever comes back empty, not the
// source of truth.
const DEFAULT_IMAGE = {
  src: "/assets/editions/editions-hero-palms-sunset.jpg",
  alt: "Silhouetted palm trees against an amber sunset sky",
};

/**
 * Top-of-page banner (Figma node 325:39451): a single full-bleed photo,
 * nothing else -- replaces the previous frame's own centered-statement
 * + filmstrip intro (EditionsIntro, still used as-is by /editions-new,
 * a different Figma frame with its own different intro). That
 * frame's own lede paragraph (node 325:39452) is still Lorem Ipsum and
 * hidden (Figma's own `hidden` flag, confirmed via metadata) -- not
 * rendered here at all, not even as real copy, since Figma itself
 * doesn't show it.
 *
 * Genuinely new photography (confirmed: no existing site asset's name
 * or content matches silhouetted palms against an amber sunset sky) --
 * downloaded and run through this project's own export pipeline
 * (sips jpeg/resample/recompress), not used directly from Figma's own
 * temporary asset URL. Content now comes from Sanity's
 * editionsPage.heroImage.
 */
export default function EditionsHero({
  image = DEFAULT_IMAGE,
}: EditionsHeroProps) {
  return (
    <section className="editions-hero">
      <div className="editions-hero__image">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
    </section>
  );
}
