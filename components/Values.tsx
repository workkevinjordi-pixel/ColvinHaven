import ScrollFade from "./ScrollFade";

export default function Values() {
  return (
    <section className="values" id="collective">
      <ScrollFade>
        <h2 className="values__heading">Our guiding values</h2>
        <hr className="values__divider" />
        <div className="values__body">
          <div className="values__aside">
            <div className="values__tag">
              <span className="values__dot" />
              <span>A WAY OF LIFE</span>
            </div>
          </div>
          <div className="values__text">
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
        </div>
      </ScrollFade>
    </section>
  );
}
