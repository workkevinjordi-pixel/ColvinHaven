import ScrollFade from "../ScrollFade";

/**
 * "A WAY OF LIFE" (Figma node 319:37991): the same guiding-values copy
 * GuidingValues already carries, but here "A Way of Life" IS the
 * heading itself -- no separate "OUR GUIDING VALUES" title underneath
 * it, no eyebrow tag/dot above it. Reuses .hpn-values/.hpn-heading
 * verbatim rather than introducing new classes: .hpn-heading--small
 * is already exactly this frame's 24px/2.4px-tracking size (confirmed
 * against Editions' own heading, not assumed), and .hpn-values__text's
 * 920px max-width already matches this frame's own paragraph block --
 * only the tag + second heading line are dropped.
 */
export default function WayOfLife() {
  return (
    <section>
      <ScrollFade className="hpn-values">
        <h2 className="hpn-heading hpn-heading--small">A WAY OF LIFE</h2>
        <div className="hpn-values__text">
          <p>
            Before anything else, we plant the trees. By the time you
            arrive, the land has already had years to settle — which is
            why your system does too, the moment you walk in.
          </p>
          <p>
            Nature, close enough to touch. No sound that doesn&apos;t
            belong here — water, wind, birdsong, and nothing manufactured
            underneath it. Timber and stone chosen not for how they
            photograph, but for how they feel under a hand — warm,
            familiar, closer to a held object than a building material. A
            wellness practice waiting whenever you want it, or none of it
            at all — a chair, good light, a book, and nowhere you need to
            be.
          </p>
          <p>This is not a home you visit. It is a state you return to.</p>
        </div>
      </ScrollFade>
    </section>
  );
}
