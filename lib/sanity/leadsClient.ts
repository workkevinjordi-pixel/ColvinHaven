import { createClient } from "next-sanity";

/**
 * Write-only client for the PRIVATE "leads" dataset that collects form
 * submissions (names, emails, messages). The site's public dataset
 * ("production") is readable by anyone without a token, so personal data
 * must never be written there -- getLeadsClient() returns null (and the
 * API route refuses to run) unless the leads dataset is configured AND
 * differs from the public one.
 *
 * Only imported from server code (the API route). Env (set in Vercel, never NEXT_PUBLIC_):
 *   SANITY_LEADS_DATASET  name of the private dataset, e.g. "leads"
 *   SANITY_LEADS_TOKEN    API token with write access to that dataset
 */
export function getLeadsClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_LEADS_DATASET;
  const token = process.env.SANITY_LEADS_TOKEN;

  if (!projectId || !dataset || !token) return null;
  if (dataset === process.env.NEXT_PUBLIC_SANITY_DATASET) return null;

  return createClient({
    projectId,
    dataset,
    token,
    apiVersion: "2026-10-09",
    useCdn: false,
  });
}
