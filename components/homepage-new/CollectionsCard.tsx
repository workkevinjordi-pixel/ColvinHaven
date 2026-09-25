import Image from "next/image";
import ScrollFade from "../ScrollFade";

/**
 * "CH Collections" (Figma node 298:13396): a poster-card image beside
 * the same tag/heading/paragraphs/CTA copy as Editions' own ChCollections
 * -- new layout, same already-approved words (including the CTA note's
 * "each edition stands" -- Figma's own copy of this frame still has the
 * unfixed "each editions stands" typo the live site already corrected).
 * The card itself is a flat, pre-composed graphic (Figma layer name:
 * "Screenshot 2026-09-25 at 18.00.37") rather than a live-rendered
 * component, so it's reproduced as a single image.
 */
export default function CollectionsCard() {
  return (
    <section className="hpn-collections">
      <ScrollFade className="hpn-collections__card">
        <Image
          src="/assets/homepage-new/homepage-new-collection-card.jpg"
          alt="A poster reading 'The Collection: a home that slows you down, and brings stillness and wellness into your life'"
          fill
          sizes="(min-width: 900px) 425px, 100vw"
          style={{ objectFit: "cover" }}
        />
      </ScrollFade>
      <ScrollFade className="hpn-collections__body">
        <div className="hpn-tag">
          <span className="hpn-tag__dot" />
          <span>WARM WELCOME TO OUR COLLECTIONS</span>
        </div>
        <h2 className="hpn-collections__heading">CH Collections</h2>
        <div className="hpn-collections__text">
          <p>
            Every CH home is a singular commission one family, one
            landscape, one house that will never be built again.
          </p>
          <p>
            The language is constant. Restraint, learned in kitchens
            rather than classrooms. Materials chosen for how they feel,
            not how they photograph. A kitchen at the center of every
            home, because that&apos;s where a life is actually lived.
            What changes is the canvas the land, the light, the hands
            each place gives us to build with.
          </p>
          <p>
            Umah Tsuki and Sora are both written in Indonesia. They are
            the first two homes in a language built to travel one
            country, one canvas, at a time.
          </p>
        </div>
        <div className="statement-section__cta-group">
          <a
            href="/request-the-collections"
            className="statement-section__cta"
          >
            Request the collections
          </a>
          <p className="statement-section__cta-note">
            A private look at where each edition stands today, and which
            are still available.
          </p>
        </div>
      </ScrollFade>
    </section>
  );
}
