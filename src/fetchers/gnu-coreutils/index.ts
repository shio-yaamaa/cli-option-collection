import { fetch } from './fetcher';

export const gnuCoreutils = {
  arch: () =>
    fetch({
      commandName: 'arch',
      filename: 'arch.1',
    }),
  b2sum: () =>
    fetch({
      commandName: 'b2sum',
      filename: 'b2sum.1',
    }),
  base32: () =>
    fetch({
      commandName: 'base32',
      filename: 'base32.1',
    }),
  base64: () =>
    fetch({
      commandName: 'base64',
      filename: 'base64.1',
    }),
  basename: () =>
    fetch({
      commandName: 'basename',
      filename: 'basename.1',
    }),
  basenc: () =>
    fetch({
      commandName: 'basenc',
      filename: 'basenc.1',
    }),
  cat: () =>
    fetch({
      commandName: 'cat',
      filename: 'cat.1',
    }),
  chcon: () =>
    fetch({
      commandName: 'chcon',
      filename: 'chcon.1',
    }),
  chgrp: () =>
    fetch({
      commandName: 'chgrp',
      filename: 'chgrp.1',
    }),
  chmod: () =>
    fetch({
      commandName: 'chmod',
      filename: 'chmod.1',
      optionsHeadingID: 'OPTIONS',
    }),
  chown: () =>
    fetch({
      commandName: 'chown',
      filename: 'chown.1',
      optionsHeadingID: 'OPTIONS',
    }),
  chroot: () =>
    fetch({
      commandName: 'chroot',
      filename: 'chroot.1',
    }),
  cksum: () =>
    fetch({
      commandName: 'cksum',
      filename: 'cksum.1',
    }),
  comm: () =>
    fetch({
      commandName: 'comm',
      filename: 'comm.1',
    }),
  coreutils: () =>
    fetch({
      commandName: 'coreutils',
      filename: 'coreutils.1',
    }),
  cp: () =>
    fetch({
      commandName: 'cp',
      filename: 'cp.1',
    }),
  csplit: () =>
    fetch({
      commandName: 'csplit',
      filename: 'csplit.1',
    }),
  // BUG: "-M" is not an option
  cut: () =>
    fetch({
      commandName: 'cut',
      filename: 'cut.1',
    }),
  date: () =>
    fetch({
      commandName: 'date',
      filename: 'date.1',
    }),
  dd: () =>
    fetch({
      commandName: 'dd',
      filename: 'dd.1',
    }),
  df: () =>
    fetch({
      commandName: 'df',
      filename: 'df.1',
      optionsHeadingID: 'OPTIONS',
    }),
  dir: () =>
    fetch({
      commandName: 'dir',
      filename: 'dir.1',
    }),
  dircolors: () =>
    fetch({
      commandName: 'dircolors',
      filename: 'dircolors.1',
    }),
  dirname: () =>
    fetch({
      commandName: 'dirname',
      filename: 'dirname.1',
    }),
  du: () =>
    fetch({
      commandName: 'du',
      filename: 'du.1',
    }),
  echo: () =>
    fetch({
      commandName: 'echo',
      filename: 'echo.1',
    }),
  env: () =>
    fetch({
      commandName: 'env',
      filename: 'env.1',
    }),
  expand: () =>
    fetch({
      commandName: 'expand',
      filename: 'expand.1',
    }),
  expr: () =>
    fetch({
      commandName: 'expr',
      filename: 'expr.1',
    }),
  factor: () =>
    fetch({
      commandName: 'factor',
      filename: 'factor.1',
    }),
  false: () =>
    fetch({
      commandName: 'false',
      filename: 'false.1',
    }),
  fmt: () =>
    fetch({
      commandName: 'fmt',
      filename: 'fmt.1',
    }),
  fold: () =>
    fetch({
      commandName: 'fold',
      filename: 'fold.1',
    }),
  groups: () =>
    fetch({
      commandName: 'groups',
      filename: 'groups.1',
    }),
  head: () =>
    fetch({
      commandName: 'head',
      filename: 'head.1',
    }),
  hostid: () =>
    fetch({
      commandName: 'hostid',
      filename: 'hostid.1',
    }),
  hostname: () =>
    fetch({
      commandName: 'hostname',
      filename: 'hostname.1',
    }),
  id: () =>
    fetch({
      commandName: 'id',
      filename: 'id.1',
    }),
  install: () =>
    fetch({
      commandName: 'install',
      filename: 'install.1',
    }),
  join: () =>
    fetch({
      commandName: 'join',
      filename: 'join.1',
    }),
  kill: () =>
    fetch({
      commandName: 'kill',
      filename: 'kill.1',
    }),
  link: () =>
    fetch({
      commandName: 'link',
      filename: 'link.1',
    }),
  ln: () =>
    fetch({
      commandName: 'ln',
      filename: 'ln.1',
    }),
  logname: () =>
    fetch({
      commandName: 'logname',
      filename: 'logname.1',
    }),
  // BUG: Some options has descriptions that takes multiple <dd>s,
  //      but the second and later <dd>s are ignored.
  ls: () =>
    fetch({
      commandName: 'ls',
      filename: 'ls.1',
    }),
  md5sum: () =>
    fetch({
      commandName: 'md5sum',
      filename: 'md5sum.1',
    }),
  mkdir: () =>
    fetch({
      commandName: 'mkdir',
      filename: 'mkdir.1',
    }),
  mkfifo: () =>
    fetch({
      commandName: 'mkfifo',
      filename: 'mkfifo.1',
    }),
  mknod: () =>
    fetch({
      commandName: 'mknod',
      filename: 'mknod.1',
    }),
  mktemp: () =>
    fetch({
      commandName: 'mktemp',
      filename: 'mktemp.1',
    }),
  mv: () =>
    fetch({
      commandName: 'mv',
      filename: 'mv.1',
    }),
  nice: () =>
    fetch({
      commandName: 'nice',
      filename: 'nice.1',
    }),
  nl: () =>
    fetch({
      commandName: 'nl',
      filename: 'nl.1',
    }),
  nohup: () =>
    fetch({
      commandName: 'nohup',
      filename: 'nohup.1',
    }),
  nproc: () =>
    fetch({
      commandName: 'nproc',
      filename: 'nproc.1',
    }),
  // BUG: "-M" is not an option
  numfmt: () =>
    fetch({
      commandName: 'numfmt',
      filename: 'numfmt.1',
    }),
  od: () =>
    fetch({
      commandName: 'od',
      filename: 'od.1',
    }),
  paste: () =>
    fetch({
      commandName: 'paste',
      filename: 'paste.1',
    }),
  pathchk: () =>
    fetch({
      commandName: 'pathchk',
      filename: 'pathchk.1',
    }),
  pinky: () =>
    fetch({
      commandName: 'pinky',
      filename: 'pinky.1',
    }),
  pr: () =>
    fetch({
      commandName: 'pr',
      filename: 'pr.1',
    }),
  printenv: () =>
    fetch({
      commandName: 'printenv',
      filename: 'printenv.1',
    }),
  printf: () =>
    fetch({
      commandName: 'printf',
      filename: 'printf.1',
    }),
  ptx: () =>
    fetch({
      commandName: 'ptx',
      filename: 'ptx.1',
    }),
  pwd: () =>
    fetch({
      commandName: 'pwd',
      filename: 'pwd.1',
    }),
  readlink: () =>
    fetch({
      commandName: 'readlink',
      filename: 'readlink.1',
    }),
  realpath: () =>
    fetch({
      commandName: 'realpath',
      filename: 'realpath.1',
    }),
  rm: () =>
    fetch({
      commandName: 'rm',
      filename: 'rm.1',
      optionsHeadingID: 'OPTIONS',
    }),
  // BUG: "--ignore-fail-on-non-empty" option is not recognized as an option.
  rmdir: () =>
    fetch({
      commandName: 'rmdir',
      filename: 'rmdir.1',
    }),
  runcon: () =>
    fetch({
      commandName: 'runcon',
      filename: 'runcon.1',
    }),
  seq: () =>
    fetch({
      commandName: 'seq',
      filename: 'seq.1',
    }),
  sha1sum: () =>
    fetch({
      commandName: 'sha1sum',
      filename: 'sha1sum.1',
    }),
  sha224sum: () =>
    fetch({
      commandName: 'sha224sum',
      filename: 'sha224sum.1',
    }),
  sha256sum: () =>
    fetch({
      commandName: 'sha256sum',
      filename: 'sha256sum.1',
    }),
  sha384sum: () =>
    fetch({
      commandName: 'sha384sum',
      filename: 'sha384sum.1',
    }),
  sha512sum: () =>
    fetch({
      commandName: 'sha512sum',
      filename: 'sha512sum.1',
    }),
  shred: () =>
    fetch({
      commandName: 'shred',
      filename: 'shred.1',
    }),
  shuf: () =>
    fetch({
      commandName: 'shuf',
      filename: 'shuf.1',
    }),
  sleep: () =>
    fetch({
      commandName: 'sleep',
      filename: 'sleep.1',
    }),
  sort: () =>
    fetch({
      commandName: 'sort',
      filename: 'sort.1',
    }),
  split: () =>
    fetch({
      commandName: 'split',
      filename: 'split.1',
    }),
  // BUG: "-c" and "--format" are not recognized as separate options
  //      because they are not delimited by "," in the man page.
  stat: () =>
    fetch({
      commandName: 'stat',
      filename: 'stat.1',
    }),
  stdbuf: () =>
    fetch({
      commandName: 'stdbuf',
      filename: 'stdbuf.1',
    }),
  stty: () =>
    fetch({
      commandName: 'stty',
      filename: 'stty.1',
    }),
  sum: () =>
    fetch({
      commandName: 'sum',
      filename: 'sum.1',
    }),
  sync: () =>
    fetch({
      commandName: 'sync',
      filename: 'sync.1',
    }),
  tac: () =>
    fetch({
      commandName: 'tac',
      filename: 'tac.1',
    }),
  tail: () =>
    fetch({
      commandName: 'tail',
      filename: 'tail.1',
    }),
  tee: () =>
    fetch({
      commandName: 'tee',
      filename: 'tee.1',
    }),
  // NOTE: Options used in the middle of expressions are not recognized as options.
  test: () =>
    fetch({
      commandName: 'test',
      filename: 'test.1',
    }),
  // BUG: Some of the options of "timeout" command are not fetched
  //      because their markup structures are inconsistent.
  timeout: () =>
    fetch({
      commandName: 'timeout',
      filename: 'timeout.1',
    }),
  touch: () =>
    fetch({
      commandName: 'touch',
      filename: 'touch.1',
    }),
  tr: () =>
    fetch({
      commandName: 'tr',
      filename: 'tr.1',
    }),
  true: () =>
    fetch({
      commandName: 'true',
      filename: 'true.1',
    }),
  truncate: () =>
    fetch({
      commandName: 'truncate',
      filename: 'truncate.1',
    }),
  tsort: () =>
    fetch({
      commandName: 'tsort',
      filename: 'tsort.1',
    }),
  tty: () =>
    fetch({
      commandName: 'tty',
      filename: 'tty.1',
    }),
  uname: () =>
    fetch({
      commandName: 'uname',
      filename: 'uname.1',
    }),
  unexpand: () =>
    fetch({
      commandName: 'unexpand',
      filename: 'unexpand.1',
    }),
  uniq: () =>
    fetch({
      commandName: 'uniq',
      filename: 'uniq.1',
    }),
  unlink: () =>
    fetch({
      commandName: 'unlink',
      filename: 'unlink.1',
    }),
  uptime: () =>
    fetch({
      commandName: 'uptime',
      filename: 'uptime.1',
    }),
  users: () =>
    fetch({
      commandName: 'users',
      filename: 'users.1',
    }),
  vdir: () =>
    fetch({
      commandName: 'vdir',
      filename: 'vdir.1',
    }),
  wc: () =>
    fetch({
      commandName: 'wc',
      filename: 'wc.1',
    }),
  who: () =>
    fetch({
      commandName: 'who',
      filename: 'who.1',
    }),
  whoami: () =>
    fetch({
      commandName: 'whoami',
      filename: 'whoami.1',
    }),
  yes: () =>
    fetch({
      commandName: 'yes',
      filename: 'yes.1',
    }),
};
