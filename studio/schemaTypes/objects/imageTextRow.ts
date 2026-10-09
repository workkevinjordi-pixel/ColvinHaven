import { defineField, defineType } from "sanity";

/**
 * The site's "main photo + paragraphs beside a smaller side photo +
 * caption" row -- used twice per edition (row1 near the top of the
 * story, row4 near the end), same shape both times.
 */
export default defineType({
  name: "imageTextRow",
  title: "Image + text row",
  type: "object",
  fields: [
    defineField({
      name: "main",
      type: "object",
      fields: [
        defineField({ name: "image", type: "imageWithAlt" }),
        defineField({
          name: "text",
          title: "Paragraphs",
          type: "array",
          of: [{ type: "text" }],
        }),
      ],
    }),
    defineField({
      name: "side",
      type: "object",
      fields: [
        defineField({ name: "image", type: "imageWithAlt" }),
        defineField({ name: "text", title: "Caption", type: "text" }),
      ],
    }),
  ],
});
