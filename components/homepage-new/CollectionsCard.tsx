import ScrollFade from "../ScrollFade";

/**
 * "The Collection" intro (Figma node 401:40), shared by /editions and
 * /editions-new: a centered text block -- eyebrow, a small kicker over
 * the Cormorant heading, an italic lead, three short lines, and an
 * italic arrow link into the request-access page. Replaces the earlier
 * poster-card-beside-text "CH Collections" layout (node 298:13396)
 * outright, on explicit request. Copy ported from the frame verbatim.
 */
export default function CollectionsCard() {
  return (
    <section className="hpn-collections">
      <ScrollFade className="hpn-collections__inner">
        <p className="hpn-collections__eyebrow">THE COLLECTION</p>
        <div className="hpn-collections__heading-group">
          <p className="hpn-collections__subtitle">
            Two series so far, both in Indonesia
          </p>
          <h2 className="hpn-collections__heading">
            TSUKI, THE MOON. SORA, THE SKY
          </h2>
        </div>
        <div className="hpn-collections__body">
          <p className="hpn-collections__lead">Each closes when it’s complete.</p>
          <div className="hpn-collections__text">
            <p>Some are complete,</p>
            <p>Some are under construction,</p>
            <p>Some are still waiting for their land</p>
          </div>
        </div>
        <a href="/request-the-collections" className="hpn-collections__link">
          Request access to see what’s underway and what’s available{" "}
          <span aria-hidden="true">→</span>
        </a>
      </ScrollFade>
    </section>
  );
}
