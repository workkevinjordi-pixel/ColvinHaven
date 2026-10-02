import Image from "next/image";
import ScrollFade from "../ScrollFade";

/**
 * "MORI (森 - Jungle)" profile (Figma node 368:40092, replacing the
 * previous "SORA (空 - Sky)" section this page used to feature, nodes
 * 205:562/580/566/250:10858) -- a fixed-width sidebar (heading,
 * divider, description, land-size/timeline facts) beside a single
 * hero photo and its own caption text, reusing the exact same
 * sidebar-beside-column structure the old SoraProfile established
 * (gap/widths match this new frame's own 181px/396px/639px exactly),
 * just one photo+caption block now instead of a loop of several
 * "moments" -- SoraProfile's own MOMENTS array is gone, replaced with
 * a single hero image.
 *
 * The hero photo (node 368:40102) is the same craftsman-measuring-
 * timber photo already on the site (news-craftsman-timber.jpg,
 * confirmed via visual match against Figma's own asset, just a
 * different crop) -- reused directly, not re-downloaded as a
 * duplicate file.
 *
 * Caption text: paragraphs 1-2 are this site's own established real
 * copy (same "Every Colvin Haven home is built..."/"It's the core..."
 * pair Foundation/Craft/EditionSpotlight all already use verbatim).
 * Paragraph 3 is still literal Lorem Ipsum in this Figma frame --
 * replaced with Craft's own third paragraph (the "paras stone/ulin
 * hardwood/teak" provenance copy), same practice already used to
 * replace a stale Lorem Ipsum placeholder with real, already-approved
 * copy grounded in the same material facts (see EditionSpotlight
 * storyA's own third paragraph for the precedent).
 *
 * "Mori" (森, "forest"/"jungle") is a genuinely new third edition this
 * frame introduces -- "Land Size: 2000 m2" / "Time to complete: 2028"
 * (an upcoming home, not yet built, unlike Tsuki/Sora's own completed-
 * year facts) -- confirmed consistent across both this section and
 * What's Cooking's own checklist above it, not a stale leftover from
 * an earlier iteration of this frame (unlike the old Kawa/Sora
 * inconsistency the previous build's own comment had to reason through).
 */
export default function MoriProfile() {
  return (
    <section className="mori" id="mori">
      <ScrollFade className="mori__body">
        <div className="mori__sidebar">
          <h2 className="section-heading">MORI (森 - Jungle)</h2>
          <hr className="values__divider" />
          <p className="mori__description">
            The third express in our collection. Not a smaller version of
            Tsuki, but its true essence distilled. Mori distils the same
            philosophy into an intimate, human scale. Every metre
            purposeful.
          </p>
          <div className="mori__facts">
            <p>Land Size: 2000 m2</p>
            <p>Time to complete: 2028</p>
          </div>
        </div>

        <div className="mori__content">
          <div className="mori__hero-image">
            <Image
              src="/assets/news/news-craftsman-timber.jpg"
              alt="A craftsman measuring timber against a dark board-and-batten wall"
              fill
              sizes="(min-width: 900px) 639px, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="mori__text">
            <p>
              Every Colvin Haven home is built by Indonesian master
              craftsmen and artisans whose knowledge of local timber,
              stone, and joinery has passed through generations.
            </p>
            <p>
              It&apos;s the core of how these homes get made. Colvin
              Haven doesn&apos;t design a home and then have it built.
              The two happen together, craftsman and founder, on site,
              for as long as each home takes. We offer a limited
              turnkey home to our clients.
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
      </ScrollFade>
    </section>
  );
}
