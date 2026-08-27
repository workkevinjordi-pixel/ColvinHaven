import Image from "next/image";

export default function Drawing() {
  return (
    <section className="drawing">
      <div className="drawing__frame">
        <Image
          src="/assets/section-drawing.png"
          alt="Architectural elevation sketch of pavilions set into a sloped, tree-lined site"
          width={2400}
          height={1292}
          sizes="(min-width: 900px) 90vw, 100vw"
        />
      </div>
    </section>
  );
}
