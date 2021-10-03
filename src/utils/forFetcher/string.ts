import parse from 'parenthesis';

// Example: "abc , abc" -> "abc, abc"
export const normalizeSpacingAroundComma = (original: string): string =>
  original
    .split(',')
    .map((item) => item.trim())
    .join(', ');

export const normalizeSpacingAroundSlash = (original: string): string =>
  original
    .split('/')
    .map((item) => item.trim())
    .join(' / ');

export const linebreakToSpace = (original: string): string =>
  original.replace(/\n+/g, ' ');

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
