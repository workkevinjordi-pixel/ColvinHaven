/**
 * "WELCOME" statement between the opening photo and the first edition
 * (Figma node 371:40300). Copy is ported verbatim, including the
 * lowercase "that" after "one house." in the Figma frame.
 */
export default function EditionsWelcome() {
  return (
    <section className="editions-welcome">
      <div className="editions-welcome__inner">
        <div className="editions-welcome__heading">
          <h2 className="editions-welcome__title">WELCOME</h2>
          <p className="editions-welcome__tagline">A LANGUAGE, NOT A LINE.</p>
        </div>
        <div className="editions-welcome__body">
          <p>
            Every CH home is a singular commission: one family, one landscape, one house. that will
            never be built again. The language is constant. Restraint, learned in kitchens rather
            than classrooms. Materials chosen for how they feel, not how they photograph. A kitchen
            at the center of every home, because that’s where life is actually lived. What changes
            is the canvas, the land, the light, the hands each place gives us to build with.
          </p>
          <p>
            Umah Tsuki and Sora are both written in Indonesia. They are the first two homes in a
            language built to travel one country, one canvas at a time.
          </p>
        </div>
      </div>
    </section>
  );
}
