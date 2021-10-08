import { FetchFunction, Command } from '../../types';
import { fetch } from './fetcher';

// NOTE: Some options are not listed in the <dt>-<dd> format and just explained in the text paragraphs.
//       Those options are not collected because they cannot be parsed in a consistent way.
// NOTE: Some options overlap the options collected from other sources like GNU CoreUtils.
//       Those options are not listed in this fetchXxx function list.

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

export const fetchCommand: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'command',
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

export const fetchLet: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'let',
  });

export const fetchLocal: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'local',
  });

export const fetchLogout: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'logout',
  });

export const fetchMapfile: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'mapfile',
  });

export const fetchRead: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'read',
  });

export const fetchReadarray: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'readarray',
  });

export const fetchSource: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'source',
  });

export const fetchType: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'type',
  });

export const fetchTypeset: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'typeset',
  });

export const fetchUlimit: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'ulimit',
  });

export const fetchUnalias: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'unalias',
  });
