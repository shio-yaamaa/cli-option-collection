import { fetch } from './fetcher';

// NOTE: Some options are not listed in a tabular format and just explained in the text paragraphs.
//       Those options are not collected because they cannot be parsed in a consistent way.
// NOTE: Shell reserved names (e.g. if, for) are not collected except "time".
//       http://git.savannah.gnu.org/cgit/bash.git/tree/builtins/reserved.def

export const bashBuiltin = {
  alias: () =>
    fetch({
      commandName: 'alias',
    }),
  bg: () =>
    fetch({
      commandName: 'bg',
      defFileBasename: 'fg_bg',
    }),
  // BUG: Not parsed correctly because option titles contain double spaces.
  bind: () =>
    fetch({
      commandName: 'bind',
    }),
  break: () =>
    fetch({
      commandName: 'break',
    }),
  builtin: () =>
    fetch({
      commandName: 'builtin',
    }),
  caller: () =>
    fetch({
      commandName: 'caller',
    }),
  cd: () =>
    fetch({
      commandName: 'cd',
    }),
  command: () =>
    fetch({
      commandName: 'command',
    }),
  compgen: () =>
    fetch({
      commandName: 'compgen',
      defFileBasename: 'complete',
    }),
  complete: () =>
    fetch({
      commandName: 'complete',
    }),
  compopt: () =>
    fetch({
      commandName: 'compopt',
      defFileBasename: 'complete',
    }),
  continue: () =>
    fetch({
      commandName: 'continue',
      defFileBasename: 'break',
    }),
  declare: () =>
    fetch({
      commandName: 'declare',
    }),
  dirs: () =>
    fetch({
      commandName: 'dirs',
      defFileBasename: 'pushd',
    }),
  disown: () =>
    fetch({
      commandName: 'disown',
      defFileBasename: 'jobs',
    }),
  echo: () =>
    fetch({
      commandName: 'echo',
    }),
  enable: () =>
    fetch({
      commandName: 'enable',
    }),
  eval: () =>
    fetch({
      commandName: 'eval',
    }),
  exec: () =>
    fetch({
      commandName: 'exec',
    }),
  exit: () =>
    fetch({
      commandName: 'exit',
    }),
  export: () =>
    fetch({
      commandName: 'export',
      defFileBasename: 'setattr',
    }),
  false: () =>
    fetch({
      commandName: 'false',
      defFileBasename: 'colon',
    }),
  fc: () =>
    fetch({
      commandName: 'fc',
    }),
  fg: () =>
    fetch({
      commandName: 'fg',
      defFileBasename: 'fg_bg',
    }),
  getopts: () =>
    fetch({
      commandName: 'getopts',
    }),
  hash: () =>
    fetch({
      commandName: 'hash',
    }),
  help: () =>
    fetch({
      commandName: 'help',
    }),
  history: () =>
    fetch({
      commandName: 'history',
    }),
  inlib: () =>
    fetch({
      commandName: 'inlib',
    }),
  jobs: () =>
    fetch({
      commandName: 'jobs',
    }),
  kill: () =>
    fetch({
      commandName: 'kill',
    }),
  let: () =>
    fetch({
      commandName: 'let',
    }),
  local: () =>
    fetch({
      commandName: 'local',
      defFileBasename: 'declare',
    }),
  logout: () =>
    fetch({
      commandName: 'logout',
      defFileBasename: 'exit',
    }),
  // BUG: "-u" option is not recognized.
  mapfile: () =>
    fetch({
      commandName: 'mapfile',
    }),
  popd: () =>
    fetch({
      commandName: 'popd',
      defFileBasename: 'pushd',
    }),
  printf: () =>
    fetch({
      commandName: 'printf',
    }),
  pushd: () =>
    fetch({
      commandName: 'pushd',
    }),
  pwd: () =>
    fetch({
      commandName: 'pwd',
      defFileBasename: 'cd',
    }),
  // BUG: "-u" option is not recognized.
  read: () =>
    fetch({
      commandName: 'read',
    }),
  readarray: () =>
    fetch({
      commandName: 'readarray',
      defFileBasename: 'mapfile',
    }),
  readonly: () =>
    fetch({
      commandName: 'readonly',
      defFileBasename: 'setattr',
    }),
  return: () =>
    fetch({
      commandName: 'return',
    }),
  // BUG: "-o" option's description should contain line breaks but it doesn't.
  set: () =>
    fetch({
      commandName: 'set',
    }),
  shift: () =>
    fetch({
      commandName: 'shift',
    }),
  shopt: () =>
    fetch({
      commandName: 'shopt',
    }),
  source: () =>
    fetch({
      commandName: 'source',
    }),
  suspend: () =>
    fetch({
      commandName: 'suspend',
    }),
  test: () =>
    fetch({
      commandName: 'test',
    }),
  time: () =>
    fetch({
      commandName: 'time',
      defFileBasename: 'reserved',
    }),
  times: () =>
    fetch({
      commandName: 'times',
    }),
  trap: () =>
    fetch({
      commandName: 'trap',
    }),
  true: () =>
    fetch({
      commandName: 'true',
      defFileBasename: 'colon',
    }),
  type: () =>
    fetch({
      commandName: 'type',
    }),
  typeset: () =>
    fetch({
      commandName: 'typeset',
      defFileBasename: 'declare',
    }),
  ulimit: () =>
    fetch({
      commandName: 'ulimit',
    }),
  umask: () =>
    fetch({
      commandName: 'umask',
    }),
  unalias: () =>
    fetch({
      commandName: 'unalias',
      defFileBasename: 'alias',
    }),
  unset: () =>
    fetch({
      commandName: 'unset',
      defFileBasename: 'set',
    }),
  wait: () =>
    fetch({
      commandName: 'wait',
    }),
};
