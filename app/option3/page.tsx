import type { Metadata } from "next";
import Image from "next/image";
import Opt3Nav from "@/components/option3/Opt3Nav";
import Opt3Reveal from "@/components/option3/Opt3Reveal";
import { Opt3Brand } from "@/components/option3/parts";

export const metadata: Metadata = {
  title: "Colvin Haven — Option 3",
  description:
    "Alternate layout direction for the Colvin Haven site — an editorial index.",
};

// Placeholder catalogue for the ledger, in the spirit of the brand
// (a handful of limited turnkey homes). Design bake-off content only.
const EDITIONS = [
  {
    no: "Edition I",
    name: "The Ridge House",
    place: "Ubud, Bali",
    area: "410 m²",
    status: "In build",
  },
  {
    no: "Edition II",
    name: "Canopy Pavilion",
    place: "Koh Samui, Thailand",
    area: "295 m²",
    status: "Reserved",
  },
  {
    no: "Edition III",
    name: "The Still House",
    place: "Uluwatu, Bali",
    area: "520 m²",
    status: "Enquire",
  },
  {
    no: "Edition IV",
    name: "Longwater Retreat",
    place: "Hòa Bình, Vietnam",
    area: "360 m²",
    status: "Enquire",
  },
];

export default function Option3Page() {
  return (
    <main className="opt3">
      <Opt3Nav />

      {/* ---------- Hero (type first) ---------- */}
      <header className="opt3-hero" id="top">
        <p className="opt3-kicker">Wellness architecture — grown in the trees</p>
        <h1 className="opt3-hero__headline">
          Limited edition homes,
          <br />
          where silence is <em>luxury</em>.
        </h1>
        <div className="opt3-hero__meta">
          <p>
            A small studio building a handful of turnkey homes each year, on
            land planted years before the first wall goes up.
          </p>
          <a href="#inquiry" className="opt3-link">
            Begin an inquiry →
          </a>
        </div>
      </header>

      <div className="opt3-band opt3-band--tall">
        <Image
          src="/assets/option2/hero-bg.jpg"
          alt="A black-clad house set among planted trees"
          fill
          priority
          sizes="100vw"
        />
        <span className="opt3-band__cap">Colvin Haven — the founding site</span>
      </div>

      {/* ---------- 01 Philosophy ---------- */}
      <section id="philosophy" className="opt3-chapter">
        <div className="opt3-chapter__rail">
          <span className="opt3-chapter__no">01</span>
          <span className="opt3-chapter__title">The Philosophy</span>
        </div>
        <div className="opt3-chapter__body">
          <Opt3Reveal>
            <p className="opt3-lead">
              Before anything else, we plant the trees. By the time you arrive,
              the land has already had years to settle — which is why your
              system does too, the moment you walk in.
            </p>
          </Opt3Reveal>
          <Opt3Reveal delay={80}>
            <div className="opt3-columns">
              <p>
                Nature, close enough to touch. No sound that doesn&rsquo;t
                belong here — water, wind, birdsong, and nothing manufactured
                underneath it.
              </p>
              <p>
                Timber and stone chosen not for how they photograph, but for how
                they feel under a hand — warm, familiar, closer to a held object
                than a building material.
              </p>
            </div>
          </Opt3Reveal>
          <Opt3Reveal delay={120}>
            <figure className="opt3-figure">
              <div className="opt3-figure__frame">
                <Image
                  src="/assets/option2/philosophy-1.png"
                  alt="Charred-timber cladding beside a round window"
                  fill
                  sizes="(max-width: 820px) 100vw, 760px"
                />
              </div>
              <figcaption>
                Charred-timber cladding beside a round window.
              </figcaption>
            </figure>
          </Opt3Reveal>
          <Opt3Reveal>
            <p className="opt3-pull">
              This is not a home you visit. It is a state you return to.
            </p>
          </Opt3Reveal>
        </div>
      </section>

      <div className="opt3-band">
        <Image
          src="/assets/option2/philosophy-2.png"
          alt="Black-clad pavilion set among trees"
          fill
          sizes="100vw"
        />
      </div>

      {/* ---------- 02 Inspiration ---------- */}
      <section id="inspiration" className="opt3-chapter">
        <div className="opt3-chapter__rail">
          <span className="opt3-chapter__no">02</span>
          <span className="opt3-chapter__title">Inspiration</span>
        </div>
        <div className="opt3-chapter__body">
          <Opt3Reveal>
            <p className="opt3-lead">
              Nature never rushes. These landmark residences are the finest
              selection of excellence in craft — where the boundary between
              inside and outside is designed to dissolve.
            </p>
          </Opt3Reveal>
          <Opt3Reveal delay={80}>
            <figure className="opt3-figure">
              <div className="opt3-figure__frame opt3-figure__frame--wide">
                <Image
                  src="/assets/option2/inspiration.jpg"
                  alt="Pool deck framed by a tropical garden"
                  fill
                  sizes="(max-width: 820px) 100vw, 760px"
                />
              </div>
              <figcaption>Pool deck framed by tropical garden.</figcaption>
            </figure>
          </Opt3Reveal>
          <Opt3Reveal delay={120}>
            <p className="opt3-pull">
              The finest selection of excellence in craft — landmark residences
              that made it to the Collection.
            </p>
          </Opt3Reveal>
        </div>
      </section>

      {/* ---------- 03 Editions (ledger) ---------- */}
      <section id="editions" className="opt3-chapter opt3-chapter--flush">
        <div className="opt3-chapter__rail">
          <span className="opt3-chapter__no">03</span>
          <span className="opt3-chapter__title">The Editions</span>
        </div>
        <div className="opt3-chapter__body">
          <Opt3Reveal>
            <p className="opt3-lead">
              Colvin Haven doesn&rsquo;t design a home and then have it built.
              The two happen together — craftsman and founder, on site, for as
              long as each home takes.
            </p>
          </Opt3Reveal>
          <Opt3Reveal delay={80}>
            <ol className="opt3-ledger">
              {EDITIONS.map((e) => (
                <li key={e.no} className="opt3-ledger__row">
                  <span className="opt3-ledger__no">{e.no}</span>
                  <span className="opt3-ledger__name">{e.name}</span>
                  <span className="opt3-ledger__place">{e.place}</span>
                  <span className="opt3-ledger__area">{e.area}</span>
                  <span
                    className="opt3-ledger__status"
                    data-status={e.status}
                  >
                    {e.status}
                  </span>
                </li>
              ))}
            </ol>
          </Opt3Reveal>
        </div>
      </section>

      <div className="opt3-band">
        <Image
          src="/assets/option2/editions-1.png"
          alt="Charred-timber home reached by a stone path"
          fill
          sizes="100vw"
        />
      </div>

      {/* ---------- 04 Collective ---------- */}
      <section id="collective" className="opt3-collective">
        <Opt3Reveal>
          <blockquote className="opt3-quote">
            &ldquo;Inside, every space serves your wellbeing. Yoga deck open to
            the canopy. A training area that flows to the pool. Meditation
            gardens. All of it woven seamlessly into the land — the same core,
            in every CH home.&rdquo;
          </blockquote>
        </Opt3Reveal>
        <Opt3Reveal delay={140}>
          {/* Decorative inline SVG — next/image would only pass it through. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="opt3-drawing"
            src="/assets/option2/drawing.svg"
            alt="Line drawing of the residences stepping down the hillside"
            width={616}
            height={332}
          />
        </Opt3Reveal>
      </section>

      {/* ---------- 05 Inquiry + footer ---------- */}
      <section id="inquiry" className="opt3-inquiry">
        <div className="opt3-inquiry__inner">
          <span className="opt3-chapter__no opt3-chapter__no--light">05</span>
          <Opt3Reveal>
            <p className="opt3-inquiry__text">
              We work with a select number of clients each year. Those who find
              us, were meant to.
            </p>
          </Opt3Reveal>
          <a href="#inquiry" className="opt3-btn">
            Begin an inquiry
          </a>
        </div>
        <footer className="opt3-footer">
          <Opt3Brand light />
          <nav className="opt3-footer__nav">
            <a href="#philosophy">Philosophy</a>
            <a href="#editions">Editions</a>
            <a href="#collective">Collective</a>
          </nav>
          <p className="opt3-footer__fine">
            © {new Date().getFullYear()} Colvin Haven
          </p>
        </footer>
      </section>
    </main>
  );
}
