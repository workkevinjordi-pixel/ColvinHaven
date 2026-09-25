import Image from "next/image";
import ScrollFade from "../ScrollFade";

/**
 * "MORI (森 - Jungle)" coming-soon teaser (Figma node 298:13458): a
 * third edition, not yet built. Its intro -- heading, lede, and specs
 * (2000m2, complete 2027) -- is genuine new copy, ported faithfully.
 *
 * The two-photo row below it is a different story: both images and
 * both captions are byte-for-byte Tsuki's own row1 content (confirmed
 * via hash) -- Figma's familiar "duplicate an existing edition's block
 * as a placeholder for a new one" pattern (the same one Sora's own
 * entry in editions-data.ts went through before real Sora photography
 * existed). No real Mori photography exists anywhere on the site yet,
 * so rather than invent a substitute or drop the row, it's ported
 * as-is, reusing .edition-spotlight__row* directly since the
 * proportions match that pattern exactly.
 */
export default function MoriTeaser() {
  return (
    <section className="hpn-mori">
      <ScrollFade className="hpn-mori__intro">
        <div className="hpn-mori__heading-group">
          <div className="hpn-tag">
            <span className="hpn-tag__dot" />
            <span>COMING SOON</span>
          </div>
          <h2 className="hpn-heading">Mori (森 - Jungle)</h2>
        </div>
        <p className="hpn-mori__lede">
          The third express in our collection. Not a smaller version of
          Tsuki, but its true essence distilled. Mori distils the same
          philosophy into an intimate, human scale. Every metre
          purposeful.
        </p>
        <div className="hpn-mori__facts">
          <p>Land Size: 2000 m2</p>
          <p>Time to complete: 2027</p>
        </div>
      </ScrollFade>

      <ScrollFade className="edition-spotlight__row">
        <div className="edition-spotlight__row-main">
          <div className="edition-spotlight__row-image">
            <Image
              src="/assets/editions/tsuki-edition-1.png"
              alt="Detail of Umah Tsuki's shou sugi ban roofline and timber-framed window"
              fill
              sizes="(min-width: 900px) 790px, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="edition-spotlight__row-text">
            <p>
              &ldquo;Designed to belong, Tsuki editions disappear into the
              landscape, honoring the land rather than overtaking
              it&rdquo;
            </p>
            <p>
              In both materials and construction, Umah Tsuki emphasizes
              provenance hand-built on site from locally sourced paras
              stone and recycled ulin hardwood, its traditional
              techniques and meticulous finishes set the scene for a
              quality of life attuned to the essential.
            </p>
          </div>
        </div>
        <div className="edition-spotlight__row-side">
          <div className="edition-spotlight__row-image">
            <Image
              src="/assets/editions/tsuki-hero.png"
              alt="Umah Tsuki's black-clad cantilevered volume seen through the surrounding tree canopy"
              fill
              sizes="(min-width: 900px) 403px, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <p>
            Twenty years of service taught one thing above all a home
            doesn&apos;t gather around a view, it gathers around a
            kitchen. So Tsuki&apos;s kitchen was never an afterthought.
            It sits at the heart of the home.
          </p>
        </div>
      </ScrollFade>
    </section>
  );
}
