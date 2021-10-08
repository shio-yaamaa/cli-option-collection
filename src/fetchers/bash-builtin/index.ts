import { FetchFunction, Command } from '../../types';
import { fetch } from './fetcher';

// NOTE: Some options are not listed as <dt>-<dd> pairs and just explained in the text paragraphs.
//       Those options cannot be collected.

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
