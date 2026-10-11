import { defineField, defineType } from "sanity";

/**
 * The homepage's own "heading, paragraphs, italic arrow-link" blurb
 * shape -- used twice (editionsIntro, collectiveIntro on the homepage
 * document). `eyebrow`/`subtitle`/`lead`/`note` are optional additions
 * from each variant's own centered redesign (Editions: node 385:1275,
 * a small label above the heading, a kicker line under it, and an
 * italic lead sentence above the body paragraphs. Collective: node
 * 385:1370, a label above the heading and a standalone highlighted
 * line below the body paragraphs, no subtitle/lead of its own) -- each
 * field stays empty on whichever variant doesn't use it. `heading`
 * supports an explicit line break: a "\n" in the value renders as a
 * hard `<br/>`, used by Collective's own two-line heading.
 */
export default defineType({
  name: "textIntro",
  title: "Text intro",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow label (optional, above the heading)",
      type: "string",
    }),
    defineField({
      name: "heading",
      description: 'Use "\\n" for an explicit line break, e.g. Collective\'s two-line heading.',
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle (optional, under the heading)",
      type: "string",
    }),
    defineField({
      name: "lead",
      title: "Lead sentence (optional, italic, above the body paragraphs)",
      type: "text",
    }),
    defineField({
      name: "paragraphs",
      title: "Body paragraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "note",
      title: "Highlighted note (optional, below the body paragraphs, in gold)",
      type: "string",
    }),
    defineField({ name: "linkLabel", type: "string" }),
    defineField({
      name: "linkHref",
      title: "Link",
      description: 'Internal path, e.g. "/editions".',
      type: "string",
    }),
  ],
});
