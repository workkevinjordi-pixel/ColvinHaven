"use client";

import { useRef } from "react";
import Image from "next/image";
import ParallaxLayer from "./ParallaxLayer";
import ScrollFade from "./ScrollFade";

type Card = {
  src: string;
  alt: string;
  title: string;
  location: string;
  meta: string;
};

const stackCards: Card[] = [
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
      {/* Reuses the guiding-values section's exact heading/divider/tag/text
          classes -- same structure, different copy, per request. */}
      <ScrollFade>
        <h2 className="values__heading">Our Edition</h2>
        <hr className="values__divider" />
        <div className="values__body gallery__intro">
          <div className="values__aside">
            <div className="values__tag">
              <span className="values__dot" />
              <span>BEYOND THE EVERY BUILDING</span>
            </div>
          </div>
          <div className="values__text">
            <p>
              Restraint learned by hand, materials sourced from the ground
              they sit on, a kitchen at the center because that is where a
              life actually happens. What changes is the canvas. Two
              editions exist so far, each written in the same quiet
              dialect but at a different scale. Two more are already
              taking form. What comes after that, we are not saying yet.
            </p>
            <a href="#editions" className="gallery__link">
              All editions
            </a>
          </div>
        </div>
      </ScrollFade>

      <div className="gallery__grid">
        <div className="gallery__stack">
          {stackCards.map((card, i) => (
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
      </div>
    </section>
  );
}
