import type { Metadata } from "next";
import Image from "next/image";
import Opt6Nav from "@/components/option6/Opt6Nav";
import Opt6Reveal from "@/components/option6/Opt6Reveal";
import Opt6Plan from "@/components/option6/Opt6Plan";
import Opt6EnquiryBar from "@/components/option6/Opt6EnquiryBar";
import { Opt6Wordmark, Opt6Eyebrow } from "@/components/option6/parts";

export const metadata: Metadata = {
  title: "Colvin Haven — Option 6",
  description:
    "Alternate layout direction for the Colvin Haven site — a luxury-hospitality register.",
};

// The two named editions from the main site's Gallery.
const EDITIONS = [
  {
    src: "/assets/gallery.png",
    alt: "Umah Tsuki courtyard",
    title: "Umah Tsuki",
    location: "Pererenan, Bali",
    meta: "Residential — 2024",
  },
  {
    src: "/assets/feature-3-pool.jpg",
    alt: "Pool deck framed by tropical garden",
    title: "Umah Sora",
    location: "Pererenan, Bali",
    meta: "Residential — 2024",
  },
];

export default function Option6Page() {
  return (
    <main className="opt6" id="top">
      <Opt6Nav />

      {/* ---------- Hero ---------- */}
      <header className="opt6-hero">
        <div className="opt6-hero__media">
          <Image
            src="/assets/hero-bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="opt6-hero__scrim" />
        <div className="opt6-hero__inner">
          <Opt6Eyebrow className="opt6-hero__eyebrow">
            Wellness Architecture &amp; Design
          </Opt6Eyebrow>
          <h1 className="opt6-hero__headline">Colvin Haven</h1>
          <span className="opt6-hero__flourish" aria-hidden="true" />
        </div>
        <a href="#way" className="opt6-hero__scroll">
          Scroll
        </a>
      </header>

      <div className="opt6-bar-wrap">
        <Opt6EnquiryBar />
      </div>

      {/* ---------- Opening statement ---------- */}
      <section className="opt6-statement" id="way">
        <Opt6Reveal>
          <Opt6Eyebrow>A Way of Life</Opt6Eyebrow>
          <h2 className="opt6-heading">Our Guiding Values</h2>
          <p className="opt6-statement__lead">
            Before anything else, we plant the trees. By the time you arrive, the
            land has already had years to settle — which is why your system does
            too, the moment you walk in.
          </p>
        </Opt6Reveal>
      </section>

      {/* ---------- Values, two-up ---------- */}
      <section className="opt6-values" id="collective">
        <Opt6Reveal className="opt6-values__media">
          <Image
            src="/assets/feature-2-cabin-crop.jpg"
            alt="Black-clad cabin deck with bench overlooking the pond"
            width={1120}
            height={796}
            sizes="(max-width: 900px) 100vw, 52vw"
            style={{ width: "100%", height: "auto" }}
          />
        </Opt6Reveal>
        <Opt6Reveal className="opt6-values__text" delay={80}>
          <p>
            Nature, close enough to touch. No sound that doesn&apos;t belong here
            — water, wind, birdsong, and nothing manufactured underneath it.
            Timber and stone chosen not for how they photograph, but for how they
            feel under a hand — warm, familiar, closer to a held object than a
            building material. A wellness practice waiting whenever you want it,
            or none of it at all — a chair, good light, a book, and nowhere you
            need to be.
          </p>
          <p className="opt6-values__close">
            This is not a home you visit. It is a state you return to.
          </p>
        </Opt6Reveal>
      </section>

      {/* ---------- Silence / Luxury ---------- */}
      <section className="opt6-duo">
        <div className="opt6-duo__media">
          <Image
            src="/assets/feature-1-koi-pond-crop.jpg"
            alt="Koi pond framed by ferns and stone"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="opt6-duo__scrim" />
        <div className="opt6-duo__inner">
          <span className="opt6-duo__word">Silence</span>
          <span className="opt6-duo__rule" aria-hidden="true" />
          <span className="opt6-duo__word">Luxury</span>
        </div>
      </section>

      {/* ---------- The land ---------- */}
      <section className="opt6-land" id="land">
        <Opt6Reveal>
          <Opt6Eyebrow>The Land</Opt6Eyebrow>
        </Opt6Reveal>
        <Opt6Plan />
      </section>

      {/* ---------- Editions ---------- */}
      <section className="opt6-editions" id="editions">
        <Opt6Reveal className="opt6-editions__head">
          <Opt6Eyebrow>Beyond the Every Building</Opt6Eyebrow>
          <h2 className="opt6-heading">Our Edition</h2>
          <p className="opt6-editions__intro">
            Restraint learned by hand, materials sourced from the ground they sit
            on, a kitchen at the center because that is where a life actually
            happens. What changes is the canvas. Two editions exist so far, each
            written in the same quiet dialect but at a different scale. Two more
            are already taking form. What comes after that, we are not saying
            yet.
          </p>
        </Opt6Reveal>

        <div className="opt6-editions__grid">
          {EDITIONS.map((e, i) => (
            <Opt6Reveal key={e.title} className="opt6-card" delay={i * 90}>
              <div className="opt6-card__media">
                <Image
                  src={e.src}
                  alt={e.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 46vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="opt6-card__body">
                <h3 className="opt6-card__title">{e.title}</h3>
                <p className="opt6-card__loc">{e.location}</p>
                <span className="opt6-card__rule" aria-hidden="true" />
                <p className="opt6-card__meta">{e.meta}</p>
                <a href="#editions" className="opt6-card__link">
                  Discover
                </a>
              </div>
            </Opt6Reveal>
          ))}
        </div>

        <a href="#editions" className="opt6-btn">
          All editions
        </a>
      </section>

      {/* ---------- Quote ---------- */}
      <section className="opt6-quote">
        <div className="opt6-quote__media">
          <Image
            src="/assets/project-cabin-deck.jpg"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="opt6-quote__scrim" />
        <Opt6Reveal className="opt6-quote__inner">
          <span className="opt6-quote__mark" aria-hidden="true">
            &ldquo;
          </span>
          <blockquote className="opt6-quote__text">
            Inside, every space serves your wellbeing. Yoga deck open to the
            canopy. A training area that flows to the pool. Biohacking spa.
            Meditation gardens. Gathering spaces that hold the people you love.
            All of it woven seamlessly into the land — so the boundary between
            inside and outside dissolves entirely. It&apos;s the same core, in
            every CH home.
          </blockquote>
        </Opt6Reveal>
      </section>

      {/* ---------- Enquire ---------- */}
      <section className="opt6-cta" id="inquiry">
        <Opt6Reveal className="opt6-cta__inner">
          <Opt6Eyebrow>Enquire</Opt6Eyebrow>
          <p className="opt6-cta__text">
            We work with a select number of clients each year. Those who find us,
            were meant to.
          </p>
          <a href="#inquiry" className="opt6-btn">
            Inquiry
          </a>
        </Opt6Reveal>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="opt6-footer">
        <Opt6Wordmark className="opt6-footer__brand" />
        <span className="opt6-footer__rule" aria-hidden="true" />
        <nav className="opt6-footer__nav">
          <a href="#editions">Editions</a>
          <a href="#collective">Collective</a>
        </nav>
        <small>© {new Date().getFullYear()} Colvin Haven</small>
      </footer>
    </main>
  );
}
