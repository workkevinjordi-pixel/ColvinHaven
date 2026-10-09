import { defineField, defineType } from "sanity";

/**
 * A press mention. Shown in two places with two different treatments
 * of the SAME publication:
 *
 * - /collective's own Publications section shows every publication,
 *   every paragraph, alongside the actual magazine cover scan
 *   (`coverImage`).
 * - /news' own Publications section shows only the single most recent
 *   publication (`order` 0), only its first paragraph, alongside a
 *   wider editorial photo (`editorialImage`) instead of the cover scan
 *   -- a genuinely different image for the same publication, not a
 *   smaller crop of the same one, confirmed when this schema was
 *   first modeled from the two already-live, pixel-different usages.
 */
export default defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Outlet name",
      description: 'e.g. "Wallpaper*"',
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display order",
      description:
        "0 = shown first on /collective, and the only one shown on /news. Lower numbers show first.",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Display date",
      description: 'Shown verbatim, e.g. "11/22/24" -- not parsed as a real date.',
      type: "string",
    }),
    defineField({
      name: "paragraphs",
      title: "Paragraphs",
      description:
        "/news shows only the first paragraph; /collective shows all of them.",
      type: "array",
      of: [{ type: "text" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "readMoreHref",
      title: "Read-more URL",
      type: "url",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image (magazine cover, used on /collective)",
      type: "imageWithAlt",
    }),
    defineField({
      name: "editorialImage",
      title: "Editorial image (wide photo, used on /news)",
      type: "imageWithAlt",
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "date", media: "coverImage.asset" },
  },
});
