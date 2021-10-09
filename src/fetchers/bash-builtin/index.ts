import { FetchFunction, Command } from '../../types';
import { fetch } from './fetcher';
import { fetch as fetch2 } from './fetcher2';

// NOTE: Some options are not listed in the <dt>-<dd> format and just explained in the text paragraphs.
//       Those options are not collected because they cannot be parsed in a consistent way.

export const fetchAlias: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'alias',
    defFileBasename: 'alias',
  });

export const fetchBind: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'bind',
    defFileBasename: 'bind',
  });

export const fetchBreak: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'break',
    defFileBasename: 'break',
  });

export const fetchBuiltin: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'builtin',
    defFileBasename: 'builtin',
  });

export const fetchCaller: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'caller',
    defFileBasename: 'caller',
  });

export const fetchCd: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'cd',
    defFileBasename: 'cd',
  });

export const fetchCommand: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'command',
    defFileBasename: 'command',
  });

export const fetchCompgen: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'compgen',
    defFileBasename: 'complete',
  });

export const fetchComplete: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'complete',
    defFileBasename: 'complete',
  });

export const fetchCompopt: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'compopt',
    defFileBasename: 'complete',
  });

export const fetchContinue: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'continue',
    defFileBasename: 'break',
  });

export const fetchDeclare: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'declare',
    defFileBasename: 'declare',
  });

export const fetchEcho: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'echo',
    defFileBasename: 'echo',
  });

export const fetchEnable: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'enable',
    defFileBasename: 'enable',
  });

export const fetchEval: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'eval',
    defFileBasename: 'eval',
  });

export const fetchExec: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'exec',
    defFileBasename: 'exec',
  });

export const fetchFalse: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'false',
    defFileBasename: 'colon',
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
  fetch2({
    commandName: 'local',
    defFileBasename: 'declare',
  });

export const fetchLogout: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'logout',
  });

export const fetchMapfile: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'mapfile',
  });

export const fetchPrintf: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'printf',
  });

export const fetchPwd: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'pwd',
    defFileBasename: 'cd',
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

export const fetchTrue: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'true',
    defFileBasename: 'colon',
  });

export const fetchType: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'type',
  });

export const fetchTypeset: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'typeset',
    defFileBasename: 'declare',
  });

export const fetchUlimit: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'ulimit',
  });

export const fetchUnalias: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'unalias',
    defFileBasename: 'alias',
  });
