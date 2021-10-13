import parse from 'parenthesis';

// Example: "abc , abc" -> "abc, abc"
export const normalizeSpacingAroundComma = (original: string): string =>
  original
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .join(', ');

export const normalizeSpacingAroundSlash = (original: string): string =>
  original
    .split('/')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .join(' / ');

export const normalizeSpaces = (original: string): string =>
  original.replace(/[^\S\r\n]+/g, ' '); // Replace whitespace except linebreaks with spaces.

export const normalizeSpacesAndLinebreaks = (original: string): string =>
  original.replace(/[\s\n]+/g, ' ');

export const splitAtTopLevel = (
  string: string,
  delimiter: string,
  brackets: string[]
): string[] => {
  const parsed: string[] = parse(string, {
    brackets,
    flat: true,
    escape: '___',
  });

  // Restore the contents of nested brackets
  const contents = [...parsed];
  for (const [contentIndex, content] of Array.from(
    [...contents].entries()
  ).reverse()) {
    let filledContent = content;
    for (const [fillerIndex, filler] of contents.entries()) {
      if (fillerIndex > 0) {
        filledContent = filledContent.replace(`___${fillerIndex}___`, filler);
      }
    }
    contents[contentIndex] = filledContent;
  }

  const split = parsed[0].split(delimiter);

  return split.map((item) => {
    let filled = item;
    for (const [index, content] of contents.entries()) {
      if (index > 0) {
        filled = filled.replace(`___${index}___`, content);
      }
    }
    return filled.trim();
  });
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
// and ends with the closest line that matches isEnd.
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
  const endIndex = remainingLines.findIndex((line) => isEnd(line));
  if (endIndex < 0) {
    return remainingLines;
  }
  return remainingLines.slice(0, endIndex + 1);
};
