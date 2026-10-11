import type { ReactNode } from "react";
import ScrollFade from "../ScrollFade";

type TextIntroProps = {
  /** Small label above the heading (node 385:1275's own "EDITIONS"
   * row) -- optional, only the redesigned `centered` variant uses it. */
  eyebrow?: string;
  heading: string;
  /** Kicker line under the heading, same "EDITIONS" redesign --
   * optional, `narrow` never had one. */
  subtitle?: string;
  /** Italic lead sentence above the body paragraphs, same redesign --
   * optional, `narrow` never had one. */
  lead?: string;
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
   * "Tsuki Editions" layout this prop used to select by default, later
   * redesigned again at node 385:1275 to add the eyebrow/subtitle/lead
   * above): the whole block -- heading, paragraph, and link -- centers
   * as one column instead, and drops the divider line entirely
   * (confirmed via get_design_context: no line element anywhere in
   * either frame's own tree, unlike the other variant). Mutually
   * exclusive with `narrow` -- no Figma frame combines the two.
   */
  centered?: boolean;
};

/**
 * Shared "heading, (optional divider), paragraph, italic arrow-link"
 * shell (Figma nodes 371:40218/385:1275 "Editions", 371:40234
 * "Collective" on the "Homepage" frame, 298:11984): heading/link/
 * layout differ per variant, and since node 385:1275's redesign,
 * "Editions" also carries an eyebrow label, a subtitle under the
 * heading, and an italic lead sentence above its body paragraph --
 * all three stay undefined for "Collective", which renders exactly as
 * it did before this redesign.
 */
export default function TextIntro({
  eyebrow,
  heading,
  subtitle,
  lead,
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
        {eyebrow && <p className="landing-intro__eyebrow">{eyebrow}</p>}
        <div className="landing-intro__heading-group">
          <h2 className="landing-intro__heading">{heading}</h2>
          {subtitle && <p className="landing-intro__subtitle">{subtitle}</p>}
          {!centered && <div className="landing-intro__line" />}
        </div>
        <div className="landing-intro__body">
          {lead && <p className="landing-intro__lead">{lead}</p>}
          <div className="landing-intro__text">{children}</div>
          <a href={linkHref} className="landing-intro__link">
            {linkLabel} <span aria-hidden="true">→</span>
          </a>
        </div>
      </ScrollFade>
    </section>
  );
}
