import Image from "next/image";
import ScrollFade from "../ScrollFade";

type PullQuoteProps = {
  collageImageA?: { src: string; alt: string };
  collageImageB?: { src: string; alt: string };
  quoteText?: string;
};

// Matches the content migrated into Sanity's newsPage.pullQuote (see
// lib/sanity/newsPage.ts and app/news/page.tsx) -- kept as a fallback
// here in case the fetch ever comes back empty, not the source of
// truth.
const DEFAULT_COLLAGE_A = {
  src: "/assets/news/pullquote-ceiling-detail.jpg",
  alt: "A warm timber ceiling and roofline overhang above a dark board-and-batten facade",
};
const DEFAULT_COLLAGE_B = {
  src: "/assets/news/pullquote-walkway-pond.jpg",
  alt: "A timber walkway over a koi pond leading toward a dark timber pavilion",
};
const DEFAULT_QUOTE =
  "“Colvin Haven is more than just building a house. It’s about creating an environment, fostering a community, and building a lifestyle around it.”";

/**
 * Closing pull-quote (Figma node 368:40125, replacing 216:4726): a
 * two-photo collage beside the quote text -- same overlapping-offset
 * 637x584 box as Collective's Foundation section. Content now comes
 * from Sanity's newsPage.pullQuote.
 */
export default function PullQuote({
  collageImageA = DEFAULT_COLLAGE_A,
  collageImageB = DEFAULT_COLLAGE_B,
  quoteText = DEFAULT_QUOTE,
}: PullQuoteProps) {
  return (
    <section className="news-pull-quote">
      <ScrollFade className="news-pull-quote__row">
        <div className="news-pull-quote__collage">
          <div className="news-pull-quote__collage-img news-pull-quote__collage-img--a">
            <Image
              src={collageImageA.src}
              alt={collageImageA.alt}
              fill
              sizes="305px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="news-pull-quote__collage-img news-pull-quote__collage-img--b">
            <Image
              src={collageImageB.src}
              alt={collageImageB.alt}
              fill
              sizes="305px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="news-pull-quote__text">
          <p>{quoteText}</p>
        </div>
      </ScrollFade>
    </section>
  );
}
