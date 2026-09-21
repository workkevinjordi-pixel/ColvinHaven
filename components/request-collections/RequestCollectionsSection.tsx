"use client";

import Image from "next/image";
import ScrollFade from "../ScrollFade";

/**
 * "The Collections" lead-magnet request form (Figma node 274:11373):
 * a tall photo beside a label + intro paragraph, three fields (Name,
 * Email, and a "What draws you to Colvin Haven?" message), a filled
 * "Request the collections" submit button, and a privacy note below
 * it. Reached from CH Collections' "Access to CH Collections" CTA on
 * the Editions page.
 *
 * Structurally close to Write to Us (same 470x649 image, same 115px
 * row gap, same field pattern) but kept as its own scoped
 * .request-collections__* block rather than reusing .write-to-us__*
 * directly, per this file's established convention of not
 * cross-referencing a distant page's classes even when the pattern
 * matches. Fields are real, typeable inputs/textarea -- the Figma
 * "placeholder" text becomes an actual HTML placeholder rather than
 * static copy. Submit is wired (preventDefault, no-op) but doesn't
 * send anywhere yet -- that action is defined later.
 */
export default function RequestCollectionsSection() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Intentionally a no-op for now -- the send action is defined later.
  }

  return (
    <section className="request-collections">
      <ScrollFade>
        <h1 className="section-heading">The Collections</h1>
        <hr className="values__divider" />
        <div className="request-collections__row">
          <div className="request-collections__image">
            <Image
              src="/assets/request-collection/porch-detail.jpg"
              alt="A shou sugi ban-clad entrance with a timber bench, seen beneath an overhanging shingled roof"
              fill
              sizes="(min-width: 900px) 470px, 100vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <form className="request-collections__form-col" onSubmit={handleSubmit}>
            <div className="request-collections__intro">
              <div className="values__tag">
                <span className="values__dot" />
                <span>Access to CH Collections</span>
              </div>
              <p>
                Seven Editions, total, ever. A private look at where each
                one stands today, and which are still able to be claimed.
              </p>
            </div>

            <div className="request-collections__fields">
              <div className="request-collections__field">
                <label htmlFor="request-collections-name">Name</label>
                <input
                  id="request-collections-name"
                  name="name"
                  type="text"
                  placeholder="Your name here"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="request-collections__field">
                <label htmlFor="request-collections-email">Email</label>
                <input
                  id="request-collections-email"
                  name="email"
                  type="email"
                  placeholder="Your email here"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="request-collections__field">
                <label htmlFor="request-collections-message">
                  What draws you to Colvin Haven?
                </label>
                <textarea
                  id="request-collections-message"
                  name="message"
                  placeholder="Tell us about it"
                  rows={4}
                  required
                />
              </div>
            </div>

            <div className="request-collections__submit-row">
              <button type="submit" className="request-collections__submit">
                Request the collections
              </button>
              <p className="request-collections__note">
                Sent privately. Never shared. Never published.
              </p>
            </div>
          </form>
        </div>
      </ScrollFade>
    </section>
  );
}
