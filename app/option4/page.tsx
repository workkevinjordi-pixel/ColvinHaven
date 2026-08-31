import type { Metadata } from "next";
import Image from "next/image";
import Opt4Nav from "@/components/option4/Opt4Nav";
import Opt4Reveal from "@/components/option4/Opt4Reveal";
import Opt4Plan from "@/components/option4/Opt4Plan";
import { Opt4Wordmark, Opt4Eyebrow } from "@/components/option4/parts";

export const metadata: Metadata = {
  title: "Colvin Haven — Option 4",
  description:
    "Alternate layout direction for the Colvin Haven site — an Aman-style resort editorial.",
};

// Same two editions as the main site's gallery.
const EDITIONS = [
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

export default function Option4Page() {
  return (
    <main className="opt4">
      <Opt4Nav />

      {/* ---------- Hero ---------- */}
      <header className="opt4-hero" id="top">
        <div className="opt4-hero__media">
          <Image
            src="/assets/hero-bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="opt4-hero__scrim" />
        <div className="opt4-hero__inner">
          <Opt4Wordmark className="opt4-hero__brand" light dotSize={44} />
          <p className="opt4-hero__tagline">Wellness Architecture &amp; Design</p>
        </div>
        <a href="#way-of-life" className="opt4-hero__scroll">
          Scroll for more
        </a>
      </header>

      {/* ---------- Opening statement ---------- */}
      <section className="opt4-statement" id="way-of-life">
        <Opt4Reveal>
          <Opt4Eyebrow>A Way of Life</Opt4Eyebrow>
          <p className="opt4-statement__lead">
            Before anything else, we plant the trees. By the time you arrive,
            the land has already had years to settle — which is why your system
            does too, the moment you walk in.
          </p>
        </Opt4Reveal>
      </section>

      {/* ---------- Silence / Luxury ---------- */}
      <section className="opt4-duo">
        <div className="opt4-duo__media">
          <Image
            src="/assets/feature-1-koi-pond-crop.jpg"
            alt="Koi pond framed by ferns and stone"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <span className="opt4-duo__word opt4-duo__word--a">Silence</span>
        <span className="opt4-duo__word opt4-duo__word--b">Luxury</span>
      </section>

      {/* ---------- Guiding values ---------- */}
      <section className="opt4-values" id="collective">
        <div className="opt4-values__media">
          <Opt4Reveal>
            <Image
              src="/assets/feature-2-cabin-crop.jpg"
              alt="Black-clad cabin deck with bench overlooking the pond"
              width={1120}
              height={796}
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ width: "100%", height: "auto" }}
            />
          </Opt4Reveal>
        </div>
        <div className="opt4-values__text">
          <Opt4Reveal delay={80}>
            <Opt4Eyebrow>Our Guiding Values</Opt4Eyebrow>
            <p>
              Nature, close enough to touch. No sound that doesn&apos;t belong
              here — water, wind, birdsong, and nothing manufactured underneath
              it. Timber and stone chosen not for how they photograph, but for
              how they feel under a hand — warm, familiar, closer to a held
              object than a building material. A wellness practice waiting
              whenever you want it, or none of it at all — a chair, good light, a
              book, and nowhere you need to be.
            </p>
            <p className="opt4-values__close">
              This is not a home you visit. It is a state you return to.
            </p>
          </Opt4Reveal>
        </div>
      </section>

      {/* ---------- The land (line drawing) ---------- */}
      <section className="opt4-land">
        <Opt4Reveal>
          <Opt4Eyebrow>The Land</Opt4Eyebrow>
        </Opt4Reveal>
        <Opt4Plan />
      </section>

      {/* ---------- Editions ---------- */}
      <section className="opt4-editions" id="editions">
        <Opt4Reveal>
          <Opt4Eyebrow>Beyond the Every Building</Opt4Eyebrow>
          <h2 className="opt4-editions__heading">Our Edition</h2>
          <p className="opt4-editions__intro">
            Restraint learned by hand, materials sourced from the ground they sit
            on, a kitchen at the center because that is where a life actually
            happens. What changes is the canvas. Two editions exist so far, each
            written in the same quiet dialect but at a different scale. Two more
            are already taking form. What comes after that, we are not saying
            yet.
          </p>
        </Opt4Reveal>

        <div className="opt4-editions__strip">
          {EDITIONS.map((e) => (
            <figure key={e.title} className="opt4-edition">
              <div className="opt4-edition__media">
                <Image
                  src={e.src}
                  alt={e.alt}
                  fill
                  sizes="(max-width: 900px) 86vw, 46vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <figcaption className="opt4-edition__caption">
                <span className="opt4-edition__title">{e.title}</span>
                <span className="opt4-edition__location">{e.location}</span>
                <span className="opt4-edition__meta">{e.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <a href="#editions" className="opt4-textlink">
          All editions
        </a>
      </section>

      {/* ---------- Quote ---------- */}
      <section className="opt4-quote">
        <div className="opt4-quote__media">
          <Image
            src="/assets/feature-3-pool.jpg"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="opt4-quote__scrim" />
        <Opt4Reveal className="opt4-quote__inner">
          <span className="opt4-quote__mark" aria-hidden="true">
            &ldquo;
          </span>
          <blockquote className="opt4-quote__text">
            Inside, every space serves your wellbeing. Yoga deck open to the
            canopy. A training area that flows to the pool. Biohacking spa.
            Meditation gardens. Gathering spaces that hold the people you love.
            All of it woven seamlessly into the land — so the boundary between
            inside and outside dissolves entirely. It&apos;s the same core, in
            every CH home.&rdquo;
          </blockquote>
        </Opt4Reveal>
      </section>

      {/* ---------- Enquire ---------- */}
      <section className="opt4-cta" id="inquiry">
        <div className="opt4-cta__media">
          <Image
            src="/assets/hero-bg.png"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="opt4-cta__scrim" />
        <Opt4Reveal className="opt4-cta__inner">
          <p className="opt4-cta__text">
            We work with a select number of clients each year. Those who find us,
            were meant to.
          </p>
          <a href="#inquiry" className="opt4-cta__button">
            Inquiry
          </a>
        </Opt4Reveal>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="opt4-footer">
        <Opt4Wordmark className="opt4-footer__brand" dotSize={26} />
        <nav className="opt4-footer__nav">
          <a href="#editions">Editions</a>
          <a href="#collective">Collective</a>
        </nav>
      </footer>
    </main>
  );
}
