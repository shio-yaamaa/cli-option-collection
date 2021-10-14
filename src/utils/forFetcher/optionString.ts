import { Option, OptionStyle } from '../../types';

const SHORT_OPTION_PATTERN = /^-([A-Za-z0-9?])$/;
const LONG_OPTION_PATTERN = /^--([A-Za-z0-9][A-Za-z0-9-_]*)$/;
const SINGLE_DASH_STYLE_OPTION_PATTERN = /^-([A-Za-z0-9][A-Za-z0-9-_]*)$/;

export const makeOptionList = (
  optionStrings: string[],
  optionStyle: OptionStyle,
  title: string,
  description: string
): Option[] => {
  switch (optionStyle) {
    case OptionStyle.SHORT_AND_LONG:
      return makeOptionListForShortAndLongStyle(
        optionStrings,
        title,
        description
      );
    case OptionStyle.SINGLE_DASH:
      return makeOptionListForSingleDashStyle(
        optionStrings,
        title,
        description
      );
  }
};

// Example: ["-I", "--ignore"] -> [{ key: "I" }, { key: "ignore" }]
// It ignores empty option names.
// Example: ["--"] -> []
// It cannot handle options with values. Do not pass options like "-dcharset" or "--option=value"
const makeOptionListForShortAndLongStyle = (
  optionStrings: string[],
  title: string,
  description: string
): Option[] => {
  const options: Option[] = [];

  for (const optionString of optionStrings) {
    const shortMatch = optionString.match(SHORT_OPTION_PATTERN);
    if (shortMatch) {
      options.push({
        key: shortMatch[1],
        title,
        description,
      });
      continue;
    }
    const longMatch = optionString.match(LONG_OPTION_PATTERN);
    if (longMatch) {
      options.push({
        key: longMatch[1],
        title,
        description,
      });
      continue;
    }
  }

  return options;
};

// The same as makeOptionListForShortAndLongStyle, but for single-dash style commands like "go".
const makeOptionListForSingleDashStyle = (
  optionStrings: string[],
  title: string,
  description: string
): Option[] => {
  const options: Option[] = [];

  for (const optionString of optionStrings) {
    const match = optionString.match(SINGLE_DASH_STYLE_OPTION_PATTERN);
    if (match) {
      options.push({
        key: match[1],
        title,
        description,
      });
    }
  }

  return options;
};

// Example: ["-d", "-dt"] -> "-d, -dt"
export const mergeOptionTitles = (optionTitles: string[]): string => {
  return optionTitles.map((optionTitle) => optionTitle.trim()).join(', ');
};
