import { defineField, defineType } from "sanity";

/**
 * Singleton (_id: "collectivePage") for the /collective page's own
 * content: Foundation -> Craft (component/field still named "craft"
 * internally -- a copy-only change doesn't warrant renaming it, see
 * Craft.tsx's own comment) -> standalone photo band -> Inspiration,
 * with its own gallery row folded in -> Publications (its own
 * "publication" document type, not part of this singleton -- see
 * studio/schemaTypes/documents/publication.ts).
 *
 * Re-synced twice against the same Figma frame (node 391:1394) as it
 * kept evolving: Foundation and Craft both now follow a shared
 * "eyebrow label + a short, large serif heading" pattern instead of
 * their original "big plain heading + divider + dot-tag" shell --
 * `tag` on each now holds that short eyebrow text (e.g. "FOUNDATION"),
 * and `heading` holds the new, longer heading sentence (e.g. "A chef
 * who learned to design and build homes.") rather than the single-word
 * section name it used to. Foundation also gained `closingNote`, a
 * standalone italic line in the same gold as the homepage's own
 * Collective intro note.
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
        defineField({ name: "tag", title: "Eyebrow label", description: 'e.g. "FOUNDATION"', type: "string" }),
        defineField({ name: "heading", title: "Heading sentence", type: "text" }),
        defineField({ name: "collageImageA", title: "Collage image (left)", type: "imageWithAlt" }),
        defineField({ name: "collageImageB", title: "Collage image (right)", type: "imageWithAlt" }),
        defineField({ name: "paragraphs", type: "array", of: [{ type: "text" }] }),
        defineField({
          name: "closingNote",
          title: "Closing note (italic, gold)",
          type: "text",
        }),
      ],
    }),
    defineField({
      name: "craft",
      title: "Craft",
      type: "object",
      fields: [
        defineField({ name: "tag", title: "Eyebrow label", description: 'e.g. "COLLECTIVE"', type: "string" }),
        defineField({ name: "heading", title: "Heading sentence", type: "text" }),
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
