import { isString } from './typeGuards';

// If there are more than two consecutive empty lines, squash them into one.
export const squashLinebreaks = (string: string): string => {
  return string.replace(/\n([^\S\n]*\n){2,}/g, '\n\n');
};

// Works like strings.SplitN in golang.
// n: The number of substrings to return
export const splitN = (
  string: string,
  delimiter: string | RegExp,
  n: number
): string[] => {
  const delimiterIsString = isString(delimiter);

  const items = [];
  let remainder = string;

  let i = 0;
  while (i < n - 1) {
    let matchIndex = -1;
    let matchLength = 0;
    if (delimiterIsString) {
      matchIndex = remainder.indexOf(delimiter as string);
      matchLength = delimiter.length;
    } else {
      matchIndex = remainder.search(delimiter);
      const match = remainder.match(delimiter);
      if (match) {
        matchLength = match[0].length;
      }
    }

    // No more delimiters in the string.
    if (matchIndex < 0) {
      break;
    }

    items.push(remainder.slice(0, matchIndex));
    remainder = remainder.slice(matchIndex + matchLength);

    i++;
  }
  return [...items, remainder];
};
