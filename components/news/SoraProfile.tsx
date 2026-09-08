import Image from "next/image";
import ScrollFade from "../ScrollFade";

type Moment = {
  image: { src: string; alt: string };
  paragraphs: string[];
};

// The first photo reuses the same asset as Collective's Craft section
// (Figma hash 17cda341... is byte-identical to public/assets/collective/
// craft-detail.png); the second is new to this page.
const MOMENTS: Moment[] = [
  {
    image: {
      src: "/assets/collective/craft-detail.png",
      alt: "A timber A-frame hoist unloading materials from a delivery truck on site",
    },
    paragraphs: [
      "Every Colvin Haven home is built by Indonesian master craftsmen and artisans whose knowledge of local timber, stone, and joinery has passed through generations.",
      "It's the core of how these homes get made. Colvin Haven doesn't design a home and then have it built. The two happen together, craftsman and founder, on site, for as long as each home takes. We offer a limited turnkey home to our clients.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
  },
  {
    image: {
      src: "/assets/news/sora-moment-2.png",
      alt: "A koi pond bordered by stone and ferns",
    },
    paragraphs: [
      "Nothing wasted. Built entirely in-house — design and execution, founder and craftsmen, nobody else.",
      "The materials carry the same discipline as Tsuki's — sourced from the island, not shipped to it. Nothing brought in that the land here couldn't already give us. It's a smaller footprint by design, and a lighter one by necessity — building well, here, has always meant building with what's already local.",
    ],
  },
];

/**
 * "SORA (空 - Sky)" profile (Figma nodes 205:562/580/566): a fixed-width
 * sidebar (heading, divider, description, land/timeline facts) beside a
 * column of photo + caption "moments". New pattern -- no existing site
 * layout matches a sidebar-plus-column split, so it gets its own scoped
 * classes.
 */
export default function SoraProfile() {
  return (
    <section className="sora">
      <ScrollFade className="sora__body">
        <div className="sora__sidebar">
          <h2 className="section-heading">SORA (空 - Sky)</h2>
          <hr className="values__divider" />
          <p className="sora__description">
            The second express in our collection. Not a smaller version of
            Tsuki, but its true essence distilled. Sora distils the same
            philosophy into an intimate, human scale. Every metre
            purposeful.
          </p>
          <div className="sora__facts">
            <p>Land Size: 2000 m2</p>
            <p>Time to complete: 2028</p>
          </div>
        </div>

        <div className="sora__moments">
          {MOMENTS.map((moment, i) => (
            <div className="sora__moment" key={i}>
              <div className="sora__moment-image">
                <Image
                  src={moment.image.src}
                  alt={moment.image.alt}
                  fill
                  sizes="(min-width: 900px) 639px, 100vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="sora__moment-text">
                {moment.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollFade>
    </section>
  );
}
