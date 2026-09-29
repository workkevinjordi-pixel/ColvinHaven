import type { ReactNode } from "react";
import ScrollFade from "../ScrollFade";

type TextIntroProps = {
  heading: string;
  linkLabel: string;
  linkHref: string;
  children: ReactNode;
  /** "Tsuki Editions" (node 319:37933) has its heading+divider span the
   * full 1200px content width, with only the paragraph+link column
   * confined to a 760px block on the right. "Collective" (node
   * 319:38007) confines the heading itself to that same 760px column
   * too, starting further right (Figma's own pl-560 on a 1440px frame).
   * One shared shell, this is the one layout knob between them. */
  narrow?: boolean;
};

/**
 * Shared "heading, divider line, paragraph, italic arrow-link" shell
 * (Figma nodes 319:37933 "Tsuki Editions" and 319:38007 "Collective"):
 * both sections carry the exact same body copy in this Figma file
 * (confirmed via a dedicated get_design_context call on each, not
 * assumed) -- only the heading, link label/href, and the narrow-column
 * layout differ, so this is one component with those as props rather
 * than two near-identical ones.
 */
export default function TextIntro({
  heading,
  linkLabel,
  linkHref,
  children,
  narrow = false,
}: TextIntroProps) {
  return (
    <section className="landing-intro">
      <ScrollFade
        className={`landing-intro__inner${narrow ? " landing-intro__inner--narrow" : ""}`}
      >
        <div className="landing-intro__heading-group">
          <h2 className="landing-intro__heading">{heading}</h2>
          <div className="landing-intro__line" />
        </div>
        <div className="landing-intro__body">
          <div className="landing-intro__text">{children}</div>
          <a href={linkHref} className="landing-intro__link">
            {linkLabel} <span aria-hidden="true">→</span>
          </a>
        </div>
      </ScrollFade>
    </section>
  );
}
