import Image from "next/image";
import ScrollFade from "../ScrollFade";

// Alternating narrow/wide filmstrip, matching the Figma "Editions" frame
// (node 203:131): Image / edition 1 / Image / edition 2 / Image. Figma
// reuses the same two placeholder photos across all five slots -- kept
// as-is here rather than inventing new crops.
const REEL = [
  { src: "/assets/editions/tsuki-hero.png", wide: false },
  { src: "/assets/editions/tsuki-edition-1.png", wide: true },
  { src: "/assets/editions/tsuki-hero.png", wide: false },
  { src: "/assets/editions/tsuki-edition-1.png", wide: true },
  { src: "/assets/editions/tsuki-hero.png", wide: false },
];

/**
 * Top-of-page intro: faded roman-numeral eyebrow, a lede paragraph (still
 * Figma's own Lorem Ipsum placeholder -- swap in real copy when it's
 * ready), an outline CTA, and a filmstrip that bleeds past the standard
 * content column on both sides.
 */
export default function EditionsIntro() {
  return (
    <section className="editions-intro">
      <ScrollFade className="editions-intro__text">
        <p className="editions-intro__eyebrow">II/VII</p>
        <p className="editions-intro__lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <a href="#editions" className="editions-intro__cta">
          Explore II/VII
        </a>
      </ScrollFade>

      <div className="editions-intro__reel">
        {REEL.map((item, i) => (
          <div
            key={i}
            className={`editions-intro__reel-item${item.wide ? " editions-intro__reel-item--wide" : ""}`}
          >
            <Image
              src={item.src}
              alt=""
              fill
              sizes={item.wide ? "443px" : "284px"}
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
