import imageWithAlt from "./objects/imageWithAlt";
import spec from "./objects/spec";
import imageTextRow from "./objects/imageTextRow";
import storyBlock from "./objects/storyBlock";
import storyBlockWithLink from "./objects/storyBlockWithLink";
import quoteBanner from "./objects/quoteBanner";
import textIntro from "./objects/textIntro";
import edition from "./documents/edition";
import publication from "./documents/publication";
import homepage from "./documents/homepage";

export const schemaTypes = [
  // Objects first -- documents reference them by name.
  imageWithAlt,
  spec,
  imageTextRow,
  storyBlock,
  storyBlockWithLink,
  quoteBanner,
  textIntro,
  // Documents
  edition,
  publication,
  homepage,
];
