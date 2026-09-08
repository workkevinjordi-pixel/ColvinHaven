"use client";

import Image from "next/image";
import ScrollFade from "../ScrollFade";

/**
 * "Write to Us" contact form (Figma node 205:625): a tall photo beside a
 * label + intro paragraph, three fields (Name, Email, Message), and a
 * Send button. Fields are real, typeable inputs/textarea -- the Figma
 * "placeholder" text becomes an actual HTML placeholder rather than
 * static copy. Submit is wired (preventDefault, no-op) but doesn't send
 * anywhere yet -- that action is defined later.
 */
export default function WriteToUsSection() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Intentionally a no-op for now -- the send action is defined later.
  }

  return (
    <section className="write-to-us">
      <ScrollFade>
        <h1 className="section-heading">Write to Us</h1>
        <hr className="values__divider" />
        <div className="write-to-us__row">
          <div className="write-to-us__image">
            <Image
              src="/assets/collective/palm-trees-2.png"
              alt="Silhouetted palm trees against a golden dusk sky"
              fill
              sizes="(min-width: 900px) 470px, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          <form className="write-to-us__form-col" onSubmit={handleSubmit}>
            <div className="write-to-us__intro">
              <div className="values__tag">
                <span className="values__dot" />
                <span>LET US KNOW YOUR THOUGHTS</span>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              </p>
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
            </div>

            <button type="submit" className="write-to-us__submit">
              Send
            </button>
          </form>
        </div>
      </ScrollFade>
    </section>
  );
}
