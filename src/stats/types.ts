export interface Stats {
  baseCommandCount: number;
  commandCount: number;
  optionCount: number;

  // Ranking of the commands based on the number of their options
  optionCountRanking: { commandName: string; count: number }[];
  // Ranking of the commands based on the number of their short options
  shortOptionCountRanking: { commandName: string; count: number }[];
}
