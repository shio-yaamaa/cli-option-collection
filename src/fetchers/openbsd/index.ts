import { FetchFunction, Command } from '../../types';
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
//      (e.g. [tput, clear], [gzip, gunzip, gzcat], [mt, eject], [ping, ping6])
// BUG: Tables and definition lists are not stringified in a human-readable way.
//      (e.g. netstat -f, gzip -l)

// BUG: "-safe" flag is not recognized as an option
//      because it uses single dash with long option name.
export const fetchAwk: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'awk',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchChio: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'chio',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchChflags: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'chflags',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchClear: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'clear',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchCsh: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'csh',
    optionsHeadingID: 'Argument_list_processing',
  });

export const fetchDiff: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'diff',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchDig: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'dig',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchDomainname: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'domainname',
    optionsHeadingID: 'DESCRIPTION',
  });

// BUG: Not only options but also some of address symbols are recognized as options.
export const fetchEd: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'ed',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchEject: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'eject',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchFind: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'find',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchGunzip: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'gunzip',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchGzcat: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'gzcat',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchGzip: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'gzip',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchHalt: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'halt',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchKsh: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'ksh',
    optionsHeadingID: 'DESCRIPTION',
  });

// BUG: "less" has some special characters in options (e.g. -", -~),
//      but the fetcher doesn't recognize them.
export const fetchLess: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'less',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchMan: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'man',
    optionsHeadingID: 'DESCRIPTION',
  });

// BUG: "-m" option ("-mdoc | -man") is not recognized.
export const fetchMandoc: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'mandoc',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchMd5: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'md5',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchMore: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'more',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchMt: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'mt',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchNc: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'nc',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchNetstat: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'netstat',
    optionsHeadingID: 'DESCRIPTION',
  });

// BUG: Option description for "-rw" is ignored.
export const fetchPax: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'pax',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchPing: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'ping',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchPing6: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'ping6',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchPs: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'ps',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchReboot: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'reboot',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchScp: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'scp',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchSed: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'sed',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchSftp: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'sftp',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchSh: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'sh',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchSha1: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'sha1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchSha256: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'sha256',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchSha512: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'sha512',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchShutdown: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'shutdown',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchSsh: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'ssh',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchTar: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'tar',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchTput: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'tput',
    optionsHeadingID: 'DESCRIPTION',
  });
