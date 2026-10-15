"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollFade from "../ScrollFade";

type WriteToUsSectionProps = {
  heading?: string;
  image?: { src: string; alt: string };
  tag?: string;
  intro?: string;
  submitLabel?: string;
};

// Matches the content migrated into Sanity's contactPage (see
// lib/sanity/contact.ts and app/write-to-us/page.tsx) -- kept as a
// fallback here in case the fetch ever comes back empty, not the
// source of truth. Form field labels/placeholders (Name, Email,
// Message) stay hardcoded below -- structural form chrome, not
// editorial content.
const DEFAULT_IMAGE = {
  src: "/assets/write-to-us-water.jpg",
  alt: "Dark, textured ocean water seen from above",
};

/**
 * "Write to Us" contact form (Figma node 205:625, image re-synced
 * against node 288:11889 -- a dark ocean-water photo, not the palm-
 * trees shot every other page's photo band uses): a tall photo beside
 * a label + intro paragraph, three fields (Name, Email, Message), and
 * a Send button. Fields are real, typeable inputs/textarea -- the
 * Figma "placeholder" text becomes an actual HTML placeholder rather
 * than static copy. Submit posts to /api/write-to-us, which stores a
 * `lead` in the private leads dataset (see lib/sanity/leadsClient.ts).
 * Heading/image/tag/intro/submit label come from Sanity's contactPage.
 */
export default function WriteToUsSection({
  heading = "Write to Us",
  image = DEFAULT_IMAGE,
  tag = "LET US KNOW YOUR THOUGHTS",
  intro = "Whether one of the remaining Editions feels right, or you'd simply like to know more about the practice, we'd genuinely love to hear from you.",
  submitLabel = "Send",
}: WriteToUsSectionProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/write-to-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"), // honeypot, left empty by real visitors
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="write-to-us">
      <ScrollFade>
        <h1 className="section-heading">{heading}</h1>
        <hr className="values__divider" />
        <div className="write-to-us__row">
          <div className="write-to-us__image">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 900px) 470px, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          <form className="write-to-us__form-col" onSubmit={handleSubmit}>
            <div className="write-to-us__intro">
              <div className="values__tag">
                <span className="values__dot" />
                <span>{tag}</span>
              </div>
              <p>{intro}</p>
            </div>

            <div className="write-to-us__fields">
              <div className="write-to-us__field">
                <label htmlFor="write-to-us-name">Name</label>
                <input
                  id="write-to-us-name"
                  name="name"
                  type="text"
                  placeholder="Your name here"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="write-to-us__field">
                <label htmlFor="write-to-us-email">Email</label>
                <input
                  id="write-to-us-email"
                  name="email"
                  type="email"
                  placeholder="Your email here"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="write-to-us__field">
                <label htmlFor="write-to-us-message">Message</label>
                <textarea
                  id="write-to-us-message"
                  name="message"
                  placeholder="Tell us what your thoughts"
                  rows={4}
                  required
                />
              </div>

              {/* Honeypot -- hidden from people and assistive tech; bots that
                fill every field give themselves away. */}
              <div className="write-to-us__hp" aria-hidden="true">
                <label htmlFor="write-to-us-website">Website</label>
                <input
                  id="write-to-us-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="write-to-us__actions">
              <button
                type="submit"
                className="write-to-us__submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : submitLabel}
              </button>

              <p
                className="write-to-us__status"
                role="status"
                aria-live="polite"
              >
                {status === "sent" &&
                  "Thank you. Your message has been received, and we'll be in touch."}
                {status === "error" &&
                  "Something went wrong. Please try again, or write to info@colvinhaven.com."}
              </p>
            </div>
          </form>
        </div>
      </ScrollFade>
    </section>
  );
}
