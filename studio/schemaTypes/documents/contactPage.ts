import { defineField, defineType } from "sanity";

/**
 * Singleton (_id: "contactPage") for /write-to-us -- Figma's own frame
 * for this route is literally named "Contact". Form field labels/
 * placeholders (Name, Email, Message) stay hardcoded in
 * WriteToUsSection.tsx -- structural form chrome, not editorial
 * content, same boundary EDITIONS_PAGE_OVERRIDES and Navbar/Footer
 * already draw.
 */
export default defineType({
  name: "contactPage",
  title: "Contact Page (Write to Us)",
  type: "document",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "image", type: "imageWithAlt" }),
    defineField({ name: "tag", title: "Label tag", type: "string" }),
    defineField({ name: "intro", title: "Intro paragraph", type: "text" }),
    defineField({ name: "submitLabel", title: "Submit button label", type: "string" }),
  ],
  preview: { prepare() { return { title: "Contact Page (Write to Us)" }; } },
});
