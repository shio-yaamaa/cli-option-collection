import { baseCommandNames } from '../commands';
import { readSnapshot } from '../snapshot';
import { OptionType } from '../types';
import { Stats } from './types';

const RANKING_LIMIT = 10; // Show top 10

export const buildStats = (): Stats => {
  let commandCount = 0;
  let optionCount = 0;
  const optionCounts: { commandName: string; count: number }[] = [];
  const shortOptionCounts: { commandName: string; count: number }[] = [];

  for (const baseCommandName of baseCommandNames) {
    const commands = readSnapshot(baseCommandName);
    commandCount += commands.length;
    for (const command of commands) {
      optionCount += command.options.length;
      optionCounts.push({
        commandName: command.name,
        count: command.options.length,
      });
      shortOptionCounts.push({
        commandName: command.name,
        count: command.options.filter(
          (option) => option.type === OptionType.SHORT
        ).length,
      });
    }
  }

  return {
    baseCommandCount: baseCommandNames.length,
    commandCount,
    optionCount,

    optionCountRanking: buildRanking(
      optionCounts,
      (a, b) => b.count - a.count,
      RANKING_LIMIT
    ),
    shortOptionCountRanking: buildRanking(
      shortOptionCounts,
      (a, b) => b.count - a.count,
      RANKING_LIMIT
    ),
  };
};

const buildRanking = <ItemType>(
  items: ItemType[],
  compareFn: (a: ItemType, b: ItemType) => number,
  limit: number
): ItemType[] => {
  return [...items].sort(compareFn).slice(0, limit);
};
