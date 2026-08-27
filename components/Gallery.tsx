"use client";

import { useRef } from "react";
import Image from "next/image";
import ParallaxLayer from "./ParallaxLayer";

type Card = {
  src: string;
  alt: string;
  title: string;
  location: string;
  meta: string;
};

const stackCards: Card[] = [
  {
    src: "/assets/gallery.png",
    alt: "Umah Tsuki exterior at dusk",
    title: "Umah Tsuki",
    location: "Pererenan, Bali",
    meta: "Residential • 2024",
  },
  {
    src: "/assets/guiding-values.png",
    alt: "Timber pavilion with pool",
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

function ProjectCard({ card, tall = false }: { card: Card; tall?: boolean }) {
  return (
    <article className={`gallery__card${tall ? " gallery__card--tall" : ""}`}>
      <div className="gallery__card-media">
        <Image
          src={card.src}
          alt={card.alt}
          fill
          sizes={tall ? "(min-width: 900px) 50vw, 100vw" : "(min-width: 900px) 42vw, 100vw"}
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

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section className="gallery" ref={sectionRef}>
      <div className="gallery__grid">
        <div className="gallery__stack">
          {stackCards.map((card) => (
            <ProjectCard key={card.title + card.src} card={card} />
          ))}
        </div>
        <ParallaxLayer
          sectionRef={sectionRef}
          strength={45}
          className="gallery__feature"
        >
          <ProjectCard card={featureCard} tall />
        </ParallaxLayer>
      </div>
    </section>
  );
}
