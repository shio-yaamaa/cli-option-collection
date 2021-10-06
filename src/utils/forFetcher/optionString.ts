import { Option, OptionType } from '../../types';

const SHORT_OPTION_PATTERN = /^-([A-Za-z0-9?])$/;
const LONG_OPTION_PATTERN = /^--([A-Za-z0-9][A-Za-z0-9-_]*)$/;
const SINGLE_DASH_STYLE_OPTION_PATTERN = /^-([A-Za-z0-9][A-Za-z0-9-_]*)$/;

// Example: ["-I", "--ignore"] -> [{ key: "I", type: OptionType.SHORT }, { key: "ignore", type: OptionType.LONG }]
// It ignores empty option names.
// Example: ["--"] -> []
// It cannot handle options with values. Do not pass options like "-dcharset" or "--option=value"
export const makeOptionList = (
  optionStrings: string[],
  title: string,
  description: string
): Option[] => {
  const options: Option[] = [];

  for (const optionString of optionStrings) {
    const shortMatch = optionString.match(SHORT_OPTION_PATTERN);
    if (shortMatch) {
      options.push({
        type: OptionType.SHORT,
        key: shortMatch[1],
        title,
        description,
      });
      continue;
    }
    const longMatch = optionString.match(LONG_OPTION_PATTERN);
    if (longMatch) {
      options.push({
        type: OptionType.LONG,
        key: longMatch[1],
        title,
        description,
      });
      continue;
    }
  }

  return options;
};

// The same as makeOptionList, but for single-dash style commands like go.
export const makeOptionListForSingleDashStyle = (
  optionStrings: string[],
  title: string,
  description: string
): Option[] => {
  const options: Option[] = [];

  for (const optionString of optionStrings) {
    const match = optionString.match(SINGLE_DASH_STYLE_OPTION_PATTERN);
    if (match) {
      options.push({
        type: match[1].length === 1 ? OptionType.SHORT : OptionType.LONG,
        key: match[1],
        title,
        description,
      });
    }
  }

  return options;
};

// Example: ["-d", "-dt"] -> ["-d, -dt"]
export const mergeOptionTitles = (optionTitles: string[]): string => {
  return optionTitles.map((optionTitle) => optionTitle.trim()).join(', ');
};
