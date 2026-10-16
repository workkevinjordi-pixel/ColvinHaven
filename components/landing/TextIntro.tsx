import { Fragment, type ReactNode } from "react";
import ScrollFade from "../ScrollFade";

type TextIntroProps = {
  /** Small label above the heading (node 385:1275/385:1370's own
   * eyebrow row, e.g. "EDITIONS"/"COLLECTIVE") -- optional, only the
   * redesigned `centered` variant uses it. */
  eyebrow?: string;
  /** A "\n" in this string renders as a hard line break -- Collective's
   * own redesign (node 385:1370) is two short centered lines, not one
   * paragraph wrapped by the browser. */
  heading: string;
  /** Kicker line under the heading (Editions' own redesign, node
   * 385:1275) -- optional, Collective's own redesign has no subtitle. */
  subtitle?: string;
  /** Italic lead sentence above the body paragraphs (Editions' own
   * redesign) -- optional, Collective's own redesign has no lead. */
  lead?: string;
  /** Narrows the body text column to 686px (Collective's own redesign,
   * node 385:1370) instead of the shared centered shell's 760px --
   * optional, Editions' own redesign keeps the wider column. */
  compact?: boolean;
  linkLabel: string;
  linkHref: string;
  children: ReactNode;
  /** "Collective" (node 371:40234, the original version of this
   * section, since replaced by the centered redesign at node
   * 385:1370) confined its heading to the same 760px column as its
   * paragraph, starting further right (Figma's own pl-120/pr-560 on a
   * 1440px frame). No live page uses this layout any more, but it's
   * kept as a real, documented option rather than deleted -- same
   * practice as the shell's own unused full-width default. */
  narrow?: boolean;
  /** Both "Editions" (node 371:40218, later redesigned at 385:1275)
   * and "Collective" (node 371:40234, later redesigned at 385:1370):
   * the whole block -- heading, paragraph, and link -- centers as one
   * column instead, and drops the divider line entirely (confirmed via
   * get_design_context: no line element in any of these frames' own
   * trees, unlike `narrow`). Mutually exclusive with `narrow` -- no
   * Figma frame combines the two.
   */
  centered?: boolean;
};

/**
 * Shared "heading, (optional divider), paragraph, italic arrow-link"
 * shell (Figma nodes 371:40218/385:1275 "Editions", 371:40234/385:1370
 * "Collective" on the "Homepage" frame, 298:11984): heading/link/
 * layout differ per variant, and since their respective redesigns,
 * both centered variants also carry their own optional eyebrow label
 * above the heading -- Editions additionally has a subtitle under the
 * heading and an italic lead sentence above its body paragraph;
 * Collective additionally has a narrower 686px body column. Each optional block stays undefined on the
 * variant that doesn't use it.
 */
export default function TextIntro({
  eyebrow,
  heading,
  subtitle,
  lead,
  compact = false,
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
  const compactModifier = compact ? " landing-intro__inner--compact" : "";
  const headingLines = heading.split("\n");

  return (
    <section className="landing-intro">
      <ScrollFade
        className={`landing-intro__inner${modifier}${compactModifier}`}
      >
        {eyebrow && <p className="landing-intro__eyebrow">{eyebrow}</p>}
        <div className="landing-intro__heading-group">
          <h2 className="landing-intro__heading">
            {headingLines.map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h2>
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
