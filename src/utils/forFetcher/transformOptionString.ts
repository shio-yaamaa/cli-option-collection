import parse from 'parenthesis';

type OptionStringsTransformer = (string: string[]) => string[];

export const transformOptionStrings = (
  strings: string[],
  transformers: OptionStringsTransformer[]
): string[] => {
  return transformers.reduce((previousValue, currentValue) => {
    return currentValue(previousValue);
  }, strings);
};

// Example: ["-p,--private", "-w,--workspace"] -> ["-p", "--private", "-w", "--workspace"]
export const splitByComma: OptionStringsTransformer = (
  strings: string[]
): string[] => {
  const splitStrings: string[] = [];
  for (const string of strings) {
    splitStrings.push(...string.split(',').map((split) => split.trim()));
  }
  return splitStrings;
};

// Example: ["--ignore=PATTERN"] -> ["--ignore"]
export const trimOptionValues: OptionStringsTransformer = (
  strings: string[]
): string[] => {
  return strings.map((string) => string.split('=')[0].trim());
};

// Example: ["-dPattern"] -> ["-d"]
const SHORT_OPTION_LIKE_PATTERN = /^-[A-Za-z]/;
export const trimNonDelimitedOptionValues: OptionStringsTransformer = (
  strings: string[]
) => {
  return strings.map((string) =>
    SHORT_OPTION_LIKE_PATTERN.test(string) ? string.slice(0, 2) : string
  );
};

// Example: ["--mode #0"] -> ["--mode"]
export const trimOptionArguments: OptionStringsTransformer = (
  strings: string[]
): string[] => {
  return strings.map((string) => string.split(' ')[0].trim());
};

// Example: ["--color[=WHEN]"] -> ["--color"]
export const trimOptionalElements: OptionStringsTransformer = (
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
