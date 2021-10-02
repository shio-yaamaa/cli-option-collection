import { countIndentWidth } from './string';

enum LineType {
  TITLE,
  TITLE_AND_DESCRIPTION,
  DESCRIPTION,
  BLANK,
  OTHER,
}

export interface IndentedListItem {
  titles: string[];
  descriptions: string[];
}

// Description can be on the same line as its title if it follows more than two spaces.
// This rule follows the help2man's convention and is necessary for correctly distinguishing titles and descriptions.
export const findIndentedListItems = (
  string: string,
  titleIndentWidth: number,
  descriptionIndentWidth: number
): IndentedListItem[] => {
  const lines = string.split('\n');
  const indentedListItems: IndentedListItem[] = [];
  let lastLineType: LineType | null = null;
  let inItem = false; // If the previous line belongs to an item (either as title or description)

  for (const line of lines) {
    const trimmedLine = line.trim();
    const indentWidth = countIndentWidth(line);
    const lastItem =
      indentedListItems.length > 0
        ? indentedListItems[indentedListItems.length - 1]
        : null;
    let lineType = null;

    if (trimmedLine.length === 0) {
      lineType = LineType.BLANK;
    } else if (indentWidth === titleIndentWidth) {
      const charactersBeforeDescriptionIndent: string = line.slice(
        descriptionIndentWidth - 2,
        descriptionIndentWidth
      );
      const isTitleAndDescriptionOnSameLine =
        charactersBeforeDescriptionIndent === '  ';
      if (isTitleAndDescriptionOnSameLine) {
        lineType = LineType.TITLE_AND_DESCRIPTION;
        const title = line.slice(0, descriptionIndentWidth).trim();
        const description = line.slice(descriptionIndentWidth).trim();
        if (lastItem && lastLineType === LineType.TITLE) {
          lastItem.titles.push(title);
          lastItem.descriptions = [description];
        } else {
          indentedListItems.push({
            titles: [title],
            descriptions: [description],
          });
        }
      } else {
        lineType = LineType.TITLE;
        const title = trimmedLine;
        if (lastItem && lastLineType === LineType.TITLE) {
          lastItem.titles.push(title);
        } else {
          indentedListItems.push({
            titles: [title],
            descriptions: [],
          });
        }
      }
      inItem = true;
    } else if (indentWidth >= descriptionIndentWidth && inItem) {
      lineType = LineType.DESCRIPTION;
      lastItem?.descriptions.push(trimmedLine);
      inItem = true;
    } else {
      lineType = LineType.OTHER;
      inItem = false;
    }
    lastLineType = lineType;
  }

  return indentedListItems.filter((item) => item.descriptions.length > 0);
};
