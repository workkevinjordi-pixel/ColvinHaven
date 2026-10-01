import Image from "next/image";

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
 * temporary asset URL.
 */
export default function EditionsHero() {
  return (
    <section className="editions-hero">
      <div className="editions-hero__image">
        <Image
          src="/assets/editions/editions-hero-palms-sunset.jpg"
          alt="Silhouetted palm trees against an amber sunset sky"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
    </section>
  );
}
