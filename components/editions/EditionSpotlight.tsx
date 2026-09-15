import Image from "next/image";
import ScrollFade from "../ScrollFade";
import type { EditionData } from "./editions-data";

/**
 * The detail page's body content (Figma node 232:4674, everything below
 * its own centered header -- see EditionDetailHeader): hero image, the
 * poetic title + lede, a two-image row, and a closing banner. Used only
 * by app/editions/[slug]/page.tsx now -- the /editions page itself shows
 * the shorter EditionsList summary instead, linking here for the full
 * story. No longer renders its own roman-numeral index/divider (it used
 * to, back when this rendered inline per-edition on /editions itself);
 * the detail page's header already carries that same roman numeral.
 */
export default function EditionSpotlight({ data }: { data: EditionData }) {
  const { title, lede, heroImage, row, banner } = data;

  return (
    <section className="edition-spotlight">
      <ScrollFade>
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
