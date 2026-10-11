import { defineField, defineType } from "sanity";

/**
 * The site's "heading, divider, label-tag, paragraph column" shape --
 * StatementSection.tsx's own props (heading/tag/paragraphs), reused
 * across Collective's Inspiration, News' Social Action, and Editions'
 * CH Collections. `subtitle` is optional -- only News' "What's
 * Cooking" heading row uses it.
 */
export default defineType({
  name: "statementBlock",
  title: "Statement block",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({
      name: "subtitle",
      title: "Subtitle (optional kicker beside the heading)",
      type: "string",
    }),
    defineField({ name: "tag", title: "Label tag", type: "string" }),
    defineField({
      name: "paragraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
  ],
});
