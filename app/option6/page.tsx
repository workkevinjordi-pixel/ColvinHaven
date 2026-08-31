import type { Metadata } from "next";
import Image from "next/image";
import Opt6Nav from "@/components/option6/Opt6Nav";
import Opt6Reveal from "@/components/option6/Opt6Reveal";
import Opt6Tilt from "@/components/option6/Opt6Tilt";
import Opt6Plan from "@/components/option6/Opt6Plan";
import { Opt6Wordmark, Opt6Tag, Opt6Marquee } from "@/components/option6/parts";

export const metadata: Metadata = {
  title: "Colvin Haven — Option 6",
  description:
    "Alternate layout direction for the Colvin Haven site — a poster-style collage, rectangular geometry.",
};

// From the main site's Gallery: Umah Tsuki (two frames) and Umah Sora.
const SHOTS = [
  {
    src: "/assets/gallery.png",
    alt: "Umah Tsuki courtyard",
    title: "Umah Tsuki",
    location: "Pererenan, Bali",
    meta: "Residential · 2024",
    base: -3,
  },
  {
    src: "/assets/feature-3-pool.jpg",
    alt: "Pool deck framed by tropical garden",
    title: "Umah Sora",
    location: "Pererenan, Bali",
    meta: "Residential · 2024",
    base: 2.5,
  },
  {
    src: "/assets/project-cabin-deck.jpg",
    alt: "Black-clad cabin deck with bench overlooking the pond",
    title: "Umah Tsuki",
    location: "Pererenan, Bali",
    meta: "Residential · 2024",
    base: -1.5,
  },
];

export default function Option6Page() {
  return (
    <main className="opt6" id="top">
      <Opt6Nav />

      {/* ---------- Hero ---------- */}
      <header className="opt6-hero">
        <div className="opt6-hero__type">
          <Opt6Tag className="opt6-hero__tag">Est. in the trees</Opt6Tag>
          <h1 className="opt6-hero__headline">
            Colvin
            <br />
            Haven
          </h1>
          <p className="opt6-hero__tagline">Wellness Architecture &amp; Design</p>
        </div>
        <Opt6Tilt className="opt6-hero__shot" baseRotate={2.5} rotate={-2}>
          <Image
            src="/assets/hero-bg.png"
            alt="A black-clad house set among planted trees"
            width={1400}
            height={1040}
            priority
            sizes="(max-width: 900px) 92vw, 46vw"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Opt6Tilt>
      </header>

      <Opt6Marquee text="Limited edition homes — where silence is luxury" />

      {/* ---------- Silence / Luxury ---------- */}
      <section className="opt6-duo">
        <span className="opt6-duo__word">Silence</span>
        <span className="opt6-duo__word opt6-duo__word--outline">Luxury</span>
      </section>

      {/* ---------- Guiding values ---------- */}
      <section className="opt6-values" id="collective">
        <Opt6Reveal className="opt6-values__head">
          <Opt6Tag>A Way of Life</Opt6Tag>
          <h2 className="opt6-values__title">Our Guiding Values</h2>
        </Opt6Reveal>
        <div className="opt6-values__body">
          <Opt6Reveal className="opt6-values__text" delay={60}>
            <p>
              Before anything else, we plant the trees. By the time you arrive,
              the land has already had years to settle — which is why your system
              does too, the moment you walk in.
            </p>
            <p>
              Nature, close enough to touch. No sound that doesn&apos;t belong
              here — water, wind, birdsong, and nothing manufactured underneath
              it. Timber and stone chosen not for how they photograph, but for
              how they feel under a hand — warm, familiar, closer to a held
              object than a building material. A wellness practice waiting
              whenever you want it, or none of it at all — a chair, good light, a
              book, and nowhere you need to be.
            </p>
            <p className="opt6-values__punch">
              This is not a home you visit. It is a state you return to.
            </p>
          </Opt6Reveal>
          <Opt6Tilt className="opt6-values__shot" baseRotate={-3} rotate={2}>
            <Image
              src="/assets/feature-2-cabin-crop.jpg"
              alt="Black-clad cabin deck with bench overlooking the pond"
              width={900}
              height={1120}
              sizes="(max-width: 900px) 80vw, 34vw"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Opt6Tilt>
        </div>
      </section>

      {/* ---------- The land (line drawing) ---------- */}
      <section className="opt6-land">
        <Opt6Reveal>
          <Opt6Tag>The Land</Opt6Tag>
        </Opt6Reveal>
        <Opt6Plan />
      </section>

      {/* ---------- Editions ---------- */}
      <section className="opt6-editions" id="editions">
        <Opt6Reveal className="opt6-editions__head">
          <Opt6Tag>Beyond the Every Building</Opt6Tag>
          <h2 className="opt6-editions__title">Our Edition</h2>
          <p className="opt6-editions__intro">
            Restraint learned by hand, materials sourced from the ground they sit
            on, a kitchen at the center because that is where a life actually
            happens. What changes is the canvas. Two editions exist so far, each
            written in the same quiet dialect but at a different scale. Two more
            are already taking form. What comes after that, we are not saying
            yet.
          </p>
        </Opt6Reveal>

        <div className="opt6-collage">
          {SHOTS.map((s, i) => (
            <figure className="opt6-shot" key={s.title + s.src}>
              <Opt6Tilt
                className="opt6-shot__frame"
                baseRotate={s.base}
                rotate={i % 2 === 0 ? 2 : -2}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 900px) 86vw, 40vw"
                  style={{ objectFit: "cover" }}
                />
              </Opt6Tilt>
              <figcaption className="opt6-shot__cap">
                <Opt6Tag>{s.title}</Opt6Tag>
                <span>{s.location}</span>
                <span>{s.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <a href="#editions" className="opt6-btn">
          All editions
        </a>
      </section>

      {/* ---------- Quote ---------- */}
      <section className="opt6-quote">
        <Opt6Reveal>
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
          <h2 className="opt6-cta__text">
            We work with a select number of clients each year. Those who find us,
            were meant to.
          </h2>
          <a href="#inquiry" className="opt6-btn opt6-btn--solid">
            Inquiry
          </a>
        </Opt6Reveal>
      </section>

      <Opt6Marquee text="Colvin Haven — wellness architecture & design" />

      {/* ---------- Footer ---------- */}
      <footer className="opt6-footer">
        <Opt6Wordmark className="opt6-footer__brand" />
        <nav className="opt6-footer__nav">
          <a href="#editions">Editions</a>
          <a href="#collective">Collective</a>
        </nav>
        <small>© {new Date().getFullYear()} Colvin Haven</small>
      </footer>
    </main>
  );
}
