import imageWithAlt from "./objects/imageWithAlt";
import spec from "./objects/spec";
import imageTextRow from "./objects/imageTextRow";
import storyBlock from "./objects/storyBlock";
import storyBlockWithLink from "./objects/storyBlockWithLink";
import quoteBanner from "./objects/quoteBanner";
import textIntro from "./objects/textIntro";
import statementBlock from "./objects/statementBlock";
import filmstripImage from "./objects/filmstripImage";
import checklistItem from "./objects/checklistItem";
import edition from "./documents/edition";
import publication from "./documents/publication";
import homepage from "./documents/homepage";
import collectivePage from "./documents/collectivePage";
import contactPage from "./documents/contactPage";
import requestCollectionsPage from "./documents/requestCollectionsPage";
import editionsPage from "./documents/editionsPage";
import newsPage from "./documents/newsPage";

export const schemaTypes = [
  // Objects first -- documents reference them by name.
  imageWithAlt,
  spec,
  imageTextRow,
  storyBlock,
  storyBlockWithLink,
  quoteBanner,
  textIntro,
  statementBlock,
  filmstripImage,
  checklistItem,
  // Documents
  edition,
  publication,
  homepage,
  collectivePage,
  contactPage,
  requestCollectionsPage,
  editionsPage,
  newsPage,
];
