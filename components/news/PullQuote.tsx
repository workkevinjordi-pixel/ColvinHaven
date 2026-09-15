import Image from "next/image";
import ScrollFade from "../ScrollFade";

/**
 * Closing pull-quote (Figma node 216:4726, updated): a two-photo
 * collage beside the quote text -- same overlapping-offset pattern as
 * Collective's Foundation section (same two source images too), just
 * different box dimensions (637x584 here vs. Foundation's 752x473), so
 * it gets its own scoped classes rather than reusing foundation__*
 * directly, per this file's convention of not cross-referencing distant
 * page-prefixed classes even when the pattern matches.
 */
export default function PullQuote() {
  return (
    <section className="news-pull-quote">
      <ScrollFade className="news-pull-quote__row">
        <div className="news-pull-quote__collage">
          <div className="news-pull-quote__collage-img news-pull-quote__collage-img--a">
            <Image
              src="/assets/editions/tsuki-edition-1.png"
              alt="Detail of Umah Tsuki's shou sugi ban roofline and timber-framed window"
              fill
              sizes="305px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="news-pull-quote__collage-img news-pull-quote__collage-img--b">
            <Image
              src="/assets/editions/tsuki-hero.png"
              alt="Umah Tsuki's black-clad cantilevered volume seen through the surrounding tree canopy"
              fill
              sizes="305px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="news-pull-quote__text">
          <p>
            “Colvin Haven is more than just building a house. It’s about
            creating an environment, fostering a community, and building
            a lifestyle around it.”
          </p>
        </div>
      </ScrollFade>
    </section>
  );
}
