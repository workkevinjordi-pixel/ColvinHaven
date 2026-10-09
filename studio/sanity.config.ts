import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import type { StructureResolver } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

// "Homepage" is a singleton -- exactly one document, explicit
// `_id: "homepage"` (set by scripts/migrate-homepage.ts) -- so it gets
// its own direct-edit list item instead of the generic "list of
// Homepage documents, +Create new" view every other document type
// gets by default, which would otherwise invite creating duplicates of
// a document that only ever makes sense as one.
const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Homepage")
        .child(S.document().schemaType("homepage").documentId("homepage")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== "homepage",
      ),
    ]);

export default defineConfig({
  name: "default",
  title: "Colvin Haven",

  projectId: "2gbg82w2",
  dataset: "production",

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
