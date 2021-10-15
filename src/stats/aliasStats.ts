import { Command } from '../types';
import { buildRanking } from '../utils/utils';
import { AliasStats } from './types';

type AliasCounts = Map<string, FullnameCounts>;
type FullnameCounts = Map<string, number>;

const ALPHABET_SHORT_OPTION_KEY_PATTERN = /^[A-Za-z]$/;

class AliasCounter {
  private counts: AliasCounts;

  constructor() {
    this.counts = new Map();
  }

  public getCounts() {
    return this.counts;
  }

  public add(alias: string, fullname: string, count: number) {
    const fullnameCounts: FullnameCounts = this.counts.get(alias) ?? new Map();
    const fullnameCount = fullnameCounts.get(fullname) ?? 0;
    fullnameCounts.set(fullname, fullnameCount + count);
    this.counts.set(alias, fullnameCounts);
  }
}

export class AliasStatsBuilder {
  private limit: number;
  private aliasCounts: AliasCounts;

  constructor(limit: number) {
    this.limit = limit;
    this.aliasCounts = new Map();
  }

  public addCommand(command: Command) {
    const aliasCounts = buildAliasCountsForCommand(command);
    this.aliasCounts = mergeAliasCounts(this.aliasCounts, aliasCounts);
  }

  public build(): AliasStats {
    const stats: AliasStats = new Map();
    for (const [alias, fullnameCounts] of this.aliasCounts.entries()) {
      stats.set(
        alias,
        buildRanking(
          Array.from(fullnameCounts.entries()).map(([fullname, count]) => ({
            fullname,
            count,
          })),
          (a, b) => b.count - a.count,
          this.limit
        )
      );
    }
    return stats;
  }
}

const buildAliasCountsForCommand = (command: Command): AliasCounts => {
  const titleToKeys = new Map<string, string[]>();
  for (const option of command.options) {
    const existingKeys = titleToKeys.get(option.title) ?? [];
    titleToKeys.set(option.title, [...existingKeys, option.key]);
  }

  const counter = new AliasCounter();
  for (const option of command.options) {
    if (ALPHABET_SHORT_OPTION_KEY_PATTERN.test(option.key)) {
      const keys = titleToKeys.get(option.title) ?? [];
      const fullnames = keys.filter((key) => key.length > 1);
      for (const fullname of fullnames) {
        counter.add(option.key, fullname, 1);
      }
    }
  }
  return counter.getCounts();
};

const mergeAliasCounts = (
  aliasCounts1: AliasCounts,
  aliasCounts2: AliasCounts
): AliasCounts => {
  const counter = new AliasCounter();
  for (const aliasCounts of [aliasCounts1, aliasCounts2]) {
    for (const [alias, fullnameCounts] of aliasCounts.entries()) {
      for (const [fullname, count] of fullnameCounts.entries()) {
        counter.add(alias, fullname, count);
      }
    }
  }
  return counter.getCounts();
};
