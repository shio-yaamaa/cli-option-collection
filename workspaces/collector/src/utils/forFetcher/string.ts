import parse from 'parenthesis';
import { uniqueBy } from '../utils';

const PARENTHESIS_PLACEHOLDER_PATTERN = /___(\d+)___/g; // When escape is "___"

// Example: "abc , abc" -> "abc, abc"
export const normalizeCommaDelimitedString = (original: string): string =>
  original
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .join(', ');

export const normalizeSlashDelimitedString = (original: string): string =>
  original
    .split('/')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .join(' / ');

export const normalizeSpaces = (original: string): string =>
  original.replace(/[^\S\r\n]+/g, ' '); // Replace whitespace except linebreaks with spaces.

// Parse brackets with the library "parenthesis", but only with the depth of 1.
export const extractTopLevelBrackets = (
  string: string,
  brackets: string[]
): {
  skeleton: string;
  fillings: string[];
} => {
  const skeletonElements: string[] = parse(string, {
    brackets,
    flat: true,
    escape: '___',
  });

  const placeholderIdToOwnerIndex = new Map<number, number>();
  for (const [index, element] of skeletonElements.entries()) {
    const matches = element.matchAll(PARENTHESIS_PLACEHOLDER_PATTERN);
    for (const match of matches) {
      const placeholderId = parseInt(match[1]);
      placeholderIdToOwnerIndex.set(placeholderId, index);
    }
  }

  const sortedPlaceholderIds = [...placeholderIdToOwnerIndex.keys()].sort();
  const filledElements = [...skeletonElements];

  // Restore the contents of nested brackets.
  // Needs to be in the ascending order of the placeholder ID
  // so that every placeholder will be filled.
  for (const placeholderId of sortedPlaceholderIds) {
    const placeholderOwnerIndex = placeholderIdToOwnerIndex.get(placeholderId);
    if (placeholderOwnerIndex === undefined) {
      continue;
    }
    filledElements[placeholderOwnerIndex] = filledElements[
      placeholderOwnerIndex
    ].replace(`___${placeholderId}___`, filledElements[placeholderId]);
  }

  return {
    skeleton: skeletonElements[0],
    fillings: filledElements,
  };
};

// Put fillings back to the original place in the skeleton.
// The opposite operation of extractTopLevelBrackets.
const fillSkeleton = (skeleton: string, fillings: string[]): string => {
  let filled = skeleton;
  const matches = skeleton.matchAll(PARENTHESIS_PLACEHOLDER_PATTERN);
  for (const match of matches) {
    const placeholderId = parseInt(match[1]);
    filled = filled.replace(`___${placeholderId}___`, fillings[placeholderId]);
  }
  return filled;
};

export const splitAtTopLevel = (
  string: string,
  delimiter: string,
  brackets: string[]
): string[] => {
  const { skeleton, fillings } = extractTopLevelBrackets(string, brackets);
  const split = skeleton.split(delimiter);
  return split.map((item) => fillSkeleton(item, fillings).trim());
};

// Example: "(a, (b, c)), [d, (e, f)]" -> "a, (b, c), [d, (e, f)]"
export const stripTopLevelParentheses = (
  string: string,
  brackets: string[]
): string => {
  const allBrackets = uniqueBy(['()', ...brackets], (item) => item);
  const { skeleton, fillings } = extractTopLevelBrackets(string, allBrackets);
  const matches = skeleton.matchAll(/\((___\d+___)\)/g);
  let stripped = skeleton;
  for (const match of matches) {
    stripped = stripped.replace(match[0], match[1]);
  }
  return fillSkeleton(stripped, fillings).trim();
};

// The single quote to be stripped is not the ASCII single quote.
export const stripOuterSingleQuote = (string: string): string => {
  if (string.startsWith('‘') && string.endsWith('’')) {
    return string.slice(1, -1);
  } else {
    return string;
  }
};

export const splitByMultipleDelimiters = (
  string: string,
  delimiters: (string | RegExp)[]
): string[] => {
  let strings = [string];
  for (const delimiter of delimiters) {
    const newStrings = [];
    for (const string of strings) {
      const split = string
        .split(delimiter)
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
      newStrings.push(...split);
    }
    strings = newStrings;
  }
  return strings;
};

// Only considers spaces.
export const countIndentWidth = (line: string) => {
  const lineWithoutIndent = line.replace(/^\s+/, '');
  return line.length - lineWithoutIndent.length;
};

// Extract string lines from the input.
// The extracted part starts with a line that matches isStart
// and ends with the closest line that matches isEnd (inclusive).
// If the ending line is not found, all the lines until the end are returned.
export const extractLines = (
  lines: string[],
  isStart: (line: string) => boolean,
  isEnd: (line: string) => boolean
): string[] => {
  const startIndex = lines.findIndex((line) => isStart(line));
  if (startIndex < 0) {
    return [];
  }
  const remainingLines = lines.slice(startIndex);
  const endIndex = remainingLines.findIndex(
    (line, index) => index !== 0 && isEnd(line)
  );
  if (endIndex < 0) {
    return remainingLines;
  }
  return remainingLines.slice(0, endIndex + 1);
};
