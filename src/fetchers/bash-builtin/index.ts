import { FetchFunction, Command } from '../../types';
import { fetch } from './fetcher';

export const fetchAlias: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'alias',
  });
