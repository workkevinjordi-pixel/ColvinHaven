import { defineField, defineType } from "sanity";

/** One row of News' "What's Cooking" two-column checklist. */
export default defineType({
  name: "checklistItem",
  title: "Checklist item",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "description", type: "text" }),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
});
