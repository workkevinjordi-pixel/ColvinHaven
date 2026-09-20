"use client";

import Image from "next/image";

type Publication = {
  date: string;
  title: string;
  paragraphs: string[];
  readMoreHref: string;
  coverSrc: string;
  coverAlt: string;
  coverWidth: number;
  coverHeight: number;
};

const PUBLICATIONS: Publication[] = [
  {
    date: "11/22/24",
    title: "Wallpaper*",
    paragraphs: [
      "We are so pleased for our flagship home, Umah Tsuki, to be featured on Wallpaper.com. Wallpaper* is the global design authority, leading the way in architecture, design, art, entertaining, beauty & grooming, transport, technology, fashion, and watches & jewellery. The article, helmed by Ellie Stathaki, Architecture & Environment Director and writer Natasha Levy is featured in the Architectural Section of the website, which showcases the best of residential and non-commercial living spaces, and the most inspiring of houses and homes.",
      "“I wanted to create a sanctuary’ – discover a nature-conscious take on Balinese architecture",
      "Umah Tsuki, the family home for Andrew Swallow, his wife, and their young daughter, sits perched above a verdant, sloping plot in the Balinese village of Tumbak Bayuh",
    ],
    readMoreHref:
      "https://www.wallpaper.com/architecture/residential/umah-tsuki-colvin-haven-bali-indonesia",
    coverSrc: "/assets/collective/publications/wallpaper-cover.png",
    coverAlt: "Wallpaper* magazine cover featuring Umah Tsuki",
    coverWidth: 542,
    coverHeight: 767,
  },
  {
    date: "8/30/24",
    title: "Design Anthology 39",
    paragraphs: [
      "We are so pleased for our Tsuki Edition to be featured in the September 2024 Edition of Design Anthology, the premier English-language interiors, design, architecture and urban living magazine.",
      "The issue, helmed by editors-in-chief Simone Schultz and Jeremy Smart, delivers a global tour of the most interesting new design, style, travel, art and architecture stories from Asia Pacific and beyond.",
      "“An Island Haven in Bali’s Tumbak Bayuh",
      "In verdant Tumbak Bayuh, former chef Andrew Swallow’s first foray into design privileges simplicity and refinement….",
    ],
    readMoreHref: "https://design-anthology.com/story/issue-39/home/bali",
    coverSrc: "/assets/collective/publications/design-anthology-cover.png",
    coverAlt: "Design Anthology issue 39 cover",
    coverWidth: 542,
    coverHeight: 767,
  },
];

function PublicationSlide({ pub }: { pub: Publication }) {
  return (
    <div className="collective-publications__slide">
      <div className="collective-publications__cover">
        <Image
          src={pub.coverSrc}
          alt={pub.coverAlt}
          width={pub.coverWidth}
          height={pub.coverHeight}
          sizes="(min-width: 900px) 400px, 55vw"
          className="collective-publications__cover-img"
        />
      </div>
      <div className="collective-publications__body">
        <p className="collective-publications__date">{pub.date}</p>
        <h3 className="collective-publications__title">{pub.title}</h3>
        <div className="collective-publications__text">
          {pub.paragraphs.map((p, j) => (
            <p key={j}>{p}</p>
          ))}
        </div>
        <a
          href={pub.readMoreHref}
          target="_blank"
          rel="noopener noreferrer"
          className="collective-publications__link"
        >
          Read more
        </a>
      </div>
    </div>
  );
}

/**
 * Two publication mentions (Figma node 222:4394), one full viewport of
 * space each, stacked in plain normal document flow -- no scroll-jacked
 * pin, no scroll-triggered animation, just a static section.
 */
export default function Publications() {
  return (
    <section className="collective-publications">
      <div className="collective-publications__intro">
        <h2 className="section-heading">Publications</h2>
        <hr className="values__divider" />
      </div>
      {PUBLICATIONS.map((pub) => (
        <PublicationSlide key={pub.title} pub={pub} />
      ))}
    </section>
  );
}
