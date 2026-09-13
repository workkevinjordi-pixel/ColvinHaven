import Image from "next/image";
import ScrollFade from "../ScrollFade";
import ArticleCard from "./ArticleCard";

/**
 * "Environmental Actions" (Figma node 212:4646, new section): heading +
 * divider, no tag, then a row pairing an ArticleCard (no "Read more")
 * with a tall uncaptioned side image -- same 790/403 proportions as
 * Collective's Craft row, but scoped to its own classes rather than
 * reused directly (per this file's convention: visually-similar
 * sections get their own scoped rules, not cross-page class sharing).
 */
export default function EnvironmentalActions() {
  return (
    <section className="statement-section">
      <ScrollFade>
        <h2 className="section-heading">Environmental Actions</h2>
        <hr className="values__divider" />
        <div className="news-envaction__row">
          <ArticleCard
            image={{
              src: "/assets/news/sora-moment-2.png",
              alt: "A koi pond bordered by stone and ferns",
            }}
            date="11/22/24"
            title="Tumbak Bayuh Reforesting"
            description={[
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            ]}
          />
          <div className="news-envaction__side">
            <Image
              src="/assets/news/envaction-tall.png"
              alt="A traditional Balinese umbrella beneath a large tree, reflected in glass"
              fill
              sizes="(min-width: 900px) 403px, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </ScrollFade>
    </section>
  );
}
