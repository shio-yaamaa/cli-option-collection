import { FetchFunction, Command } from '../../types';
import { fetch } from './fetcher';

export const fetchAlias: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'alias',
  });

export const fetchBind: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'bind',
  });

export const fetchBuiltin: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'builtin',
  });

export const fetchCaller: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'caller',
  });
