import { defineField, defineType } from "sanity";

/**
 * Singleton (_id: "editionsPage") for the /editions page's own
 * page-level content -- today just EditionsHero's single full-bleed
 * opening photo. Each edition's own story content lives on its own
 * "edition" document, not here.
 */
export default defineType({
  name: "editionsPage",
  title: "Editions Page",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Opening image",
      type: "imageWithAlt",
    }),
  ],
  preview: { prepare() { return { title: "Editions Page" }; } },
});
