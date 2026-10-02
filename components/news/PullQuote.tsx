import Image from "next/image";
import ScrollFade from "../ScrollFade";

/**
 * Closing pull-quote (Figma node 368:40125, replacing 216:4726): a
 * two-photo collage beside the quote text -- same overlapping-offset
 * 637x584 box as Collective's Foundation section, and the quote text
 * itself is unchanged from the previous build. The two collage photos
 * are new though (confirmed via visual check, neither matches any
 * existing site asset): a warm timber ceiling/roofline close-up, and a
 * walkway over a koi pond -- downloaded fresh and run through this
 * project's own export pipeline rather than reusing Tsuki's old hero/
 * edition-1 photos this section used before.
 */
export default function PullQuote() {
  return (
    <section className="news-pull-quote">
      <ScrollFade className="news-pull-quote__row">
        <div className="news-pull-quote__collage">
          <div className="news-pull-quote__collage-img news-pull-quote__collage-img--a">
            <Image
              src="/assets/news/pullquote-ceiling-detail.jpg"
              alt="A warm timber ceiling and roofline overhang above a dark board-and-batten facade"
              fill
              sizes="305px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="news-pull-quote__collage-img news-pull-quote__collage-img--b">
            <Image
              src="/assets/news/pullquote-walkway-pond.jpg"
              alt="A timber walkway over a koi pond leading toward a dark timber pavilion"
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
