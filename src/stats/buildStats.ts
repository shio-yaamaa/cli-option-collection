import { Stats } from './types';

import { baseCommandNames } from '../commands';
import { readSnapshot } from '../snapshot';
import { AliasStatsBuilder } from './aliasStats';
import { CommandRankingsBuilder } from './commandRankings';
import { OverallStatsBuilder } from './overallStats';

const RANKING_LIMIT = 10; // Show top 10

export const buildStats = (): Stats => {
  const overallStatsBuilder = new OverallStatsBuilder();
  const commandRankingsBuilder = new CommandRankingsBuilder(RANKING_LIMIT);
  const aliasStatsBuilder = new AliasStatsBuilder(RANKING_LIMIT);

  for (const baseCommandName of baseCommandNames) {
    overallStatsBuilder.incrementBaseCommand();

    const commands = readSnapshot(baseCommandName);
    for (const command of commands) {
      overallStatsBuilder.addCommand(command);
      commandRankingsBuilder.addCommand(command);
      aliasStatsBuilder.addCommand(command);
    }
  }

  return {
    overallStats: overallStatsBuilder.build(),
    commandRankings: commandRankingsBuilder.build(),
    aliasStats: aliasStatsBuilder.build(),
  };
};
