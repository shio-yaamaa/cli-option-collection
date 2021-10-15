import { Command } from '../types';

type LongName = Map<string, number>;

export class AliasStatsBuilder {
  private aliasMap: Map<string, LongName>;

  constructor() {
    this.aliasMap = new Map<string, LongName>();
  }

  public addCommand(command: Command) {
    const shortToLongMap = buildShortToLongMap(command);
    for (const short of shortToLongMap.keys()) {
      const longs = shortToLongMap.get(short) ?? [];
      const entry = this.aliasMap.get(short);
      if (!entry) {
        this.aliasMap.set(short, new Map<string, number>());
      }
      const existEntry = this.aliasMap.get(short)!;
      for (const long of longs) {
        const count = existEntry.get(long) ?? 0;
        existEntry.set(long, count + 1);
      }
    }
  }

  public show() {
    console.log(this.aliasMap);
  }
}

const ALPHABET_SHORT_OPTION_KEY_PATTERN = /^[A-Za-z]$/;
const buildShortToLongMap = (command: Command) => {
  const titleToKeys = new Map<string, string[]>();
  for (const option of command.options) {
    const got = titleToKeys.get(option.title) ?? [];
    titleToKeys.set(option.title, [...got, option.key]);
  }
  const shortToLongs = new Map<string, string[]>();
  for (const option of command.options) {
    if (ALPHABET_SHORT_OPTION_KEY_PATTERN.test(option.key)) {
      const keys = titleToKeys.get(option.title) ?? [];
      shortToLongs.set(
        option.key,
        keys.filter((key) => key.length > 1)
      );
    }
  }
  return shortToLongs;
};
