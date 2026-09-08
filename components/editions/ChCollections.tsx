import ScrollFade from "../ScrollFade";

/**
 * Reuses the main site's guiding-values body pattern (.values__body /
 * __aside / __text, same as Gallery's "Our Edition" intro) for the
 * label-tag + paragraph layout -- only the heading style differs here
 * (Roboto Medium, not the site's serif section heading), so it gets its
 * own heading class instead of .values__heading.
 */
export default function ChCollections() {
  return (
    <section className="ch-collections" id="collective">
      <ScrollFade>
        <h2 className="ch-collections__heading">CH Collections</h2>
        <hr className="values__divider" />
        <div className="values__body">
          <div className="values__aside">
            <div className="values__tag">
              <span className="values__dot" />
              <span>WARM WELCOME TO OUR COLLECTIONS</span>
            </div>
          </div>
          <div className="values__text ch-collections__text">
            <p>
              Every CH home is a singular commission — one family, one
              landscape, one house that will never be built again.
            </p>
            <p>
              The language is constant. Restraint, learned in kitchens
              rather than classrooms. Materials chosen for how they feel,
              not how they photograph. A kitchen at the center of every
              home, because that&apos;s where a life is actually lived.
              What changes is the canvas — the land, the light, the hands
              each place gives us to build with.
            </p>
            <p>
              Umah Tsuki and Sora are both written in Indonesia. They are
              the first two homes in a language built to travel — one
              country, one canvas, at a time.
            </p>
          </div>
        </div>
      </ScrollFade>
    </section>
  );
}
