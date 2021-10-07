import { FetchFunction, Command } from '../types';
import { SourceDef, coreutils } from '../common-fetchers/gnu-coreutils';

const sourceDef: SourceDef = {
  commandName: 'cat',
  filename: 'cat.1',
  optionsHeadingID: 'DESCRIPTION',
};

export const fetchCat: FetchFunction = async (): Promise<Command[]> =>
  coreutils(sourceDef);
