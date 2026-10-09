import { defineField, defineType } from "sanity";

/**
 * Every photo on the site is stored as {asset, alt} -- the web app's
 * own fetch-side mapping (lib/sanity/editions.ts) turns this into the
 * plain {src, alt} shape every rendering component already consumes,
 * so no component code needs to change when its image source moves
 * from a hardcoded file path to a Sanity-managed asset.
 */
export default defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "asset",
      title: "Photo",
      type: "image",
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      description: "Describes the photo for screen readers and SEO.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { media: "asset", title: "alt" },
  },
});
