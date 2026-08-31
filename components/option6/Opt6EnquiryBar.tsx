"use client";

/**
 * The reservation-bar motif from luxury-hotel sites, adapted to a studio
 * that takes a handful of clients a year: two selects and a button. It
 * doesn't submit anywhere -- it eases the page down to the enquiry
 * section, which is the real call to action.
 */
export default function Opt6EnquiryBar() {
  const toInquiry = () => {
    document
      .getElementById("inquiry")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <form
      className="opt6-bar"
      onSubmit={(e) => {
        e.preventDefault();
        toInquiry();
      }}
    >
      <label className="opt6-bar__field">
        <span>Edition</span>
        <select defaultValue="">
          <option value="" disabled>
            Select
          </option>
          <option>Edition — Umah Tsuki</option>
          <option>Edition — Umah Sora</option>
          <option>A bespoke commission</option>
        </select>
      </label>
      <span className="opt6-bar__rule" aria-hidden="true" />
      <label className="opt6-bar__field">
        <span>Timeline</span>
        <select defaultValue="">
          <option value="" disabled>
            Select
          </option>
          <option>Within a year</option>
          <option>One to two years</option>
          <option>Still exploring</option>
        </select>
      </label>
      <button type="submit" className="opt6-bar__submit">
        Begin Enquiry
      </button>
    </form>
  );
}
