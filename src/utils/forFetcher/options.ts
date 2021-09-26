import { Option, OptionType } from '../../types';

export const uniqueOptions = (options: Option[]): Option[] => {
  const uniqueOptions: Option[] = [];

  const shortOptionMap = new Map<string, boolean>();
  const longOptionMap = new Map<string, boolean>();

  for (const option of options) {
    switch (option.type) {
      case OptionType.SHORT:
        if (!shortOptionMap.has(option.key)) {
          uniqueOptions.push(option);
          shortOptionMap.set(option.key, true);
        }
        break;
      case OptionType.LONG:
        if (!longOptionMap.has(option.key)) {
          uniqueOptions.push(option);
          longOptionMap.set(option.key, true);
        }
        break;
    }
  }

  return uniqueOptions;
};
