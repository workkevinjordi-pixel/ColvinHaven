import { defineField, defineType } from "sanity";

/**
 * A "Write to Us" submission. Lives ONLY in the private `leads` dataset
 * (see the "leads" workspace in sanity.config.ts) -- never in the public
 * `production` dataset, which anyone can read without a token. The
 * website creates these through /api/write-to-us; fields are read-only
 * here so a submission can't be edited, only reviewed and deleted.
 */
export default defineType({
  name: "lead",
  title: "Lead",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", readOnly: true }),
    defineField({ name: "email", type: "string", readOnly: true }),
    defineField({ name: "message", type: "text", rows: 6, readOnly: true }),
    defineField({
      name: "source",
      title: "Source form",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "email", date: "submittedAt" },
    prepare({ title, subtitle, date }) {
      return {
        title: title ?? "(no name)",
        subtitle: [subtitle, date ? new Date(date).toLocaleDateString() : null]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
