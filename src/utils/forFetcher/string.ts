// Example: "abc , abc" -> "abc, abc"
export const adjustSpacingAroundComma = (original: string): string => {
  return original
    .split(',')
    .map((item) => item.trim())
    .join(', ');
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
