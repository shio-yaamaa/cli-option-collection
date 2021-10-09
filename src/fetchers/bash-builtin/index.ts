import { FetchFunction, Command } from '../../types';
import { fetch } from './fetcher';
import { fetch as fetch2 } from './fetcher2';

// NOTE: Some options are not listed in a tabular format and just explained in the text paragraphs.
//       Those options are not collected because they cannot be parsed in a consistent way.
// NOTE: Shell reserved names (e.g. if, for) are not collected except "time".
//       http://git.savannah.gnu.org/cgit/bash.git/tree/builtins/reserved.def

export const fetchAlias: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'alias',
    defFileBasename: 'alias',
  });

export const fetchBg: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'bg',
    defFileBasename: 'fg_bg',
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

export const fetchDirs: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'dirs',
    defFileBasename: 'pushd',
  });

export const fetchDisown: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'disown',
    defFileBasename: 'jobs',
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

export const fetchExit: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'exit',
    defFileBasename: 'exit',
  });

export const fetchExport: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'export',
    defFileBasename: 'setattr',
  });

export const fetchFalse: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'false',
    defFileBasename: 'colon',
  });

// BUG: Not parsed correctly because the option list contains double spaces in descriptions.
//      If I allow double spaces in descriptions, then the option list of the "bind" command will break.
export const fetchFc: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'fc',
    defFileBasename: 'fc',
  });

export const fetchFg: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'fg',
    defFileBasename: 'fg_bg',
  });

export const fetchGetopts: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'getopts',
    defFileBasename: 'getopts',
  });

export const fetchHash: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'hash',
    defFileBasename: 'hash',
  });

export const fetchHelp: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'help',
    defFileBasename: 'help',
  });

export const fetchHistory: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'history',
    defFileBasename: 'history',
  });

export const fetchInlib: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'inlib',
    defFileBasename: 'inlib',
  });

export const fetchJobs: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'jobs',
    defFileBasename: 'jobs',
  });

export const fetchKill: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'kill',
    defFileBasename: 'kill',
  });

export const fetchLet: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'let',
    defFileBasename: 'let',
  });

export const fetchLocal: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'local',
    defFileBasename: 'declare',
  });

export const fetchLogout: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'logout',
    defFileBasename: 'exit',
  });

// BUG: Not parsed correctly because the option list contains double spaces in descriptions.
//      If I allow double spaces in descriptions, then the option list of the "bind" command will break.
// BUG: "-u" option is not recognized.
export const fetchMapfile: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'mapfile',
    defFileBasename: 'mapfile',
  });

export const fetchPopd: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'popd',
    defFileBasename: 'pushd',
  });

export const fetchPrintf: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'printf',
    defFileBasename: 'printf',
  });

export const fetchPushd: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'pushd',
    defFileBasename: 'pushd',
  });

export const fetchPwd: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'pwd',
    defFileBasename: 'cd',
  });

// BUG: "-u" option is not recognized.
export const fetchRead: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'read',
    defFileBasename: 'read',
  });

export const fetchReadarray: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'readarray',
    defFileBasename: 'mapfile',
  });

export const fetchReadonly: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'readonly',
    defFileBasename: 'setattr',
  });

export const fetchReturn: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'return',
    defFileBasename: 'return',
  });

// BUG: Not parsed correctly because the option list contains double spaces in descriptions.
//      If I allow double spaces in descriptions, then the option list of the "bind" command will break.
// BUG: "-o" option is not recognized.
export const fetchSet: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'set',
    defFileBasename: 'set',
  });

export const fetchShift: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'shift',
    defFileBasename: 'shift',
  });

export const fetchShopt: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'shopt',
    defFileBasename: 'shopt',
  });

export const fetchSource: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'source',
    defFileBasename: 'source',
  });

export const fetchSuspend: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'suspend',
    defFileBasename: 'suspend',
  });

export const fetchTest: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'test',
    defFileBasename: 'test',
  });

export const fetchTime: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'time',
    defFileBasename: 'reserved',
  });

export const fetchTimes: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'times',
    defFileBasename: 'times',
  });

export const fetchTrap: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'trap',
    defFileBasename: 'trap',
  });

export const fetchTrue: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'true',
    defFileBasename: 'colon',
  });

export const fetchType: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'type',
    defFileBasename: 'type',
  });

export const fetchTypeset: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'typeset',
    defFileBasename: 'declare',
  });

export const fetchUlimit: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'ulimit',
    defFileBasename: 'ulimit',
  });

export const fetchUmask: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'umask',
    defFileBasename: 'umask',
  });

export const fetchUnalias: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'unalias',
    defFileBasename: 'alias',
  });

export const fetchUnset: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'unset',
    defFileBasename: 'set',
  });

export const fetchWait: FetchFunction = async (): Promise<Command[]> =>
  fetch2({
    commandName: 'wait',
    defFileBasename: 'wait',
  });
