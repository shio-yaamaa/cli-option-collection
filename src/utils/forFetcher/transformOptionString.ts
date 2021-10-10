import parse from 'parenthesis';
import { splitAtTopLevel } from './string';

type OptionStringsFilter = (string: string[]) => string[];

const BRACKETS = ['[]', '()', '<>', '{}', '""', "''"];

export const transformOptionStrings = (
  strings: string[],
  filters: OptionStringsFilter[]
): string[] => {
  return filters.reduce((previousValue, currentValue) => {
    return currentValue(previousValue);
  }, strings);
};

// Example: ["-p,--private", "-w,--workspace"] -> ["-p", "--private", "-w", "--workspace"]
export const splitByComma: OptionStringsFilter = (
  strings: string[]
): string[] => {
  const splitStrings: string[] = [];
  for (const string of strings) {
    splitStrings.push(...splitAtTopLevel(string, ',', BRACKETS));
  }
  return splitStrings;
};

// Split items by spaces. Only items that start with "-" are split.
// Example: ["-s --sort-key COLUMN"] -> ["-s", "--sort-key COLUMN"]
export const splitBySpace: OptionStringsFilter = (
  strings: string[]
): string[] => {
  const allItems: string[] = [];
  for (const string of strings) {
    const splitOptions: string[] = [];
    for (const item of splitAtTopLevel(string, ' ', BRACKETS)) {
      if (!item.trimLeft().startsWith('-') && splitOptions.length > 0) {
        splitOptions[splitOptions.length - 1] += ` ${item}`;
      } else {
        splitOptions.push(item);
      }
    }
    allItems.push(...splitOptions);
  }
  return allItems;
};

// Example: ["--ignore=PATTERN"] -> ["--ignore"]
export const trimOptionValues: OptionStringsFilter = (
  strings: string[]
): string[] => {
  return strings.map((string) =>
    splitAtTopLevel(string, '=', BRACKETS)[0].trim()
  );
};

// Example: ["-dPattern"] -> ["-d"]
const SHORT_OPTION_LIKE_PATTERN = /^-[A-Za-z]/;
export const trimNonDelimitedOptionValues: OptionStringsFilter = (
  strings: string[]
) => {
  return strings.map((string) =>
    SHORT_OPTION_LIKE_PATTERN.test(string) ? string.slice(0, 2) : string
  );
};

// Example: ["--mode #0"] -> ["--mode"]
export const trimOptionArguments: OptionStringsFilter = (
  strings: string[]
): string[] => {
  return strings.map((string) =>
    splitAtTopLevel(string, ' ', BRACKETS)[0].trim()
  );
};

// Example: ["--color[=WHEN]"] -> ["--color"]
export const trimOptionalElements: OptionStringsFilter = (
  strings: string[]
): string[] => {
  return strings.map((string) => {
    const parsed = parse(string, {
      brackets: ['[]'],
      flat: true,
      escape: '___',
    });
    return parsed[0].replace(/\[___[0-9]+___\]/, '');
  });
};

// Example: ["-V:configvar"] -> ["-V"]
export const trimAfterColons: OptionStringsFilter = (
  strings: string[]
): string[] => {
  return strings.map((string) =>
    splitAtTopLevel(string, ':', BRACKETS)[0].trim()
  );
};
