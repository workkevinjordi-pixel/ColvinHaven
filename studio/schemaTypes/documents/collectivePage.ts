import { defineField, defineType } from "sanity";

/**
 * Singleton (_id: "collectivePage") for the /collective page's own
 * content: Foundation -> Craft (its own heading now reads "COLLECTIVE"
 * on the current Figma frame, node 391:1394 -- the field/component are
 * still named "craft" internally, not renamed, to avoid unrelated
 * churn) -> standalone photo band -> Inspiration, now with its own
 * gallery row folded in (node 391:1394 redesign: no more tag, no more
 * marquee -- a static row, so `inspirationGallery` replaced the old
 * `filmstrip` field entirely, dropping the now-unused `wide` toggle).
 * Publications (the same list every edition/news page reuses) is its
 * own "publication" document type, not part of this singleton -- see
 * studio/schemaTypes/documents/publication.ts.
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
      description: "No label tag in this section's current design -- the tag field below stays unused.",
      type: "statementBlock",
    }),
    defineField({
      name: "inspirationGallery",
      title: "Inspiration gallery (5 photos, no captions)",
      type: "array",
      of: [{ type: "imageWithAlt" }],
      validation: (Rule) => Rule.length(5),
    }),
  ],
  preview: { prepare() { return { title: "Collective Page" }; } },
});
