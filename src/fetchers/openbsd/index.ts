import { build } from './builder';

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
  apropos: build('apropos'),
  // BUG: "-safe" flag is not recognized as an option
  //      because it uses single dash with long option name.
  awk: build('awk'),
  chflags: build('chflags'),
  chio: build('chio'),
  clear: build('clear'),
  compress: build('compress'),
  csh: build('csh', {
    optionsHeadingID: 'Argument_list_processing',
  }),
  diff: build('diff'),
  dig: build('dig'),
  domainname: build('domainname'),
  // BUG: Not only options but also some of address symbols are recognized as options.
  ed: build('ed'),
  eject: build('eject'),
  file: build('file'),
  find: build('find'),
  finger: build('finger'),
  gunzip: build('gunzip'),
  gzcat: build('gzcat'),
  gzip: build('gzip'),
  halt: build('halt'),
  init: build('init'),
  ksh: build('ksh'),
  // BUG: "less" has some special characters in options (e.g. -", -~),
  //      but the fetcher doesn't recognize them.
  less: build('less'),
  login: build('login'),
  man: build('man'),
  // BUG: "-m" option ("-mdoc | -man") is not recognized.
  mandoc: build('mandoc'),
  md5: build('md5'),
  more: build('more'),
  mt: build('mt'),
  nc: build('nc'),
  netstat: build('netstat'),
  // BUG: Option description for "-rw" is ignored.
  patch: build('patch'),
  pax: build('pax'),
  ping: build('ping'),
  ping6: build('ping6'),
  ps: build('ps'),
  reboot: build('reboot'),
  scp: build('scp'),
  sed: build('sed'),
  sftp: build('sftp'),
  sh: build('sh'),
  sha1: build('sha1'),
  sha256: build('sha256'),
  sha512: build('sha512'),
  shutdown: build('shutdown'),
  ssh: build('ssh'),
  strings: build('strings', {
    optionsHeadingID: 'OPTIONS',
  }),
  tar: build('tar'),
  top: build('top'),
  tput: build('tput'),
  uncompress: build('uncompress'),
  wall: build('wall'),
  whatis: build('whatis'),
  zcat: build('zcat'),
};
