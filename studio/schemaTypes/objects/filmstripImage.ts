import { defineField, defineType } from "sanity";

/**
 * One slide of Filmstrip.tsx's alternating narrow/wide image strip --
 * `wide` toggles the 443px-vs-284px width class.
 */
export default defineType({
  name: "filmstripImage",
  title: "Filmstrip image",
  type: "object",
  fields: [
    defineField({ name: "image", type: "imageWithAlt" }),
    defineField({
      name: "wide",
      title: "Wide slide",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { media: "image.asset", title: "image.alt", wide: "wide" },
    prepare({ media, title, wide }) {
      return { media, title: title || "(no alt text)", subtitle: wide ? "wide" : undefined };
    },
  },
});
