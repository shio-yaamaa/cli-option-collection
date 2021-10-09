import { Stats } from './types';

export const buildMarkdown = (stats: Stats): string =>
  `
# Overview

- Number of base commands: ${stats.baseCommandCount}
- Number of commands (including subcommands): ${stats.commandCount}
- Number of options: ${stats.optionCount}

# Command Rankings

## Ranking by Number of Options

||Command Name|Count|
|:--|:--|:--|
${stats.optionCountRanking
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
    (item, index) =>
      `|${index + 1}|${backtick(item.commandName)}|${item.count}|`
  )
  .join('\n')}
`.trim();

const backtick = (string: string) => '`' + string + '`';
