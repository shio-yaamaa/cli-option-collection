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

// BUG: Some of the options listed in the documentation is not available for "clear" command
//      because the page is shared with "tput" command.
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

// BUG: This command is listed in the same page as "mt" command,
//      so "mt" command's options are also recognized as this command's options
//      though they should not be.
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

export const fetchMd5: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'md5',
    optionsHeadingID: 'DESCRIPTION',
  });

// BUG: This command is listed in the same page as "eject" command,
//      so "eject" command's options are also recognized as this command's options
//      though they should not be.
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

// BUG: The table in "-f" option's description is not stringified in a human-readable way.
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

// BUG: Since "ping" and "ping6" commands share the same man page,
//      they have the same option list though some of them are
//      IPv4- or IPv6-only.
export const fetchPing: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'ping',
    optionsHeadingID: 'DESCRIPTION',
  });

// BUG: Since "ping" and "ping6" commands share the same man page,
//      they have the same option list though some of them are
//      IPv4- or IPv6-only.
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
