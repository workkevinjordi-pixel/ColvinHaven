/**
 * One-time update: redesigns the singleton "homepage" document's own
 * collectiveIntro field to match node 385:1370 ("Collective" intro
 * redesign) -- adds the eyebrow/note fields, a new two-line heading
 * (joined with "\n", TextIntro.tsx's own line-break signal), and
 * replaces the old three-paragraph SHARED_COPY body with the new
 * two-paragraph body and "Meet the collective" link. Leaves every
 * other field on the document untouched (patch, not a full
 * createIfNotExists rewrite) -- editionsIntro keeps its own already-
 * redesigned shape (see update-editions-intro.ts).
 *
 * Run via `npx sanity exec scripts/update-collective-intro.ts
 * --with-user-token` from within studio/, same mechanism as
 * scripts/update-editions-intro.ts. Safe to re-run -- a patch .set()
 * is idempotent.
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "2gbg82w2",
  dataset: "production",
  apiVersion: "2026-10-09",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

async function main() {
  if (!process.env.SANITY_AUTH_TOKEN) {
    throw new Error(
      "No auth token found -- run this via `npx sanity exec scripts/update-collective-intro.ts --with-user-token`",
    );
  }

  const result = await client
    .patch("homepage")
    .set({
      "collectiveIntro.eyebrow": "COLLECTIVE",
      "collectiveIntro.heading":
        "UMAH TSUKI IS WHERE OUR FOUNDER LIVES,\nSORA WAS BUILT FOR OUR FIRST CLIENT.",
      "collectiveIntro.paragraphs": [
        "Behind both, a small collective of designers and architects, brought together by a cook who learned to build.",
        "Our own Indonesian craftspeople finish every detail by hand.",
      ],
      "collectiveIntro.note": "Visits to Umah Tsuki are by invitation",
      "collectiveIntro.linkLabel": "Meet the collective",
      "collectiveIntro.linkHref": "/collective",
    })
    .commit();

  console.log(`Updated homepage.collectiveIntro: ${result._id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
