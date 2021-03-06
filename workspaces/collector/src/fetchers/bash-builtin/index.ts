import { build } from './builder';

// NOTE: Some options are not listed in a tabular format and just explained in the text paragraphs.
//       Those options are not collected because they cannot be parsed in a consistent way.
// NOTE: Shell reserved names (e.g. if, for) are not collected except "time".
//       http://git.savannah.gnu.org/cgit/bash.git/tree/builtins/reserved.def

export const bashBuiltin = {
  alias: build('alias'),
  bg: build('bg', { defFileBasename: 'fg_bg' }),
  // BUG: Not parsed correctly because option titles contain double spaces.
  bind: build('bind'),
  break: build('break'),
  builtin: build('builtin'),
  caller: build('caller'),
  cd: build('cd'),
  command: build('command'),
  compgen: build('compgen', { defFileBasename: 'complete' }),
  complete: build('complete'),
  compopt: build('compopt', { defFileBasename: 'complete' }),
  continue: build('continue', { defFileBasename: 'break' }),
  declare: build('declare'),
  dirs: build('dirs', { defFileBasename: 'pushd' }),
  disown: build('disown', { defFileBasename: 'jobs' }),
  echo: build('echo'),
  enable: build('enable'),
  eval: build('eval'),
  exec: build('exec'),
  exit: build('exit'),
  export: build('export', { defFileBasename: 'setattr' }),
  false: build('false', { defFileBasename: 'colon' }),
  fc: build('fc'),
  fg: build('fg', { defFileBasename: 'fg_bg' }),
  getopts: build('getopts'),
  hash: build('hash'),
  help: build('help'),
  history: build('history'),
  inlib: build('inlib'),
  jobs: build('jobs'),
  kill: build('kill'),
  let: build('let'),
  local: build('local', { defFileBasename: 'declare' }),
  logout: build('logout', { defFileBasename: 'exit' }),
  // BUG: "-u" option is not recognized.
  mapfile: build('mapfile'),
  popd: build('popd', { defFileBasename: 'pushd' }),
  printf: build('printf'),
  pushd: build('pushd'),
  pwd: build('pwd', { defFileBasename: 'cd' }),
  // BUG: "-u" option is not recognized.
  read: build('read'),
  readarray: build('readarray', { defFileBasename: 'mapfile' }),
  readonly: build('readonly', { defFileBasename: 'setattr' }),
  return: build('return'),
  // BUG: "-o" option's description should contain line breaks but it doesn't.
  set: build('set'),
  shift: build('shift'),
  shopt: build('shopt'),
  source: build('source'),
  suspend: build('suspend'),
  test: build('test'),
  time: build('time', { defFileBasename: 'reserved' }),
  times: build('times'),
  trap: build('trap'),
  true: build('true', { defFileBasename: 'colon' }),
  type: build('type'),
  typeset: build('typeset', { defFileBasename: 'declare' }),
  ulimit: build('ulimit'),
  umask: build('umask'),
  unalias: build('unalias', { defFileBasename: 'alias' }),
  unset: build('unset', { defFileBasename: 'set' }),
  wait: build('wait'),
};
