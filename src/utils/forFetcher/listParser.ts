import { countIndentWidth } from './string';

export interface ListItem {
  title: string;
  descriptionLines: string[];
}

// Example:
//   item1      Description of item1
//   item2      Description of item2
//              Description can be multi-line
//   long item  Description of long item
// Rules:
// - Title must not contain more than 2 spaces in sequence, but description can.
// - Title and description need to have at least 2 spaces between them.
// - All the descriptions must start at the same column.
// Empty lines between description lines of the same item are not preserved.
export const parseTabbedTextList = (list: string): ListItem[] => {
  const lines = list.split('\n');
  return abstractParseTabbedTextList(lines, (line) => {
    const indentWidth = countIndentWidth(line);
    const withoutIndent = line.slice(indentWidth);
    const firstMultiSpaceIndex = withoutIndent.indexOf('  ') + indentWidth;
    // If multi space is not found, the line doesn't have a description.
    if (firstMultiSpaceIndex < 0) {
      return line.length;
    }
    const description = line.slice(firstMultiSpaceIndex).trimLeft();
    const descriptionIndentWidth = line.length - description.length;
    return descriptionIndentWidth;
  });
};

const abstractParseTabbedTextList = (
  lines: string[],
  // A function to count the indent width of description when the line has a title.
  countDescriptionIndentWidth: (line: string) => number
): ListItem[] => {
  const isEmpty = lines.map((line) => line.trim().length === 0);
  if (isEmpty.every((empty) => empty)) {
    return [];
  }
  const titleIndentWidth = Math.min(
    ...lines
      .filter((_line, index) => !isEmpty[index])
      .map((line) => countIndentWidth(line))
  );

  const listItems: ListItem[] = [];
  let currentDescriptionIndentWidth: number | null = null;
  let inItem = false; // If the current line is directly connected to the line that has a title
  for (const [index, line] of lines.entries()) {
    const indentWidth = countIndentWidth(line);
    // The line contains title and description.
    if (indentWidth === titleIndentWidth) {
      currentDescriptionIndentWidth = countDescriptionIndentWidth(line);
      const title = line.slice(0, currentDescriptionIndentWidth).trim();
      const description = line.slice(currentDescriptionIndentWidth);
      listItems.push({
        title,
        descriptionLines: [description],
      });
      inItem = true;
      continue;
    }
    // The line contains only description.
    if (
      inItem &&
      currentDescriptionIndentWidth != null &&
      indentWidth >= currentDescriptionIndentWidth
    ) {
      const description = line.slice(currentDescriptionIndentWidth);
      listItems[listItems.length - 1].descriptionLines.push(description);
      continue;
    }
    // The line separates items.
    if (!isEmpty[index]) {
      inItem = false;
    }
  }
  return listItems;
};
