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
  tall?: boolean;
};

// Left column, top-aligned: two square cards then one tall one (Figma
// node 274:11573, frames 250:7805/7812/11558).
const leftColumn: Card[] = [
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
  {
    src: "/assets/feature-1-koi-pond-crop.jpg",
    alt: "A koi pond bordered by ferns and stone, reflecting the garden above",
    title: "Umah Tsuki",
    location: "Pererenan, Bali",
    meta: "Residential • 2024",
    tall: true,
  },
];

// Right column, offset down from the left (frames 250:7819/11565) --
// the stagger is what makes this read as a two-column masonry rather
// than two independent lists.
const rightColumn: Card[] = [
  {
    src: "/assets/gallery.png",
    alt: "Umah Tsuki courtyard",
    title: "Umah Tsuki",
    location: "Pererenan, Bali",
    meta: "Residential • 2024",
    tall: true,
  },
  {
    src: "/assets/feature-2-cabin-crop.jpg",
    alt: "A wooden bench on a black-clad deck beneath the tree canopy",
    title: "Umah Sora",
    location: "Pererenan, Bali",
    meta: "Residential • 2024",
  },
];

function ProjectCard({ card }: { card: Card }) {
  return (
    <article
      className={`gallery__card${card.tall ? " gallery__card--tall" : ""}`}
      tabIndex={0}
    >
      <div className="gallery__card-media">
        <Image
          src={card.src}
          alt={card.alt}
          fill
          sizes="(min-width: 900px) 45vw, 100vw"
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

function GalleryColumn({
  cards,
  secondary,
  sectionRef,
}: {
  cards: Card[];
  secondary?: boolean;
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  return (
    <div className={`gallery__col${secondary ? " gallery__col--right" : ""}`}>
      {cards.map((card, i) => (
        <ParallaxLayer
          key={card.title + card.src}
          sectionRef={sectionRef}
          strength={i % 2 === 0 ? 35 : -35}
          className="gallery__col-item"
        >
          <ProjectCard card={card} />
        </ParallaxLayer>
      ))}
    </div>
  );
}

// Figma (node 274:11573) replaces the earlier stack/feature/stack
// arrangement with a genuine two-column masonry: five cards total,
// three in the left column (top-aligned), two in the right (offset
// down to create the staggered look).
export default function Option8Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section className="gallery" id="editions" ref={sectionRef}>
      <div className="gallery__grid">
        <GalleryColumn cards={leftColumn} sectionRef={sectionRef} />
        <GalleryColumn cards={rightColumn} secondary sectionRef={sectionRef} />
      </div>
    </section>
  );
}
