import Image from "next/image";
import ScrollFade from "../ScrollFade";

export type EditionSpotlightData = {
  index: string;
  title: string;
  lede: string[];
  heroImage: { src: string; alt: string };
  row: {
    main: { image: { src: string; alt: string }; text: string[] };
    side: { image: { src: string; alt: string }; text: string };
  };
  banner: { src: string; alt: string };
};

/**
 * One "edition" article block (Figma nodes 203:100 and 203:101 -- both
 * currently hold identical Tsuki content in the source file; this
 * component just renders whatever data it's given, so a second edition's
 * real copy is a one-object change in the page, not a new component).
 */
export default function EditionSpotlight({ data }: { data: EditionSpotlightData }) {
  const { index, title, lede, heroImage, row, banner } = data;

  return (
    <section className="edition-spotlight">
      <ScrollFade>
        <p className="edition-spotlight__index">{index}</p>
        <hr className="edition-spotlight__divider" />

        <div className="edition-spotlight__body">
          <div className="edition-spotlight__lede">
            <div className="edition-spotlight__hero-image">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                sizes="(min-width: 900px) 1216px, 100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="edition-spotlight__title-block">
              <h3 className="edition-spotlight__title">{title}</h3>
              {lede.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="edition-spotlight__row">
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
              <div className="edition-spotlight__row-text">
                {row.main.text.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
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
              <p>{row.side.text}</p>
            </div>
          </div>

          <div className="edition-spotlight__banner">
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              sizes="(min-width: 900px) 1216px, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </ScrollFade>
    </section>
  );
}
