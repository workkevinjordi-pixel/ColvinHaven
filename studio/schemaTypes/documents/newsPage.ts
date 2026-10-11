import { defineField, defineType } from "sanity";

/**
 * Singleton (_id: "newsPage") for /news's own page-level content:
 * What's Cooking -> filmstrip band -> Mori profile -> Social Action ->
 * closing pull quote. Publications (shared with Collective) stays its
 * own "publication" document type, not part of this singleton.
 */
export default defineType({
  name: "newsPage",
  title: "News Page",
  type: "document",
  fields: [
    defineField({
      name: "whatsCooking",
      title: "What's Cooking",
      type: "object",
      fields: [
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "subtitle", title: "Subtitle kicker", type: "string" }),
        defineField({ name: "column1", title: "Column 1 items", type: "array", of: [{ type: "checklistItem" }] }),
        defineField({ name: "column2", title: "Column 2 items", type: "array", of: [{ type: "checklistItem" }] }),
      ],
    }),
    defineField({
      name: "filmstripBand",
      title: "Filmstrip band",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "lead", title: "Lead paragraph", type: "text" }),
        defineField({ name: "images", title: "Filmstrip images", type: "array", of: [{ type: "filmstripImage" }] }),
      ],
    }),
    defineField({
      name: "moriProfile",
      title: "Mori Profile",
      type: "object",
      fields: [
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "description", type: "text" }),
        defineField({ name: "landSize", title: "Land size fact", type: "string" }),
        defineField({ name: "timeToComplete", title: "Timeline fact", type: "string" }),
        defineField({ name: "heroImage", type: "imageWithAlt" }),
        defineField({ name: "paragraphs", type: "array", of: [{ type: "text" }] }),
      ],
    }),
    defineField({
      name: "socialAction",
      title: "Social Action",
      type: "object",
      fields: [
        defineField({ name: "statement", title: "Statement", type: "statementBlock" }),
        defineField({ name: "bandImage", title: "Photo band image", type: "imageWithAlt" }),
      ],
    }),
    defineField({
      name: "pullQuote",
      title: "Closing pull quote",
      type: "object",
      fields: [
        defineField({ name: "collageImageA", title: "Collage image (back)", type: "imageWithAlt" }),
        defineField({ name: "collageImageB", title: "Collage image (front)", type: "imageWithAlt" }),
        defineField({ name: "quoteText", type: "text" }),
      ],
    }),
  ],
  preview: { prepare() { return { title: "News Page" }; } },
});
