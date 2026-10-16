import Image from "next/image";
import ScrollFade from "../ScrollFade";

/**
 * Wide photo band between the Editions intro and the Approach gallery
 * (Figma 385:14, node 427:705): a dark timber corridor beside a warm
 * teak bedroom, full width at a fixed 583px.
 */
export default function HomePhotoBand() {
  return (
    <section className="home-photo-band">
      <ScrollFade className="home-photo-band__inner">
        <Image
          src="/assets/home-corridor-bedroom.jpg"
          alt="A dark timber-slatted corridor beside a warm teak bedroom with shoji screens"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </ScrollFade>
    </section>
  );
}
