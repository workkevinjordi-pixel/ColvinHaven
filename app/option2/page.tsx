import type { Metadata } from "next";
import Image from "next/image";
import Option2Navbar from "@/components/option2/Option2Navbar";
import Option2Shell from "@/components/option2/Option2Shell";
import ParallaxMedia from "@/components/option2/ParallaxMedia";
import Reveal from "@/components/option2/Reveal";
import { Brand, MiniNav } from "@/components/option2/parts";

export const metadata: Metadata = {
  title: "Colvin Haven — Option 2",
  description: "Alternate layout direction for the Colvin Haven site.",
};

export default function Option2Page() {
  return (
    <main className="opt2">
      <Option2Navbar />
      {/* Option2Shell renders the hero (fixed, parallax) + a spacer, then
          wraps everything below it so the Philosophy section rises up and
          covers the hero on scroll. */}
      <Option2Shell>
        {/* ---------- Philosophy ---------- */}
        <section className="opt2-section opt2-philosophy">
          <Reveal>
            <div className="opt2-eyebrow-block opt2-eyebrow-block--center">
              <p className="opt2-eyebrow">A way of life</p>
              <h2 className="opt2-heading">The philosophy</h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="opt2-prose opt2-prose--center">
              <p>
                Before anything else, we plant the trees. By the time you
                arrive, the land has already had years to settle — which is why
                your system does too, the moment you walk in.
              </p>
              <p>
                Nature, close enough to touch. No sound that doesn&rsquo;t
                belong here — water, wind, birdsong, and nothing manufactured
                underneath it. Timber and stone chosen not for how they
                photograph, but for how they feel under a hand — warm, familiar,
                closer to a held object than a building material. A wellness
                practice waiting whenever you want it, or none of it at all — a
                chair, good light, a book, and nowhere you need to be.
              </p>
              <p className="opt2-prose__accent">
                This is not a home you visit. It is a state you return to.
              </p>
            </div>
          </Reveal>

          <div className="opt2-triptych">
            <div className="opt2-triptych__img opt2-triptych__img--side">
              <ParallaxMedia strength={22}>
                <Image
                  src="/assets/option2/philosophy-1.png"
                  alt="Charred-timber cladding beside a round window"
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
              </ParallaxMedia>
            </div>
            <div className="opt2-triptych__img opt2-triptych__img--center">
              <ParallaxMedia strength={30}>
                <Image
                  src="/assets/option2/philosophy-2.png"
                  alt="Black-clad pavilion set among trees"
                  fill
                  sizes="(max-width: 900px) 100vw, 40vw"
                />
              </ParallaxMedia>
            </div>
            <div className="opt2-triptych__img opt2-triptych__img--side">
              <ParallaxMedia strength={22}>
                <Image
                  src="/assets/option2/philosophy-3.jpg"
                  alt="Timber bench on a cantilevered deck over the garden"
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
              </ParallaxMedia>
            </div>
          </div>
        </section>

        {/* ---------- Inspiration ---------- */}
        <section className="opt2-section opt2-inspiration">
          <Reveal>
            <div className="opt2-eyebrow-block">
              <p className="opt2-eyebrow">Inspiration</p>
              <h2 className="opt2-heading opt2-heading--wide">
                Nature never rushes. Limited edition homes, where silence is
                luxury.
              </h2>
            </div>
          </Reveal>
          <div className="opt2-inspiration__row">
            <Reveal className="opt2-inspiration__caption-wrap" delay={120}>
              <p className="opt2-inspiration__caption">
                These landmark residences that made it to the Collection are the
                finest selection of excellence in craft.
              </p>
            </Reveal>
            <div className="opt2-inspiration__img">
              <ParallaxMedia strength={30}>
                <Image
                  src="/assets/option2/inspiration.jpg"
                  alt="Pool deck framed by tropical garden"
                  fill
                  sizes="(max-width: 900px) 100vw, 64vw"
                />
              </ParallaxMedia>
            </div>
          </div>
        </section>

        {/* ---------- Editions ---------- */}
        <section id="editions" className="opt2-section opt2-editions">
          <Reveal>
            <div className="opt2-eyebrow-block opt2-eyebrow-block--center">
              <p className="opt2-eyebrow">Beyond every building</p>
              <h2 className="opt2-heading">The editions</h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="opt2-prose opt2-prose--center">
              Colvin Haven doesn&rsquo;t design a home and then have it built.
              The two happen together, craftsman and founder, on site, for as
              long as each home takes. We offer a limited turnkey home to our
              clients.
            </p>
          </Reveal>
          <div className="opt2-editions__pair">
            <div className="opt2-editions__img">
              <ParallaxMedia strength={32}>
                <Image
                  src="/assets/option2/editions-1.png"
                  alt="Charred-timber home reached by a stone path"
                  fill
                  sizes="(max-width: 900px) 100vw, 45vw"
                />
              </ParallaxMedia>
            </div>
            <div className="opt2-editions__img">
              <ParallaxMedia strength={32}>
                <Image
                  src="/assets/option2/editions-2.jpg"
                  alt="Black-and-white photograph of the build in progress"
                  fill
                  sizes="(max-width: 900px) 100vw, 45vw"
                />
              </ParallaxMedia>
            </div>
          </div>
        </section>

        {/* ---------- Quotes ---------- */}
        <section id="collective" className="opt2-quotes">
          <div className="opt2-quotes__media">
            <ParallaxMedia strength={40}>
              <Image
                src="/assets/option2/quotes.jpg"
                alt="Daybed on a timber deck against a black wall"
                fill
                sizes="(max-width: 900px) 100vw, 52vw"
              />
            </ParallaxMedia>
          </div>
          <div className="opt2-quotes__body">
            <Reveal axis="x" className="opt2-quotes__drawing">
              {/* Plain <img>: it's a decorative inline SVG that next/image
                  would only pass through anyway. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/option2/drawing.svg"
                alt="Line drawing of the residences stepping down the hillside"
                width={616}
                height={332}
              />
            </Reveal>
            <Reveal className="opt2-quotes__text-wrap" delay={120}>
              <p className="opt2-quotes__text">
                Inside, every space serves your wellbeing. Yoga deck open to the
                canopy. A training area that flows to the pool. Biohacking spa.
                Meditation gardens. Gathering spaces that hold the people you
                love. All of it woven seamlessly into the land — so the boundary
                between inside and outside dissolves entirely. It&rsquo;s the
                same core, in every CH home.&rdquo;
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---------- CTA & Footer ---------- */}
        <section id="inquiry" className="opt2-cta">
          {/* Same photo as the hero; the matching parallax drift ties the
              two ends of the page together. */}
          <ParallaxMedia className="opt2-cta__bgwrap" strength={46}>
            <Image
              src="/assets/option2/hero-bg.jpg"
              alt=""
              fill
              sizes="100vw"
            />
          </ParallaxMedia>
          <div className="opt2-cta__overlay" />
          <div className="opt2-cta__panel">
            <Reveal>
              <p className="opt2-cta__text">
                We work with a select number of clients each year. Those who
                find us, were meant to.
              </p>
            </Reveal>
            <a href="#inquiry" className="opt2-btn opt2-btn--light">
              Inquiry
            </a>
          </div>
          <footer className="opt2-footer">
            <Brand className="opt2-footer__brand" />
            <MiniNav className="opt2-footer__nav" />
          </footer>
        </section>
      </Option2Shell>
    </main>
  );
}
