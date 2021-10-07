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

export const fetchBasenc: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'basenc',
    filename: 'basenc.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchCat: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'cat',
    filename: 'cat.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchChcon: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'chcon',
    filename: 'chcon.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchChgrp: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'chgrp',
    filename: 'chgrp.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchChmod: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'chmod',
    filename: 'chmod.1',
    optionsHeadingID: 'OPTIONS',
  });

export const fetchChown: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'chown',
    filename: 'chown.1',
    optionsHeadingID: 'OPTIONS',
  });

export const fetchChroot: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'chroot',
    filename: 'chroot.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchCksum: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'cksum',
    filename: 'cksum.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchComm: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'comm',
    filename: 'comm.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchCoreutils: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'coreutils',
    filename: 'coreutils.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchCp: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'cp',
    filename: 'cp.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchCsplit: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'csplit',
    filename: 'csplit.1',
    optionsHeadingID: 'DESCRIPTION',
  });

// BUG: "-M" is not an option
export const fetchCut: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'cut',
    filename: 'cut.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchDate: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'date',
    filename: 'date.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchDd: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'dd',
    filename: 'dd.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchDf: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'df',
    filename: 'df.1',
    optionsHeadingID: 'OPTIONS',
  });

export const fetchDir: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'dir',
    filename: 'dir.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchDircolors: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'dircolors',
    filename: 'dircolors.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchDirname: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'dirname',
    filename: 'dirname.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchDu: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'du',
    filename: 'du.1',
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
