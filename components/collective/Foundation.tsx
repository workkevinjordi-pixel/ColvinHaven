import Image from "next/image";
import ScrollFade from "../ScrollFade";

/**
 * "FOUNDATION" section (Figma node 203:329, re-synced against node
 * 250:10541): a two-photo collage on the left, the founder's
 * background story on the right. The collage is two absolutely-
 * positioned, overlapping photos inside a fixed box -- a new pattern
 * on this site, so it gets its own scoped classes rather than reusing
 * gallery/edition-spotlight's single-image layouts.
 */
export default function Foundation() {
  return (
    <section className="foundation">
      <ScrollFade className="foundation__body">
        <div className="foundation__collage">
          <div className="foundation__collage-img foundation__collage-img--a">
            <Image
              src="/assets/collective/foundation-river-stones.jpg"
              alt="River stones and a large boulder against a black timber base"
              fill
              sizes="305px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="foundation__collage-img foundation__collage-img--b">
            <Image
              src="/assets/collective/foundation-portrait.jpg"
              alt="A black-and-white portrait of a man descending timber stairs beside a Colvin Haven home"
              fill
              sizes="305px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div className="foundation__text">
          <h2 className="section-heading">Foundation</h2>
          <hr className="values__divider" />
          <div className="foundation__copy">
            <div className="values__tag">
              <span className="values__dot" />
              <span>BACKGROUND STORY</span>
            </div>
            <p>
              Twenty years in kitchens, not classrooms Gramercy Tavern,
              Gary Danko, and co-founding Mixt before the first Colvin
              Haven home was ever built. No architecture degree, no design
              training. What came instead was real: building out
              Mixt&apos;s restaurants, then designing Umah Tsuki from
              nothing. The discipline every good kitchen teaches carried
              straight through the best result is never the largest,
              it&apos;s the most precisely composed.
            </p>
            <p className="foundation__copy-spaced">
              That instinct is the entire practice. Every material chosen
              for what it does, not what it announces. Every room built
              around how a body actually wants to move through a day.
              Nothing added that isn&apos;t earning its place the same
              rule that once applied to a plate, now applied to a home.
            </p>
            <p>The philosophy hasn&apos;t changed. Only the medium.</p>
            <p>
              Where Andrew once asked how food could nourish a person&apos;s
              body, mind, community. He now asks the same of the spaces
              they inhabit. A Colvin Haven home is, at its heart, an act of
              nourishment. Conceived entirely for one family. Completed
              entirely by hand.
            </p>
          </div>
        </div>
      </ScrollFade>
    </section>
  );
}
