import { FetchFunction, Command } from '../types';
import { coreutils } from '../common-fetchers/gnu-coreutils';

export const fetchArch: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'arch',
    filename: 'arch.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchCp: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'cp',
    filename: 'cp.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchCat: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'cat',
    filename: 'cat.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchEcho: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'echo',
    filename: 'echo.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchRm: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'rm',
    filename: 'rm.1',
    optionsHeadingID: 'OPTIONS',
  });
