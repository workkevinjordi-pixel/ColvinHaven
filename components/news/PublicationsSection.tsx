import ScrollFade from "../ScrollFade";
import ArticleCard from "./ArticleCard";

/**
 * "Publications" (Figma node 205:598, updated): now just one article
 * card (Wallpaper*) beside the tag, reusing the same values__body/aside
 * pattern StatementSection's tag+paragraph layout uses -- just with an
 * ArticleCard standing in the "text" slot instead of paragraphs. The
 * second card (Design Anthology 39) from the previous two-card grid is
 * gone from this section in the updated design.
 */
export default function PublicationsSection() {
  return (
    <section className="statement-section">
      <ScrollFade>
        <h2 className="section-heading">Publications</h2>
        <hr className="values__divider" />
        <div className="values__body">
          <div className="values__aside">
            <div className="values__tag">
              <span className="values__dot" />
              <span>WHAT’S NEW ON OUR SIDE</span>
            </div>
          </div>
          {/* Not .values__text/.statement-section__text -- their `p`
              rules would cascade onto ArticleCard's own paragraphs
              (date, description) and override its spacing. This class
              only replicates values__text's padding-left positioning. */}
          <div className="news-publications__content">
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
        </div>
      </ScrollFade>
    </section>
  );
}
