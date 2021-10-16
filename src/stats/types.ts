export interface Stats {
  overallStats: OverallStats;
  commandRankings: CommandRankings;
  aliasStats: AliasStats;
}

export interface OverallStats {
  baseCommandCount: number;
  commandCount: number;
  optionCount: number;
}

export interface CommandRankings {
  // Ranking of the commands based on the number of their options
  distinctOptionCountRanking: { commandName: string; count: number }[];
  // Ranking of the commands based on the number of their short options
  shortOptionCountRanking: { commandName: string; count: number }[];
}

// Example:
// {
//   a: [
//     { fullname: 'all', count: 10 },
//     { fullname: 'attach', count: 5 },
//   ],
//   b: [
//     { fullname: 'build', count: 10 },
//     { fullname: 'backup', count: 5 },
//   ],
//   ...
// }
export type AliasStats = Map<string, { fullname: string; count: number }[]>;
