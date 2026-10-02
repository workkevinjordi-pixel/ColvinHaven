import type { ReactNode } from "react";
import ScrollFade from "../ScrollFade";

type TextIntroProps = {
  heading: string;
  linkLabel: string;
  linkHref: string;
  children: ReactNode;
  /** "Collective" (node 371:40234, the current frame's own version of
   * the section this originally mapped to node 319:38007) confines its
   * heading to the same 760px column as its paragraph, starting further
   * right (Figma's own pl-120/pr-560 on a 1440px frame). One shared
   * shell, this is one of its layout knobs. */
  narrow?: boolean;
  /** "Editions" (node 371:40218, replacing the old full-width-heading
   * "Tsuki Editions" layout this prop used to select by default): the
   * whole block -- heading, paragraph, and link -- centers as one
   * column instead, and drops the divider line entirely (confirmed via
   * get_design_context: no line element anywhere in that frame's own
   * tree, unlike the other two variants). Mutually exclusive with
   * `narrow` -- no Figma frame combines the two. */
  centered?: boolean;
};

/**
 * Shared "heading, (optional divider), paragraph, italic arrow-link"
 * shell (Figma nodes 371:40218 "Editions", 371:40234 "Collective" on
 * the current "Homepage" frame, 298:11984): all three variants carry
 * the exact same body copy in this Figma file (confirmed via a
 * dedicated get_design_context call on each, not assumed) -- only the
 * heading, link label/href, and the layout (full-width/narrow/centered)
 * differ, so this stays one component with those as props.
 */
export default function TextIntro({
  heading,
  linkLabel,
  linkHref,
  children,
  narrow = false,
  centered = false,
}: TextIntroProps) {
  const modifier = centered
    ? " landing-intro__inner--centered"
    : narrow
      ? " landing-intro__inner--narrow"
      : "";

  return (
    <section className="landing-intro">
      <ScrollFade className={`landing-intro__inner${modifier}`}>
        <div className="landing-intro__heading-group">
          <h2 className="landing-intro__heading">{heading}</h2>
          {!centered && <div className="landing-intro__line" />}
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
