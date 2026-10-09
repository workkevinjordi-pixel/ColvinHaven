import { defineField, defineType } from "sanity";

/** "storyB" -- mirror of storyBlock, image-left/text-right, whose
 * closing paragraph has one embedded link (e.g. "Bali"). */
export default defineType({
  name: "storyBlockWithLink",
  title: "Story block with link",
  type: "object",
  fields: [
    defineField({ name: "image", type: "imageWithAlt" }),
    defineField({
      name: "paragraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "linkParagraph",
      title: "Closing paragraph (with link)",
      type: "object",
      fields: [
        defineField({ name: "before", title: "Text before the link", type: "text" }),
        defineField({ name: "linkText", title: "Link text", type: "string" }),
        defineField({ name: "linkHref", title: "Link URL", type: "url" }),
        defineField({ name: "after", title: "Text after the link", type: "text" }),
      ],
    }),
  ],
});
