import { NextResponse } from "next/server";
import { getLeadsClient } from "@/lib/sanity/leadsClient";

// Write to Us submissions -> a `lead` document in the private leads
// dataset (see lib/sanity/leadsClient.ts). Responses are deliberately
// generic: no field-level hints beyond what the form itself validates,
// and nothing about the CMS leaks to the client.

export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 20_000;
const LIMITS = { name: 120, email: 254, message: 5000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort, per-instance rate limit (serverless instances don't share
// memory, so this only slows a single hot instance -- the honeypot and
// validation do most of the anti-spam work).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true; // non-browser clients; the other checks still apply
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

function fail(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail(403, "forbidden");

  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return fail(413, "too_large");

  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (rateLimited(ip)) return fail(429, "rate_limited");

  let body: Record<string, unknown>;
  try {
    const parsed = await req.json();
    if (typeof parsed !== "object" || parsed === null) return fail(400, "invalid");
    body = parsed as Record<string, unknown>;
  } catch {
    return fail(400, "invalid");
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (
    !name || name.length > LIMITS.name ||
    !email || email.length > LIMITS.email || !EMAIL_RE.test(email) ||
    !message || message.length > LIMITS.message
  ) {
    return fail(400, "invalid");
  }

  const client = getLeadsClient();
  if (!client) {
    console.error("write-to-us: leads dataset/token not configured");
    return fail(503, "unavailable");
  }

  try {
    await client.create({
      _type: "lead",
      name,
      email,
      message,
      source: "write-to-us",
      submittedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("write-to-us: failed to store lead", (err as Error).name);
    return fail(500, "failed");
  }

  return NextResponse.json({ ok: true });
}
