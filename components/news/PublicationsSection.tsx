import ScrollFade from "../ScrollFade";
import ArticleCard from "./ArticleCard";
import { getLatestPublication } from "@/lib/sanity/publications";

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
 *
 * The publication itself now comes from Sanity (getLatestPublication())
 * -- this shows whichever one has the lowest `order` in the Studio,
 * still just its first paragraph and its own distinct editorial photo
 * (`editorialImage`, not the magazine-cover scan /collective's own
 * Publications section shows for the same publication -- see that
 * field's own comment in lib/sanity/publications.ts).
 */
export default async function PublicationsSection() {
  const publication = await getLatestPublication();
  if (!publication) return null;

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
            image={
              publication.editorialImage ?? { src: "", alt: "" }
            }
            date={publication.date}
            title={publication.title}
            description={[publication.paragraphs[0]]}
            readMore
          />
        </div>
      </ScrollFade>
    </section>
  );
}
