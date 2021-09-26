import { OptionType } from '../../types';

const SHORT_OPTION_PATTERN = /^-([A-Za-z0-9])$/;
const LONG_OPTION_PATTERN = /^--([A-Za-z0-9][A-Za-z0-9-]*)$/;

// Example: ["-I", "--ignore"] -> [{ key: "I", type: OptionType.SHORT }, { key: "ignore", type: OptionType.LONG }]
// It ignores empty option names.
// Example: ["--"] -> []
// It cannot handle options with values. Do not pass options like "-dcharset" or "--option=value"
export const distinguishOptionKeyType = (
  optionStrings: string[]
): { type: OptionType; key: string }[] => {
  const optionKeyTypes: { key: string; type: OptionType }[] = [];

  for (const optionString of optionStrings) {
    const shortMatch = optionString.match(SHORT_OPTION_PATTERN);
    if (shortMatch) {
      optionKeyTypes.push({
        type: OptionType.SHORT,
        key: shortMatch[1],
      });
      continue;
    }
    const longMatch = optionString.match(LONG_OPTION_PATTERN);
    if (longMatch) {
      optionKeyTypes.push({
        type: OptionType.LONG,
        key: longMatch[1],
      });
      continue;
    }
  }

  return optionKeyTypes;
};

// Example: ["-d", "-dt"] -> ["-d, -dt"]
export const mergeOptionTitles = (optionTitles: string[]): string => {
  return optionTitles.map((optionTitle) => optionTitle.trim()).join(', ');
};
