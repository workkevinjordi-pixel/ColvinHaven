import ScrollFade from "../ScrollFade";

/**
 * "OUR GUIDING VALUES" (Figma node 298:13283): the same guiding-values
 * copy the live homepage's Option8Values already carries, restyled as a
 * centered serif statement (tag above a Cormorant Garamond heading,
 * paragraphs centered under it) instead of Option8Values' left-aligned
 * tag-beside-text layout. Same words, deliberately different frame --
 * kept as its own component under homepage-new/ rather than a variant
 * prop on Option8Values, since the two don't share any markup once the
 * layout itself changes this much.
 */
export default function GuidingValues() {
  return (
    <section>
      <ScrollFade className="hpn-values">
        <div className="hpn-tag">
          <span className="hpn-tag__dot" />
          <span>A WAY OF LIFE</span>
        </div>
        <h2 className="hpn-heading">Our Guiding Values</h2>
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
