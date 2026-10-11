import { defineField, defineType } from "sanity";

/**
 * Singleton (_id: "requestCollectionsPage") for
 * /request-the-collections. Form field labels/placeholders stay
 * hardcoded in RequestCollectionsSection.tsx, same boundary as
 * contactPage.
 */
export default defineType({
  name: "requestCollectionsPage",
  title: "Request the Collections Page",
  type: "document",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "image", type: "imageWithAlt" }),
    defineField({ name: "tag", title: "Label tag", type: "string" }),
    defineField({ name: "intro", title: "Intro paragraph", type: "text" }),
    defineField({ name: "submitLabel", title: "Submit button label", type: "string" }),
    defineField({ name: "privacyNote", title: "Privacy note (under the button)", type: "string" }),
  ],
  preview: { prepare() { return { title: "Request the Collections Page" }; } },
});
