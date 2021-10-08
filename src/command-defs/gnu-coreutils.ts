import { FetchFunction, Command } from '../types';
import { coreutils } from '../common-fetchers/gnu-coreutils';

export const fetchArch: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'arch',
    filename: 'arch.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchB2sum: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'b2sum',
    filename: 'b2sum.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchBase32: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'base32',
    filename: 'base32.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchBase64: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'base64',
    filename: 'base64.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchBasename: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'basename',
    filename: 'basename.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchBasenc: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'basenc',
    filename: 'basenc.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchCat: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'cat',
    filename: 'cat.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchChcon: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'chcon',
    filename: 'chcon.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchChgrp: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'chgrp',
    filename: 'chgrp.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchChmod: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'chmod',
    filename: 'chmod.1',
    optionsHeadingID: 'OPTIONS',
  });

export const fetchChown: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'chown',
    filename: 'chown.1',
    optionsHeadingID: 'OPTIONS',
  });

export const fetchChroot: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'chroot',
    filename: 'chroot.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchCksum: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'cksum',
    filename: 'cksum.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchComm: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'comm',
    filename: 'comm.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchCoreutils: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'coreutils',
    filename: 'coreutils.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchCp: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'cp',
    filename: 'cp.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchCsplit: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'csplit',
    filename: 'csplit.1',
    optionsHeadingID: 'DESCRIPTION',
  });

// BUG: "-M" is not an option
export const fetchCut: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'cut',
    filename: 'cut.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchDate: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'date',
    filename: 'date.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchDd: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'dd',
    filename: 'dd.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchDf: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'df',
    filename: 'df.1',
    optionsHeadingID: 'OPTIONS',
  });

export const fetchDir: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'dir',
    filename: 'dir.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchDircolors: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'dircolors',
    filename: 'dircolors.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchDirname: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'dirname',
    filename: 'dirname.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchDu: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'du',
    filename: 'du.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchEcho: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'echo',
    filename: 'echo.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchEnv: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'env',
    filename: 'env.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchExpand: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'expand',
    filename: 'expand.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchExpr: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'expr',
    filename: 'expr.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchFactor: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'factor',
    filename: 'factor.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchFalse: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'false',
    filename: 'false.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchFmt: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'fmt',
    filename: 'fmt.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchFold: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'fold',
    filename: 'fold.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchGroups: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'groups',
    filename: 'groups.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchHead: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'head',
    filename: 'head.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchHostid: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'hostid',
    filename: 'hostid.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchHostname: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'hostname',
    filename: 'hostname.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchId: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'id',
    filename: 'id.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchInstall: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'install',
    filename: 'install.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchJoin: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'join',
    filename: 'join.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchKill: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'kill',
    filename: 'kill.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchLink: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'link',
    filename: 'link.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchLn: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'ln',
    filename: 'ln.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchLogname: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'logname',
    filename: 'logname.1',
    optionsHeadingID: 'DESCRIPTION',
  });

// BUG: Some options has descriptions that takes multiple <dd>s,
//      but the second and later <dd>s are ignored.
export const fetchLs: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'ls',
    filename: 'ls.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchMd5sum: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'md5sum',
    filename: 'md5sum.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchMkdir: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'mkdir',
    filename: 'mkdir.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchMkfifo: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'mkfifo',
    filename: 'mkfifo.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchMknod: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'mknod',
    filename: 'mknod.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchMktemp: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'mktemp',
    filename: 'mktemp.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchMv: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'mv',
    filename: 'mv.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchNice: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'nice',
    filename: 'nice.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchNl: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'nl',
    filename: 'nl.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchNohup: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'nohup',
    filename: 'nohup.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchNproc: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'nproc',
    filename: 'nproc.1',
    optionsHeadingID: 'DESCRIPTION',
  });

// BUG: "-M" is not an option
export const fetchNumfmt: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'numfmt',
    filename: 'numfmt.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchOd: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'od',
    filename: 'od.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchPaste: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'paste',
    filename: 'paste.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchPathchk: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'pathchk',
    filename: 'pathchk.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchPinky: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'pinky',
    filename: 'pinky.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchPr: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'pr',
    filename: 'pr.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchPrintenv: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'printenv',
    filename: 'printenv.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchPrintf: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'printf',
    filename: 'printf.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchPtx: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'ptx',
    filename: 'ptx.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchPwd: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'pwd',
    filename: 'pwd.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchReadlink: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'readlink',
    filename: 'readlink.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchRealpath: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'realpath',
    filename: 'realpath.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchRm: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'rm',
    filename: 'rm.1',
    optionsHeadingID: 'OPTIONS',
  });

// BUG: "--ignore-fail-on-non-empty" option is not recognized as an option.
export const fetchRmdir: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'rmdir',
    filename: 'rmdir.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchRuncon: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'runcon',
    filename: 'runcon.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchSeq: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'seq',
    filename: 'seq.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchSha1sum: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'sha1sum',
    filename: 'sha1sum.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchSha224sum: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'sha224sum',
    filename: 'sha224sum.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchSha256sum: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'sha256sum',
    filename: 'sha256sum.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchSha384sum: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'sha384sum',
    filename: 'sha384sum.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchSha512sum: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'sha512sum',
    filename: 'sha512sum.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchShred: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'shred',
    filename: 'shred.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchShuf: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'shuf',
    filename: 'shuf.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchSleep: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'sleep',
    filename: 'sleep.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchSort: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'sort',
    filename: 'sort.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchSplit: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'split',
    filename: 'split.1',
    optionsHeadingID: 'DESCRIPTION',
  });

// BUG: "-c" and "--format" are not recognized as separate options
//      because they are not delimited by "," in the man page.
export const fetchStat: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'stat',
    filename: 'stat.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchStdbuf: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'stdbuf',
    filename: 'stdbuf.1',
    optionsHeadingID: 'DESCRIPTION',
  });

export const fetchStty: FetchFunction = async (): Promise<Command[]> =>
  coreutils({
    commandName: 'stty',
    filename: 'stty.1',
    optionsHeadingID: 'DESCRIPTION',
  });
