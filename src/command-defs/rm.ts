import { FetchFunction, Command } from '../types';
import { SourceDef, coreutils } from '../common-fetchers/gnu-coreutils';

const sourceDef: SourceDef = {
  commandName: 'rm',
  filename: 'rm.1',
};

export const fetchRm: FetchFunction = async (): Promise<Command[]> =>
  coreutils(sourceDef);
