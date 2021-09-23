// Example: "abc , abc" -> "abc, abc"
export const adjustSpacingAroundComma = (original: string): string => {
  return original
    .split(',')
    .map((item) => item.trim())
    .join(', ');
};
