import { FetchFunction, Command } from '../types';
import { SourceDef, coreutils } from '../common-fetchers/gnu-coreutils';

const sourceDef: SourceDef = {
  commandName: 'cp',
  filename: 'cp.1',
  optionsHeadingID: 'DESCRIPTION',
};

export const fetchCp: FetchFunction = async (): Promise<Command[]> =>
  coreutils(sourceDef);
