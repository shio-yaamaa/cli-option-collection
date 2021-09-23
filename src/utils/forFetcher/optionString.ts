const SHORT_OPTION_PATTERN = /^-([A-Za-z0-9])$/;
const LONG_OPTION_PATTERN = /^--([A-Za-z0-9]+)$/;

// Example: ["-I", "--ignore"] -> { shortOptionLabels: ["I"], longOptionLabels: ["ignore"] }
// It ignores empty option names.
// Example: ["--"] -> { shortOptionLabels: [], longOptionLabels: [] }
// It cannot handle options with values. Do not pass options like "-dcharset" or "--option=value"
export const partitionShortAndLongOptionLabels = (
  strings: string[]
): { shortOptionLabels: string[]; longOptionLabels: string[] } => {
  const shortOptionLabels: string[] = [];
  const longOptionLabels: string[] = [];

  for (const string of strings) {
    const shortMatch = string.match(SHORT_OPTION_PATTERN);
    if (shortMatch) {
      shortOptionLabels.push(shortMatch[1]);
      continue;
    }
    const longMatch = string.match(LONG_OPTION_PATTERN);
    if (longMatch) {
      longOptionLabels.push(longMatch[1]);
      continue;
    }
  }

  return {
    shortOptionLabels,
    longOptionLabels,
  };
};
