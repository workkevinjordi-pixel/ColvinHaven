import Image from "next/image";
import ScrollFade from "../ScrollFade";

type HomePhotoBandProps = {
  src?: string;
  alt?: string;
  /** Band height in px on desktop (Figma: 583 for the corridor band, 611
   * for the pool band, matching each photo's 1500px-wide ratio). */
  height?: number;
};

/**
 * Wide full-width photo band on the homepage (Figma 385:14). Default is the
 * corridor/bedroom photo between the Editions intro and the Approach
 * gallery (node 427:705); the pool photo below the story row reuses it
 * (node 459:796).
 */
export default function HomePhotoBand({
  src = "/assets/home-corridor-bedroom.jpg",
  alt = "A dark timber-slatted corridor beside a warm teak bedroom with shoji screens",
  height = 583,
}: HomePhotoBandProps) {
  return (
    <section className="home-photo-band">
      <ScrollFade className="home-photo-band__inner" once>
        <div
          className="home-photo-band__frame"
          style={{ ["--band-h" as string]: `${height}px` }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </ScrollFade>
    </section>
  );
}
