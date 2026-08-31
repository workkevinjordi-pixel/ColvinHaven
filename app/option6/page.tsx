import type { Metadata } from "next";
import Image from "next/image";
import Opt6Nav from "@/components/option6/Opt6Nav";
import Opt6Reveal from "@/components/option6/Opt6Reveal";
import Opt6Plan from "@/components/option6/Opt6Plan";
import { Opt6Wordmark, Opt6Kicker, Opt6Bullet } from "@/components/option6/parts";

export const metadata: Metadata = {
  title: "Colvin Haven — Option 6",
  description:
    "Alternate layout direction for the Colvin Haven site — an Italian-furniture-house register.",
};

// The two named editions from the main site's Gallery.
const EDITIONS = [
  {
    src: "/assets/gallery.png",
    alt: "Umah Tsuki courtyard",
    title: "Umah Tsuki",
    location: "Pererenan, Bali — 2024",
  },
  {
    src: "/assets/feature-3-pool.jpg",
    alt: "Pool deck framed by tropical garden",
    title: "Umah Sora",
    location: "Pererenan, Bali — 2024",
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
          <Opt6Kicker className="opt6-hero__kicker">
            Colvin Haven — Wellness Architecture &amp; Design
          </Opt6Kicker>
          <p className="opt6-hero__phrase">
            This is not a home you visit.
            <br />
            It is a state you return to.
          </p>
        </div>
      </header>

      {/* ---------- Opening statement ---------- */}
      <section className="opt6-intro" id="collective">
        <Opt6Reveal>
          <Opt6Kicker>A Way of Life</Opt6Kicker>
          <p className="opt6-intro__phrase">
            Before anything else, we plant the trees.
          </p>
          <p className="opt6-intro__text">
            By the time you arrive, the land has already had years to settle —
            which is why your system does too, the moment you walk in.
          </p>
        </Opt6Reveal>
      </section>

      {/* ---------- Wide image ---------- */}
      <section className="opt6-band">
        <Image
          src="/assets/project-cabin-deck.jpg"
          alt="Black-clad cabin deck with bench overlooking the pond"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </section>

      {/* ---------- Guiding values ---------- */}
      <section className="opt6-values">
        <Opt6Reveal className="opt6-values__inner">
          <Opt6Kicker>Guiding Values</Opt6Kicker>
          <div className="opt6-values__cols">
            <p>
              Nature, close enough to touch. No sound that doesn&apos;t belong
              here — water, wind, birdsong, and nothing manufactured underneath
              it. Timber and stone chosen not for how they photograph, but for
              how they feel under a hand — warm, familiar, closer to a held
              object than a building material.
            </p>
            <p>
              A wellness practice waiting whenever you want it, or none of it at
              all — a chair, good light, a book, and nowhere you need to be. This
              is not a home you visit. It is a state you return to.
            </p>
          </div>
        </Opt6Reveal>
      </section>

      {/* ---------- Silence / Luxury ---------- */}
      <section className="opt6-silence" id="silence">
        <div className="opt6-silence__media">
          <Image
            src="/assets/feature-1-koi-pond-crop.jpg"
            alt="Koi pond framed by ferns and stone"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="opt6-silence__scrim" />
        <p className="opt6-silence__words">
          <span>Silence</span>
          <span>Luxury</span>
        </p>
      </section>

      {/* ---------- The Land ---------- */}
      <section className="opt6-land" id="land">
        <Opt6Reveal>
          <Opt6Kicker>The Land</Opt6Kicker>
        </Opt6Reveal>
        <Opt6Plan />
      </section>

      {/* ---------- Editions ---------- */}
      <section className="opt6-editions" id="editions">
        <Opt6Reveal className="opt6-editions__head">
          <Opt6Kicker>Beyond the Every Building</Opt6Kicker>
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

        <div className="opt6-editions__grid">
          {EDITIONS.map((e, i) => (
            <Opt6Reveal key={e.title} className="opt6-cat" delay={i * 70}>
              <figure>
                <div className="opt6-cat__media">
                  <Image
                    src={e.src}
                    alt={e.alt}
                    fill
                    sizes="(min-width: 900px) 48vw, 100vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <figcaption className="opt6-cat__cap">
                  <span className="opt6-cat__title">{e.title}</span>
                  <span className="opt6-cat__loc">{e.location}</span>
                </figcaption>
              </figure>
            </Opt6Reveal>
          ))}
        </div>

        <Opt6Bullet href="#editions" className="opt6-editions__all">
          All editions
        </Opt6Bullet>
      </section>

      {/* ---------- Quote ---------- */}
      <section className="opt6-quote">
        <Opt6Reveal>
          <Opt6Kicker>In Their Words</Opt6Kicker>
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
        <Opt6Reveal>
          <Opt6Kicker>Enquire</Opt6Kicker>
          <p className="opt6-cta__phrase">Those who find us, were meant to.</p>
          <p className="opt6-cta__text">
            We work with a select number of clients each year.
          </p>
          <Opt6Bullet href="#inquiry" className="opt6-cta__link">
            Begin an enquiry
          </Opt6Bullet>
        </Opt6Reveal>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="opt6-footer">
        <div className="opt6-footer__top">
          <div className="opt6-footer__col opt6-footer__col--wide">
            <Opt6Wordmark className="opt6-footer__brand" />
            <p className="opt6-footer__note">
              A studio taking a handful of clients each year. The true luxury is
              a state you return to.
            </p>
          </div>
          <div className="opt6-footer__col">
            <p className="opt6-footer__label">Newsletter</p>
            <div className="opt6-footer__news">
              <input
                type="email"
                placeholder="Your email"
                aria-label="Your email"
              />
              <Opt6Bullet href="#inquiry">Subscribe</Opt6Bullet>
            </div>
          </div>
          <div className="opt6-footer__col">
            <p className="opt6-footer__label">Studio</p>
            <p className="opt6-footer__line">Pererenan, Bali</p>
            <Opt6Bullet href="#inquiry">View on map</Opt6Bullet>
          </div>
          <div className="opt6-footer__col">
            <p className="opt6-footer__label">Follow</p>
            <Opt6Bullet href="#inquiry">Instagram</Opt6Bullet>
            <Opt6Bullet href="#inquiry">LinkedIn</Opt6Bullet>
          </div>
        </div>
        <div className="opt6-footer__base">
          <small>© {new Date().getFullYear()} Colvin Haven</small>
          <nav className="opt6-footer__legal">
            <a href="#top">Privacy</a>
            <a href="#top">Cookies</a>
            <a href="#top">Credits</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
