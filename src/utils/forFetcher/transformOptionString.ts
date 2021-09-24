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
    return '';
  });
};
