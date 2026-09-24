import Image from "next/image";
import ScrollFade from "../ScrollFade";

type Moment = {
  image: { src: string; alt: string };
  paragraphs: string[];
};

// The first photo is re-synced against node 250:10858: a color
// close-up of a craftsman measuring timber against a dark
// board-and-batten wall, replacing the earlier black-and-white A-frame
// hoist/delivery-truck photo (confirmed via visual diff, not just a
// changed hash). The second is unchanged.
const MOMENTS: Moment[] = [
  {
    image: {
      src: "/assets/news/news-craftsman-timber.jpg",
      alt: "A craftsman measuring timber against a dark board-and-batten wall",
    },
    paragraphs: [
      "Every Colvin Haven home is built by Indonesian master craftsmen and artisans whose knowledge of local timber, stone, and joinery has passed through generations.",
      "It's the core of how these homes get made. Colvin Haven doesn't design a home and then have it built. The two happen together, craftsman and founder, on site, for as long as each home takes. We offer a limited turnkey home to our clients.",
      "Sora took the same two years Tsuki did — not because the process could be rushed, but because it never should be. The same discipline at every stage: the site cleared by hand, the trees planted before the first foundation was poured, each material sourced before it was needed rather than ordered to a deadline.",
    ],
  },
  {
    image: {
      src: "/assets/news/sora-moment-2.png",
      alt: "A koi pond bordered by stone and ferns",
    },
    paragraphs: [
      "Nothing wasted. Built entirely in-house design and execution, founder and craftsmen, nobody else.",
      "The materials carry the same discipline as Tsuki's sourced from the island, not shipped to it. Nothing brought in that the land here couldn't already give us. It's a smaller footprint by design, and a lighter one by necessity building well, here, has always meant building with what's already local.",
    ],
  },
];

/**
 * "SORA (空 - Sky)" profile (Figma nodes 205:562/580/566, re-synced
 * against node 250:10858): a fixed-width sidebar (heading, divider,
 * description, land/timeline facts) beside a column of photo + caption
 * "moments". New pattern -- no existing site layout matches a
 * sidebar-plus-column split, so it gets its own scoped classes.
 *
 * The current Figma frame relabels this whole section "KAWA (川 -
 * River)" -- "the THIRD express in our collection" / "Time to
 * complete: 2028" -- but that's not ported here. No Kawa edition
 * exists anywhere else in the codebase (editions-data.ts only defines
 * Tsuki and Sora, and Sora's own nextEdition still points back at
 * Tsuki), and this same News frame's own "What's Cooking" checklist
 * just above -- itself fresh, non-Lorem-Ipsum content -- still previews
 * this section as "Edition II/VII: SORA". Treating "Kawa" as a stale
 * leftover from an earlier iteration of this frame (rather than a real
 * new edition the rest of the site isn't built for yet), consistent
 * with this session's rule of not regressing approved content for
 * stale Figma text -- kept Sora/2024 here.
 */
export default function SoraProfile() {
  return (
    <section className="sora" id="sora">
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
            <p>Completed: 2024</p>
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
