import { squashLinebreaks } from '../utils/string';
import { AliasStats, CommandRankings, OverallStats, Stats } from './types';

const backtick = (string: string) => '`' + string + '`';

export const buildMarkdown = (stats: Stats): string => {
  const joined = [
    overallStatsMarkdown(stats.overallStats),
    commandRankingsMarkdown(stats.commandRankings),
    aliasStatsMarkdown(stats.aliasStats),
  ].join('\n\n');
  return squashLinebreaks(joined);
};

const overallStatsMarkdown = (stats: OverallStats): string =>
  `
# Overview

- Number of base commands: ${stats.baseCommandCount}
- Number of commands (including subcommands): ${stats.commandCount}
- Number of options: ${stats.optionCount}
`;

const commandRankingsMarkdown = (stats: CommandRankings): string =>
  `
# Command Rankings

## Ranking by Number of Distinct Options

||Command Name|Count|
|:--|:--|:--|
${stats.distinctOptionCountRanking
  .map(
    (item, index) =>
      `|${index + 1}|${backtick(item.commandName)}|${item.count}|`
  )
  .join('\n')}

## Ranking by Number of Short (Single-Letter) Options

||Command Name|Count|
|:--|:--|:--|
${stats.shortOptionCountRanking
  .map(
    ({ commandName, count }, index) =>
      `|${index + 1}|${backtick(commandName)}|${count}|`
  )
  .join('\n')}
`;

const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(
  ''
);

const aliasStatsMarkdown = (stats: AliasStats): string =>
  `
# Aliases

${alphabets
  .map((alphabet) => ({
    alphabet: alphabet,
    fullnames: stats.get(alphabet) ?? [],
  }))
  .map(
    ({ alphabet, fullnames }) => `
## ${alphabet}

||Full Name|Count|
|:--|:--|:--|
${fullnames
  .map(
    ({ fullname, count }, index) =>
      `|${index + 1}|${backtick(fullname)}|${count}|`
  )
  .join('\n')}
`
  )
  .join('\n')}
`;
