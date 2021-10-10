import { FetchFunction, Command } from '../../types';
import { fetch } from './fetcher';

// NOTE: List of all the commands listed in https://man.openbsd.org/ is not found.
//       This file lists some well-known commands, but there are more documentations
//       in the man page server.
//       Commands collected from other sources are not listed here.
//       References:
//       - https://github.com/openbsd/src/tree/master/bin

export const fetchChio: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'chio',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchChflags: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'chflags',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchCsh: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'csh',
    optionsHeadingID: 'Argument_list_processing',
  });

export const fetchDomainname: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'domainname',
    optionsHeadingID: 'DESCRIPTION',
  });

// BUG: Not only options but also some of address symbols are recognized as options.
export const fetchEd: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'ed',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchKsh: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'ksh',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchMd5: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'md5',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchSh: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'sh',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchSha1: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'sha1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchSha256: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'sha256',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchSha512: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'sha512',
    optionsHeadingID: 'DESCRIPTION',
  });
