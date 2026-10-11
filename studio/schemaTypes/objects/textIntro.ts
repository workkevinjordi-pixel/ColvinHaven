import { defineField, defineType } from "sanity";

/**
 * The homepage's own "heading, paragraphs, italic arrow-link" blurb
 * shape -- used twice (editionsIntro, collectiveIntro on the homepage
 * document). `eyebrow`/`subtitle`/`lead` are optional additions (node
 * 385:1275's own redesign of the "Editions" variant specifically --
 * a small label above the heading, a kicker line under it, and an
 * italic lead sentence above the body paragraph(s)); Collective's own
 * instance leaves all three empty and renders exactly as before.
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
    defineField({ name: "heading", type: "string" }),
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
    defineField({ name: "linkLabel", type: "string" }),
    defineField({
      name: "linkHref",
      title: "Link",
      description: 'Internal path, e.g. "/editions".',
      type: "string",
    }),
  ],
});
