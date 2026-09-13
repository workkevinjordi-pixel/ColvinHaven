import ScrollFade from "../ScrollFade";

/**
 * Closing pull-quote (Figma node 216:4726, new): a large, left-indented
 * statement -- distinct from the site's existing Quote component (which
 * is centered with a giant quotation mark glyph); this one is plain,
 * left-aligned body copy at a much larger size, so it gets its own
 * simple markup rather than reusing Quote.
 */
export default function PullQuote() {
  return (
    <section className="news-pull-quote">
      <ScrollFade>
        <p>
          “Colvin Haven is more than just building a house. It’s about
          creating an environment, fostering a community, and building a
          lifestyle around it.”
        </p>
      </ScrollFade>
    </section>
  );
}
