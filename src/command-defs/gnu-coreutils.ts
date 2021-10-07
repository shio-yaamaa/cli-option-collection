import { FetchFunction, Command } from '../types';
import { coreutils } from '../common-fetchers/gnu-coreutils';

export const fetchArch: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'arch',
    filename: 'arch.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchB2sum: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'b2sum',
    filename: 'b2sum.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchBase32: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'base32',
    filename: 'base32.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchBase64: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'base64',
    filename: 'base64.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchBasename: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'basename',
    filename: 'basename.1',
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
