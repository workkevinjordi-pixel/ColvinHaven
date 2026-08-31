import type { Metadata } from "next";
import Image from "next/image";
import Opt5Nav from "@/components/option5/Opt5Nav";
import Opt5Reveal from "@/components/option5/Opt5Reveal";
import Opt5Plan from "@/components/option5/Opt5Plan";
import { Opt5Wordmark, Opt5Eyebrow } from "@/components/option5/parts";

export const metadata: Metadata = {
  title: "Colvin Haven — Option 5",
  description:
    "Alternate layout direction for the Colvin Haven site — a Scandinavian-minimal index.",
};

// From the main site's Gallery: two named editions (Umah Tsuki has two
// frames — the courtyard feature and the deck).
const TILES = [
  {
    src: "/assets/gallery.png",
    alt: "Umah Tsuki courtyard",
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
    src: "/assets/project-cabin-deck.jpg",
    alt: "Black-clad cabin deck with bench overlooking the pond",
    title: "Umah Tsuki",
    location: "Pererenan, Bali",
    meta: "Residential • 2024",
  },
];

export default function Option5Page() {
  return (
    <main className="opt5" id="top">
      <Opt5Nav />

      {/* ---------- Hero ---------- */}
      <header className="opt5-hero">
        <div className="opt5-hero__img">
          <Image
            src="/assets/hero-bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <p className="opt5-hero__cap">
          Colvin Haven
          <br />
          Wellness Architecture &amp; Design
        </p>
      </header>

      {/* ---------- Index / Editions ---------- */}
      <section className="opt5-index" id="editions">
        <Opt5Reveal className="opt5-index__head">
          <Opt5Eyebrow>Beyond the Every Building</Opt5Eyebrow>
          <h1 className="opt5-index__title">Our Edition</h1>
          <p className="opt5-index__intro">
            Restraint learned by hand, materials sourced from the ground they sit
            on, a kitchen at the center because that is where a life actually
            happens. What changes is the canvas. Two editions exist so far, each
            written in the same quiet dialect but at a different scale. Two more
            are already taking form. What comes after that, we are not saying
            yet.
          </p>
        </Opt5Reveal>

        <div className="opt5-grid">
          {TILES.map((t, i) => (
            <Opt5Reveal
              key={t.title + t.src}
              className="opt5-tile"
              delay={i * 60}
            >
              <figure>
                <div className="opt5-tile__media">
                  <Image
                    src={t.src}
                    alt={t.alt}
                    fill
                    sizes="(max-width: 700px) 100vw, 46vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <figcaption className="opt5-tile__cap">
                  <span className="opt5-tile__title">{t.title}</span>
                  <span className="opt5-tile__loc">{t.location}</span>
                  <span className="opt5-tile__meta">{t.meta}</span>
                </figcaption>
              </figure>
            </Opt5Reveal>
          ))}
        </div>

        <a href="#editions" className="opt5-textlink">
          All editions
        </a>
      </section>

      {/* ---------- Statement / Guiding values ---------- */}
      <section className="opt5-statement" id="collective">
        <div className="opt5-statement__inner">
          <div className="opt5-statement__rail">
            <Opt5Eyebrow>A Way of Life</Opt5Eyebrow>
          </div>
          <Opt5Reveal className="opt5-statement__body">
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
            <p>This is not a home you visit. It is a state you return to.</p>
          </Opt5Reveal>
        </div>
      </section>

      {/* ---------- Full-bleed image ---------- */}
      <section className="opt5-band">
        <Image
          src="/assets/feature-2-cabin-crop.jpg"
          alt="Black-clad cabin deck with bench overlooking the pond"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </section>

      {/* ---------- Silence / Luxury ---------- */}
      <section className="opt5-duo">
        <Opt5Reveal>
          <p className="opt5-duo__words">
            <span>Silence</span>
            <span>Luxury</span>
          </p>
        </Opt5Reveal>
      </section>

      {/* ---------- The land (line drawing) ---------- */}
      <section className="opt5-plan-sec">
        <Opt5Reveal>
          <Opt5Eyebrow>The Land</Opt5Eyebrow>
        </Opt5Reveal>
        <Opt5Plan />
      </section>

      {/* ---------- Quote ---------- */}
      <section className="opt5-quote">
        <Opt5Reveal>
          <blockquote className="opt5-quote__text">
            Inside, every space serves your wellbeing. Yoga deck open to the
            canopy. A training area that flows to the pool. Biohacking spa.
            Meditation gardens. Gathering spaces that hold the people you love.
            All of it woven seamlessly into the land — so the boundary between
            inside and outside dissolves entirely. It&apos;s the same core, in
            every CH home.
          </blockquote>
        </Opt5Reveal>
      </section>

      {/* ---------- Enquire ---------- */}
      <section className="opt5-enquire" id="inquiry">
        <div className="opt5-enquire__inner">
          <div className="opt5-enquire__rail">
            <Opt5Eyebrow>Enquire</Opt5Eyebrow>
          </div>
          <Opt5Reveal className="opt5-enquire__body">
            <p className="opt5-enquire__text">
              We work with a select number of clients each year. Those who find
              us, were meant to.
            </p>
            <a href="#inquiry" className="opt5-textlink">
              Inquiry
            </a>
          </Opt5Reveal>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="opt5-footer">
        <Opt5Wordmark className="opt5-footer__brand" />
        <nav className="opt5-footer__nav">
          <a href="#editions">Editions</a>
          <a href="#collective">Collective</a>
        </nav>
        <small>© {new Date().getFullYear()} Colvin Haven</small>
      </footer>
    </main>
  );
}
