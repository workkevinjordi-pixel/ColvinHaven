import { defineField, defineType } from "sanity";

/**
 * Singleton -- there is exactly one of these (explicit `_id: "homepage"`,
 * set by scripts/migrate-homepage.ts and enforced in the Studio's own
 * structure, see sanity.config.ts's own `structure` function). Covers
 * every editable piece of homepage content: Hero, the "CRAFTING SPACES,
 * LIVING SLOWLY." statement, the 3-photo quote row, the "Editions" and
 * "Collective" intro blurbs, the 5-photo "Approach" gallery, and the
 * closing inquiry banner's own text.
 *
 * Deliberately NOT covered: the animated line-drawing illustration
 * (Drawing/StaticDrawing -- a signature piece of custom SVG artwork,
 * not a swappable content photo) and the Navbar/Footer/SplashScreen
 * (site-wide chrome, not homepage-specific content).
 */
export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "tagline", type: "string" }),
        defineField({ name: "backgroundImage", type: "imageWithAlt" }),
      ],
    }),
    defineField({
      name: "craftingStatement",
      title: '"Crafting spaces, living slowly" statement',
      type: "object",
      fields: [
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "body", type: "text" }),
      ],
    }),
    defineField({
      name: "quoteRow",
      title: "Three-photo quote row",
      description:
        "Exactly 3 items, left to right. Each item's own fixed display width is set in code, not here.",
      type: "array",
      of: [
        {
          type: "object",
          name: "quoteRowItem",
          fields: [
            defineField({ name: "image", type: "imageWithAlt" }),
            defineField({ name: "caption", type: "text" }),
          ],
        },
      ],
      validation: (Rule) => Rule.length(3),
    }),
    defineField({
      name: "editionsIntro",
      title: '"Editions" intro',
      type: "textIntro",
    }),
    defineField({
      name: "approachGallery",
      title: '"Approach" gallery',
      description:
        "Exactly 5 items, left to right. The middle (\"Stillness\") slot's own fixed narrower width is set in code, not here.",
      type: "array",
      of: [
        {
          type: "object",
          name: "approachGalleryItem",
          fields: [
            defineField({ name: "image", type: "imageWithAlt" }),
            defineField({ name: "caption", title: "Caption (italic)", type: "string" }),
          ],
        },
      ],
      validation: (Rule) => Rule.length(5),
    }),
    defineField({
      name: "collectiveIntro",
      title: '"Collective" intro',
      type: "textIntro",
    }),
    defineField({
      name: "cta",
      title: "Closing inquiry banner",
      type: "object",
      fields: [
        defineField({ name: "text", title: "Line of copy", type: "text" }),
        defineField({ name: "buttonLabel", type: "string" }),
        defineField({
          name: "buttonHref",
          title: "Button link",
          description: 'Internal path, e.g. "/write-to-us".',
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage" };
    },
  },
});
