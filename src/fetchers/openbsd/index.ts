import { fetch } from './fetcher';

// NOTE: List of all the commands listed in https://man.openbsd.org/ is not found.
//       This file lists some well-known commands, but there are more documentations
//       in the man page server.
//       Commands collected from other sources are not listed here.
//       References:
//       - https://github.com/openbsd/src/tree/master/bin
// NOTE: Currently "openssl" command is not fetched because, unlike other commands,
//       it has subcommands and single-dash option style, which means it needs
//       a completely different fetcher implementation.
// BUG: Some commands share the same documentation page
//      despite having different option sets.
//      This fetcher cannot tell which option is available to which command
//      and assigns all of the options to the commands on the page.
//      - tput, clear
//      - gzip, gunzip, gzcat
//      - compress, uncompress, zcat
//      - mt, eject
//      - ping, ping6
//      - whatis, apropos
// BUG: Tables and definition lists are not stringified in a human-readable way.
//      (e.g. netstat -f, gzip -l)

export const openbsd = {
  apropos: () =>
    fetch({
      commandName: 'apropos',
    }),
  // BUG: "-safe" flag is not recognized as an option
  //      because it uses single dash with long option name.
  awk: () =>
    fetch({
      commandName: 'awk',
    }),
  chflags: () =>
    fetch({
      commandName: 'chflags',
    }),
  chio: () =>
    fetch({
      commandName: 'chio',
    }),
  clear: () =>
    fetch({
      commandName: 'clear',
    }),
  compress: () =>
    fetch({
      commandName: 'compress',
    }),
  csh: () =>
    fetch({
      commandName: 'csh',
      optionsHeadingID: 'Argument_list_processing',
    }),
  diff: () =>
    fetch({
      commandName: 'diff',
    }),
  dig: () =>
    fetch({
      commandName: 'dig',
    }),
  domainname: () =>
    fetch({
      commandName: 'domainname',
    }),
  // BUG: Not only options but also some of address symbols are recognized as options.
  ed: () =>
    fetch({
      commandName: 'ed',
    }),
  eject: () =>
    fetch({
      commandName: 'eject',
    }),
  file: () =>
    fetch({
      commandName: 'file',
    }),
  find: () =>
    fetch({
      commandName: 'find',
    }),
  finger: () =>
    fetch({
      commandName: 'finger',
    }),
  gunzip: () =>
    fetch({
      commandName: 'gunzip',
    }),
  gzcat: () =>
    fetch({
      commandName: 'gzcat',
    }),
  gzip: () =>
    fetch({
      commandName: 'gzip',
    }),
  halt: () =>
    fetch({
      commandName: 'halt',
    }),
  init: () =>
    fetch({
      commandName: 'init',
    }),
  ksh: () =>
    fetch({
      commandName: 'ksh',
    }),
  // BUG: "less" has some special characters in options (e.g. -", -~),
  //      but the fetcher doesn't recognize them.
  less: () =>
    fetch({
      commandName: 'less',
    }),
  login: () =>
    fetch({
      commandName: 'login',
    }),
  man: () =>
    fetch({
      commandName: 'man',
    }),
  // BUG: "-m" option ("-mdoc | -man") is not recognized.
  mandoc: () =>
    fetch({
      commandName: 'mandoc',
    }),
  md5: () =>
    fetch({
      commandName: 'md5',
    }),
  more: () =>
    fetch({
      commandName: 'more',
    }),
  mt: () =>
    fetch({
      commandName: 'mt',
    }),
  nc: () =>
    fetch({
      commandName: 'nc',
    }),
  netstat: () =>
    fetch({
      commandName: 'netstat',
    }),
  // BUG: Option description for "-rw" is ignored.
  pax: () =>
    fetch({
      commandName: 'pax',
    }),
  ping: () =>
    fetch({
      commandName: 'ping',
    }),
  ping6: () =>
    fetch({
      commandName: 'ping6',
    }),
  ps: () =>
    fetch({
      commandName: 'ps',
    }),
  reboot: () =>
    fetch({
      commandName: 'reboot',
    }),
  scp: () =>
    fetch({
      commandName: 'scp',
    }),
  sed: () =>
    fetch({
      commandName: 'sed',
    }),
  sftp: () =>
    fetch({
      commandName: 'sftp',
    }),
  sh: () =>
    fetch({
      commandName: 'sh',
    }),
  sha1: () =>
    fetch({
      commandName: 'sha1',
    }),
  sha256: () =>
    fetch({
      commandName: 'sha256',
    }),
  sha512: () =>
    fetch({
      commandName: 'sha512',
    }),
  shutdown: () =>
    fetch({
      commandName: 'shutdown',
    }),
  ssh: () =>
    fetch({
      commandName: 'ssh',
    }),
  strings: () =>
    fetch({
      commandName: 'strings',
      optionsHeadingID: 'OPTIONS',
    }),
  tar: () =>
    fetch({
      commandName: 'tar',
    }),
  top: () =>
    fetch({
      commandName: 'top',
    }),
  tput: () =>
    fetch({
      commandName: 'tput',
    }),
  uncompress: () =>
    fetch({
      commandName: 'uncompress',
    }),
  wall: () =>
    fetch({
      commandName: 'wall',
    }),
  whatis: () =>
    fetch({
      commandName: 'whatis',
    }),
  zcat: () =>
    fetch({
      commandName: 'zcat',
    }),
};
