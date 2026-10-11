import StatementSection from "../StatementSection";

type InspirationProps = {
  heading?: string;
  tag?: string;
  paragraphs?: string[];
};

// Matches the content migrated into Sanity's collectivePage.inspiration
// (see lib/sanity/collective.ts and app/collective/page.tsx) -- kept
// as a fallback here in case the fetch ever comes back empty, not the
// source of truth.
const DEFAULT_PARAGRAPHS = [
  "The design language draws from two traditions at once. Japanese and Scandinavian, the two schools that understood minimalism before the word existed. Danish design in particular: furniture and interiors built on the same instinct as a well-run kitchen, nothing decorative, everything earning its place.",
  "That instinct extends to how a home is organized around living, not just looking. Twenty years of service taught one thing above all: people gather in the kitchen, not the living room. So in every Colvin Haven home, the kitchen is never an afterthought it's the room the rest of the house is built around.",
];

export default function Inspiration({
  heading = "Inspiration",
  tag = "WARM WELCOME TO OUR COLLECTIONS",
  paragraphs = DEFAULT_PARAGRAPHS,
}: InspirationProps) {
  return <StatementSection heading={heading} tag={tag} paragraphs={paragraphs} />;
}
