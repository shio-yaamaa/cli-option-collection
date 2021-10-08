import { countIndentWidth } from './string';

interface ListItem {
  title: string;
  descriptionLines: string[];
}

// Example:
//   item1      Description of item1
//   item2      Description of item2
//              Description can be multi-line
//   long item  Description of long item
// Title and description need to have at least 2 spaces between them.
// Empty lines between description lines of the same item are not preserved.
export const parseTabbedTextList = (list: string) => {
  const lines = list.split('\n');
  const isEmpty = lines.map((line) => line.trim().length === 0);
  const titleIndentWidth = lines.reduce<number | null>(
    (previous, current, index) => {
      if (isEmpty[index]) {
        return previous;
      }
      const indentWidth = countIndentWidth(current);
      if (!previous || indentWidth < previous) {
        return indentWidth;
      }
      return previous;
    },
    null
  );
  if (titleIndentWidth === null) {
    throw new Error('Could not determine titleIndentWidth');
  }
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
  const isDescriptionOnly = lines.map((line) => {
    if (line.length < descriptionIndentWidth) {
      return false;
    }
    const beforeDescription = line.slice(0, descriptionIndentWidth);
    return /^\s*$/.test(beforeDescription);
  });

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
