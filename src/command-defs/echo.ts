import { FetchFunction, Command } from '../types';
import { SourceDef, coreutils } from '../common-fetchers/gnu-coreutils';

const sourceDef: SourceDef = {
  commandName: 'echo',
  filename: 'echo.1',
  optionsHeadingID: 'DESCRIPTION',
};

export const fetchEcho: FetchFunction = async (): Promise<Command[]> =>
  coreutils(sourceDef);
