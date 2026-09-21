"use client";

import { useRef } from "react";
import Image from "next/image";
import ParallaxLayer from "../ParallaxLayer";

type Card = {
  src: string;
  alt: string;
  title: string;
  location: string;
  meta: string;
};

// Left-hand stack, closest to the guiding-values copy above.
const primaryStack: Card[] = [
  {
    src: "/assets/project-cabin-deck.jpg",
    alt: "Black-clad cabin deck with bench overlooking the pond",
    title: "Umah Tsuki",
    location: "Pererenan, Bali",
    meta: "Residential • 2024",
  },
  {
    src: "/assets/feature-3-pool.jpg",
    alt: "Pool deck framed by tropical garden",
    title: "Umah Sora",
    location: "Pererenan, Bali",
    meta: "Residential • 2024",
  },
];

const featureCard: Card = {
  src: "/assets/gallery.png",
  alt: "Umah Tsuki courtyard",
  title: "Umah Tsuki",
  location: "Pererenan, Bali",
  meta: "Residential • 2024",
};

// Right-hand stack, mirroring primaryStack -- brings the grid from three
// cards to five (two previously-unused assets already in public/assets/,
// no new photography needed).
const secondaryStack: Card[] = [
  {
    src: "/assets/feature-1-koi-pond-crop.jpg",
    alt: "A koi pond bordered by ferns and stone, reflecting the garden above",
    title: "Umah Tsuki",
    location: "Pererenan, Bali",
    meta: "Residential • 2024",
  },
  {
    src: "/assets/feature-2-cabin-crop.jpg",
    alt: "A wooden bench on a black-clad deck beneath the tree canopy",
    title: "Umah Sora",
    location: "Pererenan, Bali",
    meta: "Residential • 2024",
  },
];

function ProjectCard({ card, tall = false }: { card: Card; tall?: boolean }) {
  return (
    <article
      className={`gallery__card${tall ? " gallery__card--tall" : ""}`}
      tabIndex={0}
    >
      <div className="gallery__card-media">
        <Image
          src={card.src}
          alt={card.alt}
          fill
          sizes={tall ? "(min-width: 900px) 50vw, 100vw" : "(min-width: 900px) 26vw, 100vw"}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="gallery__caption">
        <p className="gallery__title">{card.title}</p>
        <p className="gallery__location">{card.location}</p>
        <p className="gallery__meta">{card.meta}</p>
      </div>
    </article>
  );
}

// Figma (frames 173:1452-1454) places this grid directly after the guiding
// values paragraph with no heading of its own -- unlike the main site's
// Gallery, which prepends an "Our Edition" intro block.
//
// Five cards, not the original three: a narrow stack of two on each side
// of the tall feature card (stack / feature / stack), keeping the same
// visual language throughout rather than introducing a new grid pattern.
export default function Option8Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section className="gallery" id="editions" ref={sectionRef}>
      <div className="gallery__grid">
        <div className="gallery__stack">
          {primaryStack.map((card, i) => (
            <ParallaxLayer
              key={card.title + card.src}
              sectionRef={sectionRef}
              strength={i === 0 ? 35 : -35}
            >
              <ProjectCard card={card} />
            </ParallaxLayer>
          ))}
        </div>
        <ParallaxLayer
          sectionRef={sectionRef}
          strength={45}
          className="gallery__feature"
        >
          <ProjectCard card={featureCard} tall />
        </ParallaxLayer>
        <div className="gallery__stack gallery__stack--secondary">
          {secondaryStack.map((card, i) => (
            <ParallaxLayer
              key={card.title + card.src}
              sectionRef={sectionRef}
              strength={i === 0 ? -35 : 35}
            >
              <ProjectCard card={card} />
            </ParallaxLayer>
          ))}
        </div>
      </div>
    </section>
  );
}
