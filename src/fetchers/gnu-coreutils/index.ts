import { build } from './builder';

export const gnuCoreutils = {
  arch: build('arch', {
    filename: 'arch.1',
  }),
  b2sum: build('b2sum', {
    filename: 'b2sum.1',
  }),
  base32: build('base32', {
    filename: 'base32.1',
  }),
  base64: build('base64', {
    filename: 'base64.1',
  }),
  basename: build('basename', {
    filename: 'basename.1',
  }),
  basenc: build('basenc', {
    filename: 'basenc.1',
  }),
  cat: build('cat', {
    filename: 'cat.1',
  }),
  chcon: build('chcon', {
    filename: 'chcon.1',
  }),
  chgrp: build('chgrp', {
    filename: 'chgrp.1',
  }),
  chmod: build('chmod', {
    filename: 'chmod.1',
    optionsHeadingID: 'OPTIONS',
  }),
  chown: build('chown', {
    filename: 'chown.1',
    optionsHeadingID: 'OPTIONS',
  }),
  chroot: build('chroot', {
    filename: 'chroot.1',
  }),
  cksum: build('cksum', {
    filename: 'cksum.1',
  }),
  comm: build('comm', {
    filename: 'comm.1',
  }),
  coreutils: build('coreutils', {
    filename: 'coreutils.1',
  }),
  cp: build('cp', {
    filename: 'cp.1',
  }),
  csplit: build('csplit', {
    filename: 'csplit.1',
  }),
  // BUG: "-M" is not an option
  cut: build('cut', {
    filename: 'cut.1',
  }),
  date: build('date', {
    filename: 'date.1',
  }),
  dd: build('dd', {
    filename: 'dd.1',
  }),
  df: build('df', {
    filename: 'df.1',
    optionsHeadingID: 'OPTIONS',
  }),
  dir: build('dir', {
    filename: 'dir.1',
  }),
  dircolors: build('dircolors', {
    filename: 'dircolors.1',
  }),
  dirname: build('dirname', {
    filename: 'dirname.1',
  }),
  du: build('du', {
    filename: 'du.1',
  }),
  echo: build('echo', {
    filename: 'echo.1',
  }),
  env: build('env', {
    filename: 'env.1',
  }),
  expand: build('expand', {
    filename: 'expand.1',
  }),
  expr: build('expr', {
    filename: 'expr.1',
  }),
  factor: build('factor', {
    filename: 'factor.1',
  }),
  false: build('false', {
    filename: 'false.1',
  }),
  fmt: build('fmt', {
    filename: 'fmt.1',
  }),
  fold: build('fold', {
    filename: 'fold.1',
  }),
  groups: build('groups', {
    filename: 'groups.1',
  }),
  head: build('head', {
    filename: 'head.1',
  }),
  hostid: build('hostid', {
    filename: 'hostid.1',
  }),
  hostname: build('hostname', {
    filename: 'hostname.1',
  }),
  id: build('id', {
    filename: 'id.1',
  }),
  install: build('install', {
    filename: 'install.1',
  }),
  join: build('join', {
    filename: 'join.1',
  }),
  kill: build('kill', {
    filename: 'kill.1',
  }),
  link: build('link', {
    filename: 'link.1',
  }),
  ln: build('ln', {
    filename: 'ln.1',
  }),
  logname: build('logname', {
    filename: 'logname.1',
  }),
  // BUG: Some options has descriptions that takes multiple <dd>s,
  //      but the second and later <dd>s are ignored.
  ls: build('ls', {
    filename: 'ls.1',
  }),
  md5sum: build('md5sum', {
    filename: 'md5sum.1',
  }),
  mkdir: build('mkdir', {
    filename: 'mkdir.1',
  }),
  mkfifo: build('mkfifo', {
    filename: 'mkfifo.1',
  }),
  mknod: build('mknod', {
    filename: 'mknod.1',
  }),
  mktemp: build('mktemp', {
    filename: 'mktemp.1',
  }),
  mv: build('mv', {
    filename: 'mv.1',
  }),
  nice: build('nice', {
    filename: 'nice.1',
  }),
  nl: build('nl', {
    filename: 'nl.1',
  }),
  nohup: build('nohup', {
    filename: 'nohup.1',
  }),
  nproc: build('nproc', {
    filename: 'nproc.1',
  }),
  // BUG: "-M" is not an option
  numfmt: build('numfmt', {
    filename: 'numfmt.1',
  }),
  od: build('od', {
    filename: 'od.1',
  }),
  paste: build('paste', {
    filename: 'paste.1',
  }),
  pathchk: build('pathchk', {
    filename: 'pathchk.1',
  }),
  pinky: build('pinky', {
    filename: 'pinky.1',
  }),
  pr: build('pr', {
    filename: 'pr.1',
  }),
  printenv: build('printenv', {
    filename: 'printenv.1',
  }),
  printf: build('printf', {
    filename: 'printf.1',
  }),
  ptx: build('ptx', {
    filename: 'ptx.1',
  }),
  pwd: build('pwd', {
    filename: 'pwd.1',
  }),
  readlink: build('readlink', {
    filename: 'readlink.1',
  }),
  realpath: build('realpath', {
    filename: 'realpath.1',
  }),
  rm: build('rm', {
    filename: 'rm.1',
    optionsHeadingID: 'OPTIONS',
  }),
  // BUG: "--ignore-fail-on-non-empty" option is not recognized as an option.
  rmdir: build('rmdir', {
    filename: 'rmdir.1',
  }),
  runcon: build('runcon', {
    filename: 'runcon.1',
  }),
  seq: build('seq', {
    filename: 'seq.1',
  }),
  sha1sum: build('sha1sum', {
    filename: 'sha1sum.1',
  }),
  sha224sum: build('sha224sum', {
    filename: 'sha224sum.1',
  }),
  sha256sum: build('sha256sum', {
    filename: 'sha256sum.1',
  }),
  sha384sum: build('sha384sum', {
    filename: 'sha384sum.1',
  }),
  sha512sum: build('sha512sum', {
    filename: 'sha512sum.1',
  }),
  shred: build('shred', {
    filename: 'shred.1',
  }),
  shuf: build('shuf', {
    filename: 'shuf.1',
  }),
  sleep: build('sleep', {
    filename: 'sleep.1',
  }),
  sort: build('sort', {
    filename: 'sort.1',
  }),
  split: build('split', {
    filename: 'split.1',
  }),
  // BUG: "-c" and "--format" are not recognized as separate options
  //      because they are not delimited by "," in the man page.
  stat: build('stat', {
    filename: 'stat.1',
  }),
  stdbuf: build('stdbuf', {
    filename: 'stdbuf.1',
  }),
  stty: build('stty', {
    filename: 'stty.1',
  }),
  sum: build('sum', {
    filename: 'sum.1',
  }),
  sync: build('sync', {
    filename: 'sync.1',
  }),
  tac: build('tac', {
    filename: 'tac.1',
  }),
  tail: build('tail', {
    filename: 'tail.1',
  }),
  tee: build('tee', {
    filename: 'tee.1',
  }),
  // NOTE: Options used in the middle of expressions are not recognized as options.
  test: build('test', {
    filename: 'test.1',
  }),
  // BUG: Some of the options of "timeout" command are not fetched
  //      because their markup structures are inconsistent.
  timeout: build('timeout', {
    filename: 'timeout.1',
  }),
  touch: build('touch', {
    filename: 'touch.1',
  }),
  tr: build('tr', {
    filename: 'tr.1',
  }),
  true: build('true', {
    filename: 'true.1',
  }),
  truncate: build('truncate', {
    filename: 'truncate.1',
  }),
  tsort: build('tsort', {
    filename: 'tsort.1',
  }),
  tty: build('tty', {
    filename: 'tty.1',
  }),
  uname: build('uname', {
    filename: 'uname.1',
  }),
  unexpand: build('unexpand', {
    filename: 'unexpand.1',
  }),
  uniq: build('uniq', {
    filename: 'uniq.1',
  }),
  unlink: build('unlink', {
    filename: 'unlink.1',
  }),
  uptime: build('uptime', {
    filename: 'uptime.1',
  }),
  users: build('users', {
    filename: 'users.1',
  }),
  vdir: build('vdir', {
    filename: 'vdir.1',
  }),
  wc: build('wc', {
    filename: 'wc.1',
  }),
  who: build('who', {
    filename: 'who.1',
  }),
  whoami: build('whoami', {
    filename: 'whoami.1',
  }),
  yes: build('yes', {
    filename: 'yes.1',
  }),
};
