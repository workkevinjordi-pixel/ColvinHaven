import ScrollFade from "../ScrollFade";

/**
 * "INSPIRATION" section (Figma node 205:383) -- same
 * values__body/aside/text + .statement-section reuse as Editions'
 * ChCollections (label tag on the left, paragraph column on the right),
 * just with this page's own heading and copy.
 */
export default function Inspiration() {
  return (
    <section className="statement-section">
      <ScrollFade>
        <h2 className="section-heading">Inspiration</h2>
        <hr className="values__divider" />
        <div className="values__body">
          <div className="values__aside">
            <div className="values__tag">
              <span className="values__dot" />
              <span>WARM WELCOME TO OUR COLLECTIONS</span>
            </div>
          </div>
          <div className="values__text statement-section__text">
            <p>
              The design language draws from two traditions at once.
              Japanese and Scandinavian, the two schools that understood
              minimalism before the word existed. Danish design in
              particular: furniture and interiors built on the same
              instinct as a well-run kitchen, nothing decorative,
              everything earning its place.
            </p>
            <p>
              That instinct extends to how a home is organized around
              living, not just looking. Twenty years of service taught one
              thing above all: people gather in the kitchen, not the
              living room. So in every Colvin Haven home, the kitchen is
              never an afterthought — it&apos;s the room the rest of the
              house is built around.
            </p>
          </div>
        </div>
      </ScrollFade>
    </section>
  );
}
