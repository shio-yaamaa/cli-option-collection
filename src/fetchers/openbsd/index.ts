import { FetchFunction, Command } from '../../types';
import { fetch } from './fetcher';

export const fetchChio: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'chio',
    optionsHeadingID: 'DESCRIPTION',
  });
