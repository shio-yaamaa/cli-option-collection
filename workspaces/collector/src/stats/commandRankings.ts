import { Command } from '../types';
import { buildRanking, uniqueBy } from '../utils/utils';
import { CommandRankings } from './types';

export class CommandRankingsBuilder {
  private limit: number;
  private distinctOptionCounts: { commandName: string; count: number }[];
  private shortOptionCounts: { commandName: string; count: number }[];

  constructor(limit: number) {
    this.limit = limit;
    this.distinctOptionCounts = [];
    this.shortOptionCounts = [];
  }

  public addCommand(command: Command) {
    this.distinctOptionCounts.push({
      commandName: command.name,
      count: countDistinctOptions(command),
    });
    this.shortOptionCounts.push({
      commandName: command.name,
      count: command.options.filter((option) => option.key.length === 1).length,
    });
  }

  public build(): CommandRankings {
    return {
      distinctOptionCountRanking: buildRanking(
        this.distinctOptionCounts,
        (a, b) => b.count - a.count,
        this.limit
      ),
      shortOptionCountRanking: buildRanking(
        this.shortOptionCounts,
        (a, b) => b.count - a.count,
        this.limit
      ),
    };
  }
}

// Distinct options are options with distinct titles.
const countDistinctOptions = (command: Command): number =>
  uniqueBy(command.options, (option) => option.title).length;
