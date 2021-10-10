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
  const isEmpty = lines.map((line) => line.trim().length === 0);
  if (isEmpty.every((empty) => empty)) {
    return [];
  }
  const titleIndentWidth = Math.min(
    ...lines
      .filter((_line, index) => !isEmpty[index])
      .map((line) => countIndentWidth(line))
  );
  const hasTitle = lines.map(
    (line) => countIndentWidth(line) === titleIndentWidth
  );
  const descriptionIndentWidth = lines.reduce<number | null>(
    (previous, current, index) => {
      if (isEmpty[index] || !hasTitle[index]) {
        return previous;
      }
      const currentWithoutIndent = current.slice(titleIndentWidth);
      const firstMultiSpaceIndex =
        currentWithoutIndent.indexOf('  ') + titleIndentWidth;
      if (firstMultiSpaceIndex < 0) {
        return previous;
      }
      const description = current.slice(firstMultiSpaceIndex).trimLeft();
      const indentWidth = current.length - description.length;
      if (!previous || indentWidth < previous) {
        return indentWidth;
      }
      return previous;
    },
    null
  );
  if (descriptionIndentWidth === null) {
    throw new Error('Could not determine descriptionIndentWidth');
  }
  if (titleIndentWidth >= descriptionIndentWidth) {
    throw new Error('Invalid indent width');
  }
  const isDescriptionOnly = lines.map(
    (line) => countIndentWidth(line) >= descriptionIndentWidth
  );
  const listItems: ListItem[] = [];
  for (const [index, line] of lines.entries()) {
    if (hasTitle[index]) {
      const title = line.slice(0, descriptionIndentWidth).trim();
      const description = line.slice(descriptionIndentWidth);
      listItems.push({
        title,
        descriptionLines: [description],
      });
      continue;
    }
    if (listItems.length > 0 && isDescriptionOnly[index]) {
      const description = line.slice(descriptionIndentWidth);
      listItems[listItems.length - 1].descriptionLines.push(description);
      continue;
    }
  }
  return listItems;
};

// Example:
//   item1  Description of item1
//   item2  Description of item2
//          Description can be multi-line
//   item with two  spaces  Description of the item with two spaces
// Rules:
// - Title may contain more than 2 spaces in sequence, but description must not.
// - Title and description need to have at least 2 spaces between them.
// - The start column of the description can vary between items.
// Empty lines between description lines of the same item are not preserved.
export const parseTabbedTextList2 = (list: string): ListItem[] => {
  const lines = list.split('\n');
  return abstractParseTabbedTextList(
    lines,
    (line) => line.lastIndexOf('  ') + 2
  );
};

const abstractParseTabbedTextList = (
  lines: string[],
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
