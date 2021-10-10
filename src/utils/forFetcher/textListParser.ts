import { countIndentWidth } from './string';

export interface ListItem {
  titles: string[];
  descriptionLines: string[];
}

enum LineType {
  // Title that starts an item definition.
  PRIMARY_TITLE,
  // Title that is continued from the previous item.
  SECONDARY_TITLE,
  // Title and description on the same line. The title cannot be a secondary title.
  TITLE_AND_DESCRIPTION,
  // Line that only contains description.
  DESCRIPTION,
  // Line that separates between titles or between descriptions.
  SEPARATOR,
  // Line that looks like a description line but separated from items by a separator.
  NOT_PART_OF_ITEM,
  // Whitespace-only line.
  EMPTY,
}

interface LineState {
  previousLineType: LineType | null;
  isPartOfItem: boolean;
  titleIndentWidth: number;
  descriptionIndentWidth: number | null;
  previousItemLacksDescription: boolean;
}

export const parseTextList = (lines: string[]): ListItem[] => {
  if (isEmpty(lines)) {
    return [];
  }

  let lineState: LineState = {
    previousLineType: null,
    isPartOfItem: false,
    titleIndentWidth: getTitleIndentWidth(lines),
    descriptionIndentWidth: null,
    previousItemLacksDescription: false,
  };

  const listItems: ListItem[] = [];

  for (const line of lines) {
    const lineType = getLineType(line, lineState);
    switch (lineType) {
      case LineType.PRIMARY_TITLE: {
        listItems.push({
          titles: [line.trim()],
          descriptionLines: [],
        });
        lineState = {
          ...lineState,
          isPartOfItem: true,
          descriptionIndentWidth: null,
          previousItemLacksDescription: true,
        };
        break;
      }
      case LineType.SECONDARY_TITLE: {
        listItems[listItems.length - 1].titles.push(line.trim());
        break;
      }
      case LineType.TITLE_AND_DESCRIPTION: {
        const { title, description, descriptionIndentWidth } =
          separateTitleAndDescription(line, lineState);
        listItems.push({
          titles: [title],
          descriptionLines: [description],
        });
        lineState = {
          ...lineState,
          isPartOfItem: true,
          descriptionIndentWidth,
          previousItemLacksDescription: false,
        };
        break;
      }
      case LineType.DESCRIPTION: {
        const { description, descriptionIndentWidth } = extractDescription(
          line,
          lineState
        );
        listItems[listItems.length - 1].descriptionLines.push(description);
        lineState = {
          ...lineState,
          descriptionIndentWidth,
          previousItemLacksDescription: false,
        };
        break;
      }
      case LineType.SEPARATOR: {
        lineState = {
          ...lineState,
          isPartOfItem: false,
        };
        break;
      }
      case LineType.NOT_PART_OF_ITEM: {
        break;
      }
      case LineType.EMPTY: {
        break;
      }
    }
    lineState.previousLineType = lineType;
  }

  return listItems.filter(
    ({ titles, descriptionLines }) =>
      titles.length > 0 && descriptionLines.length > 0
  );
};

const isEmpty = (lines: string[]): boolean => {
  return lines.every((line) => line.trim().length === 0);
};

const getTitleIndentWidth = (lines: string[]) => {
  return Math.min(
    ...lines
      .filter((line) => line.trim().length > 0)
      .map((line) => countIndentWidth(line))
  );
};

const getLineType = (line: string, lineState: LineState) => {
  if (line.trim().length === 0) {
    return LineType.EMPTY;
  }
  const indentWidth = countIndentWidth(line);
  if (indentWidth === lineState.titleIndentWidth) {
    if (line.slice(lineState.titleIndentWidth).includes('  ')) {
      return LineType.TITLE_AND_DESCRIPTION;
    }
    if (
      lineState.previousLineType === LineType.PRIMARY_TITLE ||
      lineState.previousLineType === LineType.SECONDARY_TITLE
    ) {
      return LineType.SECONDARY_TITLE;
    } else {
      return LineType.PRIMARY_TITLE;
    }
  }
  if (
    lineState.descriptionIndentWidth !== null &&
    indentWidth >= lineState.descriptionIndentWidth
  ) {
    return lineState.isPartOfItem
      ? LineType.DESCRIPTION
      : LineType.NOT_PART_OF_ITEM;
  }
  if (lineState.previousItemLacksDescription) {
    return LineType.DESCRIPTION;
  }
  return LineType.SEPARATOR;
};

const separateTitleAndDescription = (
  line: string,
  lineState: LineState
): { title: string; description: string; descriptionIndentWidth: number } => {
  const withoutIndent = line.slice(lineState.titleIndentWidth);
  const firstMultiSpaceIndex =
    withoutIndent.indexOf('  ') + lineState.titleIndentWidth;
  const description = line.slice(firstMultiSpaceIndex).trimLeft();
  const descriptionIndentWidth = line.length - description.length;
  return {
    title: line
      .slice(lineState.titleIndentWidth, descriptionIndentWidth)
      .trim(),
    description: line.slice(descriptionIndentWidth),
    descriptionIndentWidth,
  };
};

const extractDescription = (
  line: string,
  lineState: LineState
): { description: string; descriptionIndentWidth: number } => {
  const descriptionIndentWidth =
    lineState.descriptionIndentWidth ?? countIndentWidth(line);
  return {
    description: line.slice(descriptionIndentWidth),
    descriptionIndentWidth,
  };
};
