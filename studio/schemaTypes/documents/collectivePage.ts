import { defineField, defineType } from "sanity";

/**
 * Singleton (_id: "collectivePage") for the /collective page's own
 * content: Foundation -> Craft -> standalone photo band -> Inspiration
 * -> filmstrip. Publications (the same list every edition/news page
 * reuses) is its own "publication" document type, not part of this
 * singleton -- see studio/schemaTypes/documents/publication.ts.
 */
export default defineType({
  name: "collectivePage",
  title: "Collective Page",
  type: "document",
  fields: [
    defineField({
      name: "foundation",
      title: "Foundation",
      type: "object",
      fields: [
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "tag", title: "Label tag", type: "string" }),
        defineField({ name: "collageImageA", title: "Collage image (back)", type: "imageWithAlt" }),
        defineField({ name: "collageImageB", title: "Collage image (front)", type: "imageWithAlt" }),
        defineField({ name: "paragraphs", type: "array", of: [{ type: "text" }] }),
      ],
    }),
    defineField({
      name: "craft",
      title: "Craft",
      type: "object",
      fields: [
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "tag", title: "Label tag", type: "string" }),
        defineField({ name: "row", title: "Image + text row", type: "imageTextRow" }),
      ],
    }),
    defineField({
      name: "photoBand",
      title: "Standalone photo band",
      description: "Full-width photo between Craft and Inspiration.",
      type: "imageWithAlt",
    }),
    defineField({
      name: "inspiration",
      title: "Inspiration",
      type: "statementBlock",
    }),
    defineField({
      name: "filmstrip",
      title: "Filmstrip (Inspiration row)",
      type: "array",
      of: [{ type: "filmstripImage" }],
    }),
  ],
  preview: { prepare() { return { title: "Collective Page" }; } },
});
