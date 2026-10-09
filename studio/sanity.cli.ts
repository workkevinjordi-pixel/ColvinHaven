import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "2gbg82w2",
    dataset: "production",
  },
  // Deploy target for `npx sanity deploy` -- the Studio's public,
  // hosted-by-Sanity URL (separate from the Next.js app's own Vercel
  // deploy, per the standalone-Studio pattern: faster builds, auto-
  // updates, no CSS/layout collision with the marketing site's own
  // globals.css).
  studioHost: "colvin-haven",
  deployment: {
    // Pinned so `npx sanity deploy` (e.g. after a future schema change)
    // redeploys to this same app instead of prompting to create a new
    // one -- printed by the first `sanity deploy` run.
    appId: "wuztyrx3kkpt2njcqvb9hl2w",
  },
});
