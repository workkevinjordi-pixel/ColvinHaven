import { defineField, defineType } from "sanity";

/** "storyA" -- text-left/image-right side block, no embedded link. */
export default defineType({
  name: "storyBlock",
  title: "Story block",
  type: "object",
  fields: [
    defineField({
      name: "paragraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({ name: "image", type: "imageWithAlt" }),
  ],
});
