import ScrollFade from "../ScrollFade";
import ArticleCard from "./ArticleCard";

/**
 * "Publications" (Figma node 205:598): one article card (Wallpaper*)
 * beside the tag. Figma's own layout here is a plain flex row with
 * justify-content: space-between (tag pinned left, the fixed-790px card
 * pushed to the row's right edge) -- NOT the values__aside(absolute)/
 * values__text(padding-left: 720px) pattern the paragraph-body
 * StatementSection uses elsewhere. That pattern doesn't fit a
 * fixed-width card: values__text is a plain block, not a flex
 * container, so ArticleCard's `flex: 0 0 790px` had no effect inside it
 * and the card rendered at ~496px (whatever width remained after the
 * 720px inset) instead of 790px -- a real, visible bug this replaces.
 */
export default function PublicationsSection() {
  return (
    <section className="statement-section">
      <ScrollFade>
        <h2 className="section-heading">Publications</h2>
        <hr className="values__divider" />
        <div className="news-publications__row">
          <div className="values__tag">
            <span className="values__dot" />
            <span>WHAT’S NEW ON OUR SIDE</span>
          </div>
          <ArticleCard
            image={{
              src: "/assets/editions/tsuki-edition-1.png",
              alt: "Detail of Umah Tsuki's shou sugi ban roofline and timber-framed window",
            }}
            date="11/22/24"
            title="Wallpaper*"
            description={[
              "We are so pleased for our flagship home, Umah Tsuki, to be featured on Wallpaper.com. Wallpaper* is the global design authority, leading the way in architecture, design, art, entertaining, beauty & grooming, transport, technology, fashion, and watches & jewellery. The article, helmed by Ellie Stathaki, Architecture & Environment Director and writer Natasha Levy is featured in the Architectural Section of the website, which showcases the best of residential and non-commercial living spaces, and the most inspiring of houses and homes.",
            ]}
            readMore
          />
        </div>
      </ScrollFade>
    </section>
  );
}
