import { defineField, defineType } from "sanity";

/** The homepage's own "heading, paragraphs, italic arrow-link" blurb
 * shape -- used twice (editionsIntro, collectiveIntro on the homepage
 * document), independently editable even though both currently share
 * the same paragraph text. */
export default defineType({
  name: "textIntro",
  title: "Text intro",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({
      name: "paragraphs",
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
