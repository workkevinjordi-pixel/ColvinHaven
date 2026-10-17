import Image from "next/image";
import ScrollFade from "../ScrollFade";

type MoriProfileProps = {
  heading?: string;
  description?: string;
  landSize?: string;
  timeToComplete?: string;
  heroImage?: { src: string; alt: string };
  paragraphs?: string[];
};

// Matches the content migrated into Sanity's newsPage.moriProfile (see
// lib/sanity/newsPage.ts and app/news/page.tsx) -- kept as a fallback
// here in case the fetch ever comes back empty, not the source of
// truth.
const DEFAULT_HERO_IMAGE = {
  src: "/assets/news/news-craftsman-timber.webp",
  alt: "A craftsman measuring timber against a dark board-and-batten wall",
};
const DEFAULT_PARAGRAPHS = [
  "Every Colvin Haven home is built by Indonesian master craftsmen and artisans whose knowledge of local timber, stone, and joinery has passed through generations.",
  "It's the core of how these homes get made. Colvin Haven doesn't design a home and then have it built. The two happen together, craftsman and founder, on site, for as long as each home takes. We offer a limited turnkey home to our clients.",
  "Materials are chosen the same way ingredients once were — for provenance, not convenience. Paras stone quarried in Bali. Ulin hardwood, reclaimed rather than freshly felled. Teak, hand-cut and laid by local woodworkers who've done this for generations. Nothing shipped in that the island couldn't already give.",
];

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
 * "Mori" (森, "forest"/"jungle") is a genuinely new third edition this
 * frame introduces -- "Land Size: 2000 m2" / "Time to complete: 2028"
 * (an upcoming home, not yet built, unlike Tsuki/Sora's own completed-
 * year facts). Content now comes from Sanity's newsPage.moriProfile.
 */
export default function MoriProfile({
  heading = "MORI (森 - Jungle)",
  description = "The third express in our collection. Not a smaller version of Tsuki, but its true essence distilled. Mori distils the same philosophy into an intimate, human scale. Every metre purposeful.",
  landSize = "Land Size: 2000 m2",
  timeToComplete = "Time to complete: 2028",
  heroImage = DEFAULT_HERO_IMAGE,
  paragraphs = DEFAULT_PARAGRAPHS,
}: MoriProfileProps) {
  return (
    <section className="mori" id="mori">
      <ScrollFade className="mori__body">
        <div className="mori__sidebar">
          <h2 className="section-heading">{heading}</h2>
          <hr className="values__divider" />
          <p className="mori__description">{description}</p>
          <div className="mori__facts">
            <p>{landSize}</p>
            <p>{timeToComplete}</p>
          </div>
        </div>

        <div className="mori__content">
          <div className="mori__hero-image">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              sizes="(min-width: 900px) 639px, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="mori__text">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </ScrollFade>
    </section>
  );
}
