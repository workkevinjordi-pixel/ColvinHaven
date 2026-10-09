import { defineField, defineType } from "sanity";

/** One stat row in the edition's info panel, e.g. "LAND SIZE" / "2000 m2". */
export default defineType({
  name: "spec",
  title: "Spec",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "value", type: "string", validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});
