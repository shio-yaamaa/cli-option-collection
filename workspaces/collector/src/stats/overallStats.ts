import { Command } from '../types';
import { OverallStats } from './types';

export class OverallStatsBuilder {
  private baseCommandCount: number;
  private commandCount: number;
  private optionCount: number;

  constructor() {
    this.baseCommandCount = 0;
    this.commandCount = 0;
    this.optionCount = 0;
  }

  public incrementBaseCommand() {
    this.baseCommandCount += 1;
  }

  public addCommand(command: Command) {
    this.commandCount += 1;
    this.optionCount += command.options.length;
  }

  public build(): OverallStats {
    return {
      baseCommandCount: this.baseCommandCount,
      commandCount: this.commandCount,
      optionCount: this.optionCount,
    };
  }
}
