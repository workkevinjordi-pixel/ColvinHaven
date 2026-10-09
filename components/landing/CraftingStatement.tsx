import ScrollFade from "../ScrollFade";

type CraftingStatementProps = {
  heading?: string;
  body?: string;
};

/**
 * "CRAFTING SPACES, LIVING SLOWLY." (Figma node 298:13283): a short,
 * centered tagline-style statement -- heading + one wide paragraph, no
 * divider, no link. Content now comes from Sanity's
 * homepage.craftingStatement (see lib/sanity/homepage.ts and
 * app/page.tsx) -- defaults below match the original hardcoded copy.
 *
 * Distinct from the shared .centered-statement pattern (EditionsIntro/
 * NewsFilmstripBand's own eyebrow+lead+cta shell) -- this frame's own
 * type sizes don't match that one (32px/3.2px-tracking heading, 24px/
 * 40px/2.4px-tracking body, versus .centered-statement's 32px eyebrow
 * and 16px/24px lead), so it gets its own scoped classes rather than
 * reusing that shell with mismatched type.
 */
export default function CraftingStatement({
  heading = "CRAFTING SPACES, LIVING SLOWLY.",
  body = "Colvin Haven creates limited edition homes designed for the next chapter of living, where silence is luxury and presence is a new power.",
}: CraftingStatementProps) {
  return (
    <section className="landing-crafting">
      <ScrollFade className="landing-crafting__inner">
        <h2 className="landing-crafting__heading">{heading}</h2>
        <p className="landing-crafting__body">{body}</p>
      </ScrollFade>
    </section>
  );
}
