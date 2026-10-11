import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import type { StructureResolver } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

// Every page-level document below is a singleton -- exactly one
// instance, explicit `_id` set by its own migration script -- so each
// gets a direct-edit list item instead of the generic "list of
// documents, +Create new" view every other document type gets by
// default, which would otherwise invite creating duplicates of a
// document that only ever makes sense as one.
const SINGLETONS: { id: string; title: string }[] = [
  { id: "homepage", title: "Homepage" },
  { id: "editionsPage", title: "Editions Page" },
  { id: "collectivePage", title: "Collective Page" },
  { id: "newsPage", title: "News Page" },
  { id: "contactPage", title: "Contact Page (Write to Us)" },
  { id: "requestCollectionsPage", title: "Request the Collections Page" },
];
const SINGLETON_TYPE_IDS = new Set(SINGLETONS.map((s) => s.id));

const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map((s) =>
        S.listItem()
          .title(s.title)
          .child(S.document().schemaType(s.id).documentId(s.id)),
      ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETON_TYPE_IDS.has(item.getId() ?? ""),
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
