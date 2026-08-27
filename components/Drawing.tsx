import Image from "next/image";
import ScrollFade from "./ScrollFade";

export default function Drawing() {
  return (
    <section className="drawing">
      <ScrollFade>
        <div className="drawing__frame">
          <Image
            src="/assets/section-drawing-inverted.png"
            alt="Architectural elevation sketch of pavilions set into a sloped, tree-lined site, rendered in white line art on black"
            width={2400}
            height={1292}
            sizes="(min-width: 900px) 90vw, 100vw"
          />
        </div>
      </ScrollFade>
    </section>
  );
}
