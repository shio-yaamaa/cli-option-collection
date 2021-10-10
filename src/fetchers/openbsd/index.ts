import { FetchFunction, Command } from '../../types';
import { fetch } from './fetcher';

// NOTE: List of all the commands listed in https://man.openbsd.org/ is not found.
//       This file lists some well-known commands, but there are more documentations
//       in the man page server.
//       Commands collected from other sources are not listed here.

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
