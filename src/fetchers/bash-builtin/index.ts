import { FetchFunction, Command } from '../../types';
import { fetch } from './fetcher';

// NOTE: Some options are not listed in the <dt>-<dd> format and just explained in the text paragraphs.
//       Those options are not collected because they cannot be parsed in a consistent way.

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

export const fetchDeclare: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'declare',
  });

export const fetchEnable: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'enable',
  });

export const fetchHelp: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'help',
  });
