import type { Metadata } from "next";
import Image from "next/image";
import Opt6Nav from "@/components/option6/Opt6Nav";
import Opt6Reveal from "@/components/option6/Opt6Reveal";
import Opt6Plan from "@/components/option6/Opt6Plan";
import { Opt6Label } from "@/components/option6/parts";

export const metadata: Metadata = {
  title: "Colvin Haven — Option 6",
  description:
    "Alternate layout direction for the Colvin Haven site — an architectural catalogue register.",
};

// The two named editions from the main site's Gallery (Umah Tsuki has two
// frames: the courtyard feature and the deck).
const EDITIONS = [
  {
    src: "/assets/gallery.png",
    alt: "Umah Tsuki courtyard",
    title: "Umah Tsuki",
    location: "Pererenan, Bali",
    meta: "Residential, 2024",
  },
  {
    src: "/assets/feature-3-pool.jpg",
    alt: "Pool deck framed by tropical garden",
    title: "Umah Sora",
    location: "Pererenan, Bali",
    meta: "Residential, 2024",
  },
  {
    src: "/assets/project-cabin-deck.jpg",
    alt: "Black-clad cabin deck with bench overlooking the pond",
    title: "Umah Tsuki",
    location: "Pererenan, Bali",
    meta: "Deck, 2024",
  },
];

export default function Option6Page() {
  return (
    <main className="opt6" id="top">
      <Opt6Nav />

      <div className="opt6-main">
        {/* ---------- Hero ---------- */}
        <header className="opt6-hero">
          <div className="opt6-hero__media">
            <Image
              src="/assets/hero-bg.png"
              alt="A black-clad house set among planted trees"
              fill
              priority
              sizes="(min-width: 1024px) calc(100vw - 188px), 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="opt6-hero__row">
            <p className="opt6-hero__cap">
              Colvin Haven — the founding site, Pererenan
            </p>
            <p className="opt6-hero__cap opt6-hero__cap--right">
              Wellness Architecture &amp; Design
            </p>
          </div>
        </header>

        {/* ---------- 01 Guiding Values ---------- */}
        <section className="opt6-block" id="collective">
          <Opt6Label num="01">Guiding Values</Opt6Label>
          <Opt6Reveal className="opt6-block__body">
            <p className="opt6-lead">
              Before anything else, we plant the trees. By the time you arrive,
              the land has already had years to settle — which is why your system
              does too, the moment you walk in.
            </p>
            <div className="opt6-cols">
              <p>
                Nature, close enough to touch. No sound that doesn&apos;t belong
                here — water, wind, birdsong, and nothing manufactured underneath
                it. Timber and stone chosen not for how they photograph, but for
                how they feel under a hand — warm, familiar, closer to a held
                object than a building material.
              </p>
              <p>
                A wellness practice waiting whenever you want it, or none of it at
                all — a chair, good light, a book, and nowhere you need to be.
                This is not a home you visit. It is a state you return to.
              </p>
            </div>
          </Opt6Reveal>
        </section>

        {/* ---------- 02 Editions ---------- */}
        <section className="opt6-block" id="editions">
          <Opt6Label num="02">Editions</Opt6Label>
          <Opt6Reveal className="opt6-block__body">
            <p className="opt6-lead">
              Restraint learned by hand, materials sourced from the ground they
              sit on, a kitchen at the center because that is where a life
              actually happens. What changes is the canvas. Two editions exist so
              far, each written in the same quiet dialect but at a different
              scale. Two more are already taking form. What comes after that, we
              are not saying yet.
            </p>
          </Opt6Reveal>
          <div className="opt6-grid">
            {EDITIONS.map((e, i) => (
              <Opt6Reveal
                key={e.title + e.src}
                className="opt6-item"
                delay={i * 60}
              >
                <figure>
                  <div className="opt6-item__media">
                    <Image
                      src={e.src}
                      alt={e.alt}
                      fill
                      sizes="(min-width: 1024px) 44vw, 100vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <figcaption className="opt6-item__cap">
                    <span>{e.title}</span>
                    <span className="opt6-item__sub">
                      {e.location} — {e.meta}
                    </span>
                  </figcaption>
                </figure>
              </Opt6Reveal>
            ))}
          </div>
          <a href="#editions" className="opt6-textlink">
            All editions →
          </a>
        </section>

        {/* ---------- 03 Silence / Luxury ---------- */}
        <section className="opt6-duo">
          <Opt6Label num="03">Silence / Luxury</Opt6Label>
          <div className="opt6-duo__pair">
            <figure className="opt6-duo__fig">
              <div className="opt6-item__media">
                <Image
                  src="/assets/feature-1-koi-pond-crop.jpg"
                  alt="Koi pond framed by ferns and stone"
                  fill
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <figcaption className="opt6-item__cap">
                <span>Silence</span>
              </figcaption>
            </figure>
            <figure className="opt6-duo__fig">
              <div className="opt6-item__media">
                <Image
                  src="/assets/feature-2-cabin-crop.jpg"
                  alt="Black-clad cabin deck with bench overlooking the pond"
                  fill
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <figcaption className="opt6-item__cap">
                <span>Luxury</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ---------- 04 The Land ---------- */}
        <section className="opt6-block opt6-block--land" id="land">
          <Opt6Label num="04">The Land</Opt6Label>
          <Opt6Plan />
        </section>

        {/* ---------- 05 In Their Words ---------- */}
        <section className="opt6-block">
          <Opt6Label num="05">In Their Words</Opt6Label>
          <Opt6Reveal className="opt6-block__body">
            <blockquote className="opt6-quote">
              Inside, every space serves your wellbeing. Yoga deck open to the
              canopy. A training area that flows to the pool. Biohacking spa.
              Meditation gardens. Gathering spaces that hold the people you love.
              All of it woven seamlessly into the land — so the boundary between
              inside and outside dissolves entirely. It&apos;s the same core, in
              every CH home.
            </blockquote>
          </Opt6Reveal>
        </section>

        {/* ---------- 06 Enquire ---------- */}
        <section className="opt6-block" id="inquiry">
          <Opt6Label num="06">Enquire</Opt6Label>
          <Opt6Reveal className="opt6-block__body">
            <p className="opt6-lead">
              We work with a select number of clients each year. Those who find
              us, were meant to.
            </p>
            <a href="#inquiry" className="opt6-textlink">
              Begin an enquiry →
            </a>
          </Opt6Reveal>
        </section>

        {/* ---------- Footer ---------- */}
        <footer className="opt6-footer">
          <span className="opt6-wordmark">Colvin Haven</span>
          <nav className="opt6-footer__nav">
            <a href="#editions">Editions</a>
            <a href="#collective">Guiding Values</a>
            <a href="#inquiry">Enquire</a>
          </nav>
          <small>© {new Date().getFullYear()} Colvin Haven — Pererenan, Bali</small>
        </footer>
      </div>
    </main>
  );
}
