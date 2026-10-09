import { defineField, defineType } from "sanity";

/**
 * One Colvin Haven edition's full story -- the canonical content every
 * page's own full-story components (EditionSpotlight on
 * /editions/[slug] and /editions-new, EditionStorySummary on
 * /editions) are built from.
 *
 * Deliberately NOT included here: the dozen-odd "editionsXxx" fields
 * (editionsBanner1, editionsStoryAImage, editionsHeroImage, etc.) that
 * exist in the web app's own editions-data.ts. Those are narrow,
 * page-specific technical overrides that exist only because a handful
 * of individual Figma frames happened to crop/swap one image
 * differently from the edition's own canonical photo for that slot --
 * not editorial content a content manager would naturally reach for.
 * They stay hardcoded in the web app, layered on top of this
 * document's own fields via the same `??` fallback pattern already
 * established there.
 */
export default defineType({
  name: "edition",
  title: "Edition",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      description: 'Plain name, e.g. "Umah Tsuki".',
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "index",
      title: "Roman-numeral index",
      description: 'e.g. "I/VII"',
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "exploreLabel",
      title: "Explore link label",
      description: 'e.g. "Explore Umah Tsuki"',
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Poetic title",
      description: 'e.g. "TSUKI (月 - Moon)" -- used further down the body copy.',
      type: "string",
    }),
    defineField({
      name: "listSummary",
      title: "List-row summary (2 paragraphs)",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "meta",
      title: "Meta row",
      type: "object",
      fields: [
        defineField({ name: "type", type: "string" }),
        defineField({ name: "location", type: "string" }),
        defineField({ name: "year", type: "string" }),
      ],
    }),
    defineField({
      name: "specs",
      title: "Info-row specs",
      type: "array",
      of: [{ type: "spec" }],
    }),
    defineField({
      name: "craftText",
      title: "Info-row paragraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({ name: "portraitImage", type: "imageWithAlt" }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      description: "Shared by the Editions-list row and the detail page's top banner.",
      type: "imageWithAlt",
    }),
    defineField({
      name: "detailHeroImage",
      title: "Hero image (detail-page override)",
      description: "Optional. Falls back to the hero image above when unset.",
      type: "imageWithAlt",
    }),
    defineField({
      name: "listImage",
      title: "Hero image (list-row override)",
      description: "Optional. Falls back to the hero image above when unset.",
      type: "imageWithAlt",
    }),
    defineField({ name: "row1", type: "imageTextRow" }),
    defineField({ name: "banner1", title: "Banner photo", type: "imageWithAlt" }),
    defineField({ name: "storyA", type: "storyBlock" }),
    defineField({
      name: "galleryRow",
      title: "Gallery row (3 photos)",
      type: "array",
      of: [{ type: "imageWithAlt" }],
    }),
    defineField({
      name: "galleryRow2",
      title: "Second gallery row (3 photos)",
      description: "Optional. Falls back to the gallery row above when unset.",
      type: "array",
      of: [{ type: "imageWithAlt" }],
    }),
    defineField({ name: "storyB", type: "storyBlockWithLink" }),
    defineField({ name: "quoteBanner", type: "quoteBanner" }),
    defineField({ name: "row4", type: "imageTextRow" }),
    defineField({
      name: "closingBanner",
      title: "Closing banner photo",
      description: "Optional full-bleed photo right before \"Next Editions\".",
      type: "imageWithAlt",
    }),
    defineField({
      name: "nextEdition",
      title: "Next edition",
      description: 'The other edition to link to from this one\'s "Next Editions" band.',
      type: "reference",
      to: [{ type: "edition" }],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "index", media: "heroImage.asset" },
  },
});
