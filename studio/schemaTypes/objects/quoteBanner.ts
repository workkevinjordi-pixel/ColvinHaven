import { defineField, defineType } from "sanity";

/** Full-bleed banner + pull-quote block, near the end of the story. */
export default defineType({
  name: "quoteBanner",
  title: "Quote banner",
  type: "object",
  fields: [
    defineField({ name: "image", type: "imageWithAlt" }),
    defineField({ name: "heading", title: "Pull-quote", type: "text" }),
    defineField({ name: "body", type: "text" }),
  ],
});
