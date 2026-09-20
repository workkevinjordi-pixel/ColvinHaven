import Image from "next/image";
import ScrollFade from "../ScrollFade";

/**
 * "CRAFT" section (Figma node 205:335): heading/divider/tag, then a
 * two-column row -- a captioned photo + copy on the left, a single tall
 * uncaptioned photo on the right. Structurally close to
 * EditionSpotlight's row, but the side photo here is taller (773px, not
 * 473px) and carries no caption, so it gets its own scoped classes
 * rather than reusing edition-spotlight__row directly.
 */
export default function Craft() {
  return (
    <section className="craft">
      <ScrollFade>
        <h2 className="section-heading">Craft</h2>
        <hr className="values__divider" />
        <div className="values__tag craft__tag">
          <span className="values__dot" />
          <span>THE CORE</span>
        </div>

        <div className="craft__row">
          <div className="craft__row-main">
            <div className="craft__row-image">
              <Image
                src="/assets/collective/craft-detail.png"
                alt="A timber A-frame hoist unloading materials from a delivery truck on site"
                fill
                sizes="(min-width: 900px) 790px, 100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="craft__row-text">
              <p>
                Every Colvin Haven home is built by Indonesian master
                craftsmen and artisans whose knowledge of local timber,
                stone, and joinery has passed through generations.
              </p>
              <p className="craft__row-text-spaced">
                It&apos;s the core of how these homes get made. Colvin
                Haven doesn&apos;t design a home and then have it built.
                The two happen together, craftsman and founder, on site,
                for as long as each home takes. We offer a limited turnkey
                home to our clients.
              </p>
              <p>
                Materials are chosen the same way ingredients once were —
                for provenance, not convenience. Paras stone quarried in
                Bali. Ulin hardwood, reclaimed rather than freshly felled.
                Teak, hand-cut and laid by local woodworkers who&apos;ve
                done this for generations. Nothing shipped in that the
                island couldn&apos;t already give.
              </p>
            </div>
          </div>
          <div className="craft__row-side">
            <Image
              src="/assets/collective/craft-tall.png"
              alt="An Indonesian craftsman assembling a wooden lattice panel in a workshop"
              fill
              sizes="(min-width: 900px) 403px, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </ScrollFade>
    </section>
  );
}
