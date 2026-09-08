import Image from "next/image";
import ScrollFade from "../ScrollFade";

type Publication = {
  image: { src: string; alt: string };
  date: string;
  title: string;
  description: string;
};

// Reuses the same two photos as the Editions/Collective filmstrips
// (Figma hashes here are byte-identical to those files).
const PUBLICATIONS: Publication[] = [
  {
    image: {
      src: "/assets/editions/tsuki-edition-1.png",
      alt: "Detail of Umah Tsuki's shou sugi ban roofline and timber-framed window",
    },
    date: "11/22/24",
    title: "Wallpaper*",
    description:
      "We are so pleased for our flagship home, Umah Tsuki, to be featured on Wallpaper.com. Wallpaper* is the global design authority, leading the way in architecture, design, art, entertaining, beauty & grooming, transport, technology, fashion, and watches & jewellery. The article, helmed by Ellie Stathaki, Architecture & Environment Director and writer Natasha Levy is featured in the Architectural Section of the website, which showcases the best of residential and non-commercial living spaces, and the most inspiring of houses and homes.",
  },
  {
    image: {
      src: "/assets/editions/tsuki-hero.png",
      alt: "Umah Tsuki's black-clad cantilevered volume seen through the surrounding tree canopy",
    },
    date: "11/22/24",
    title: "Design Anthology 39",
    description:
      "We are so pleased for our Tsuki Edition be featured in the September 2024 Edition of Design Anthology, the premier English-language interiors, design, architecture and urban living magazine.",
  },
];

/**
 * Two article cards (Figma node 205:588): a wider main card and a
 * narrower side card, same 790/403 proportions as EditionSpotlight's
 * row -- but with an article-card layout (date, title, description,
 * "Read more"), not a photo caption, so it gets its own scoped classes.
 */
export default function PublicationsGrid() {
  return (
    <section className="publications">
      <ScrollFade className="publications__row">
        {PUBLICATIONS.map((pub, i) => (
          <article
            className={`publications__card${i === 0 ? " publications__card--main" : " publications__card--side"}`}
            key={pub.title}
          >
            <div className="publications__card-image">
              <Image
                src={pub.image.src}
                alt={pub.image.alt}
                fill
                sizes={i === 0 ? "(min-width: 900px) 790px, 100vw" : "(min-width: 900px) 403px, 100vw"}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="publications__card-body">
              <div className="publications__card-meta">
                <p className="publications__card-date">{pub.date}</p>
                <div className="publications__card-heading">
                  <h3 className="publications__card-title">{pub.title}</h3>
                  <p className="publications__card-description">
                    {pub.description}
                  </p>
                </div>
              </div>
              {/* Figma shows this as plain text, not a link -- these
                  publications have no article page on this site yet. */}
              <p className="publications__card-link">Read more</p>
            </div>
          </article>
        ))}
      </ScrollFade>
    </section>
  );
}
