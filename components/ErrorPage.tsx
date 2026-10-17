import type { ReactNode } from "react";

type ErrorPageProps = {
  /** Status code shown as the small label and the oversized numeral. */
  code: string;
  title: string;
  text: string;
  /** Links / buttons under the text (use .error-page__link). */
  children?: ReactNode;
  /** Optional support reference (e.g. the error digest). */
  reference?: string;
};

/**
 * Shared layout for the site's error pages (404, 500, and any other status
 * we add): a calm cream page, a tiny label, a large serif title, one
 * sentence, two quiet links, and the status code set huge and faint in
 * gold in the corner. Content is left-aligned on the page gutter, with
 * plenty of air around it.
 */
export default function ErrorPage({
  code,
  title,
  text,
  children,
  reference,
}: ErrorPageProps) {
  return (
    <main className="error-page">
      <div className="error-page__body">
        <p className="error-page__label">Error {code}</p>
        <h1 className="error-page__title">{title}</h1>
        <p className="error-page__text">{text}</p>
        {children && <div className="error-page__actions">{children}</div>}
        {reference && <p className="error-page__ref">Reference: {reference}</p>}
      </div>
      <p className="error-page__numeral" aria-hidden="true">
        {code}
      </p>
    </main>
  );
}
