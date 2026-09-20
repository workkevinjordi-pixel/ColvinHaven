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
              "Every Colvin Haven home begins the same way — trees planted first, always, years before construction starts. The Tumbak Bayuh reforesting project extends that same instinct beyond the boundary of any single property, back into the village the practice calls home.",
              "It's a small, ongoing effort rather than a single gesture — native species replanted alongside the community that will live among them, on the belief that a landscape should be left healthier than it was found.",
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
