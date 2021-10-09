import { FetchFunction } from './types';
import { joinFetchFunctions as join } from './utils/fetchFunction';

import * as apt from './fetchers/apt';
import * as bashBuiltin from './fetchers/bash-builtin';
import { fetchBrew } from './fetchers/brew';
import * as daemontools from './fetchers/daemontools';
import { fetchDocker } from './fetchers/docker';
import * as ffmpeg from './fetchers/ffmpeg';
import { fetchGit } from './fetchers/git';
import * as gnuCoreutils from './fetchers/gnu-coreutils';
import { fetchGo } from './fetchers/go';
import * as graphviz from './fetchers/graphviz';
import * as imagemagick from './fetchers/imagemagick';
import { fetchJq } from './fetchers/jq';
import * as mysql from './fetchers/mysql';
import { fetchPerl } from './fetchers/perl';
import { fetchPython } from './fetchers/python';
import { fetchRsync } from './fetchers/rsync';
import { fetchSshuttle } from './fetchers/sshuttle';
import { fetchTerraform } from './fetchers/terraform';
import { fetchYarn } from './fetchers/yarn';

export const baseCommandToFetchFunction = new Map<string, FetchFunction>([
  ['alias', bashBuiltin.fetchAlias],
  ['apt-cache', apt.fetchAptCache],
  ['apt-get', apt.fetchAptGet],
  ['arch', gnuCoreutils.fetchArch],
  ['b2sum', gnuCoreutils.fetchB2sum],
  ['base32', gnuCoreutils.fetchBase32],
  ['base64', gnuCoreutils.fetchBase64],
  ['basename', gnuCoreutils.fetchBasename],
  ['basenc', gnuCoreutils.fetchBasenc],
  ['bg', bashBuiltin.fetchBg],
  ['bind', bashBuiltin.fetchBind],
  ['break', bashBuiltin.fetchBreak],
  ['brew', fetchBrew],
  ['builtin', bashBuiltin.fetchBuiltin],
  ['caller', bashBuiltin.fetchCaller],
  ['cat', gnuCoreutils.fetchCat],
  ['cd', bashBuiltin.fetchCd],
  ['chcon', gnuCoreutils.fetchChcon],
  ['chgrp', gnuCoreutils.fetchChgrp],
  ['chmod', gnuCoreutils.fetchChmod],
  ['chown', gnuCoreutils.fetchChown],
  ['chroot', gnuCoreutils.fetchChroot],
  ['cksum', gnuCoreutils.fetchCksum],
  ['comm', gnuCoreutils.fetchComm],
  ['command', bashBuiltin.fetchCommand],
  ['compgen', bashBuiltin.fetchCompgen],
  ['complete', bashBuiltin.fetchComplete],
  ['compopt', bashBuiltin.fetchCompopt],
  ['continue', bashBuiltin.fetchContinue],
  ['coreutils', gnuCoreutils.fetchCoreutils],
  ['cp', gnuCoreutils.fetchCp],
  ['csplit', gnuCoreutils.fetchCsplit],
  ['cut', gnuCoreutils.fetchCut],
  ['date', gnuCoreutils.fetchDate],
  ['dd', gnuCoreutils.fetchDd],
  ['declare', bashBuiltin.fetchDeclare],
  ['df', gnuCoreutils.fetchDf],
  ['dir', gnuCoreutils.fetchDir],
  ['dirs', bashBuiltin.fetchDirs],
  ['dircolors', gnuCoreutils.fetchDircolors],
  ['dirname', gnuCoreutils.fetchDirname],
  ['disown', bashBuiltin.fetchDisown],
  ['docker', fetchDocker],
  ['dot', graphviz.fetchDot],
  ['du', gnuCoreutils.fetchDu],
  ['echo', join(gnuCoreutils.fetchEcho, bashBuiltin.fetchEcho)],
  ['enable', bashBuiltin.fetchEnable],
  ['env', gnuCoreutils.fetchEnv],
  ['eval', bashBuiltin.fetchEval],
  ['exec', bashBuiltin.fetchExec],
  ['exit', bashBuiltin.fetchExit],
  ['expand', gnuCoreutils.fetchExpand],
  ['export', bashBuiltin.fetchExport],
  ['expr', gnuCoreutils.fetchExpr],
  ['factor', gnuCoreutils.fetchFactor],
  ['false', join(gnuCoreutils.fetchFalse, bashBuiltin.fetchFalse)],
  ['fc', bashBuiltin.fetchFc],
  ['ffmpeg', ffmpeg.fetchFfmpeg],
  ['ffplay', ffmpeg.fetchFfplay],
  ['ffprobe', ffmpeg.fetchFfprobe],
  ['fg', bashBuiltin.fetchFg],
  ['fmt', gnuCoreutils.fetchFmt],
  ['fold', gnuCoreutils.fetchFold],
  ['getopts', bashBuiltin.fetchGetopts],
  ['git', fetchGit],
  ['go', fetchGo],
  ['groups', gnuCoreutils.fetchGroups],
  ['hash', bashBuiltin.fetchHash],
  ['head', gnuCoreutils.fetchHead],
  ['help', bashBuiltin.fetchHelp],
  ['history', bashBuiltin.fetchHistory],
  ['hostid', gnuCoreutils.fetchHostid],
  ['hostname', gnuCoreutils.fetchHostname],
  ['id', gnuCoreutils.fetchId],
  ['inlib', bashBuiltin.fetchInlib],
  ['install', gnuCoreutils.fetchInstall],
  ['jobs', bashBuiltin.fetchJobs],
  ['join', gnuCoreutils.fetchJoin],
  ['jq', fetchJq],
  ['kill', join(gnuCoreutils.fetchKill, bashBuiltin.fetchKill)],
  ['let', bashBuiltin.fetchLet],
  ['link', gnuCoreutils.fetchLink],
  ['ln', gnuCoreutils.fetchLn],
  ['local', bashBuiltin.fetchLocal],
  ['logname', gnuCoreutils.fetchLogname],
  ['logout', bashBuiltin.fetchLogout],
  ['ls', gnuCoreutils.fetchLs],
  ['magick', imagemagick.fetchMagick],
  ['magick-script', imagemagick.fetchMagickScript],
  ['mapfile', bashBuiltin.fetchMapfile],
  ['md5sum', gnuCoreutils.fetchMd5sum],
  ['mkdir', gnuCoreutils.fetchMkdir],
  ['mkfifo', gnuCoreutils.fetchMkfifo],
  ['mknod', gnuCoreutils.fetchMknod],
  ['mktemp', gnuCoreutils.fetchMktemp],
  ['mv', gnuCoreutils.fetchMv],
  ['mysql', mysql.fetchMysql],
  ['mysqladmin', mysql.fetchMysqladmin],
  ['mysqlcheck', mysql.fetchMysqlcheck],
  ['mysqldump', mysql.fetchMysqldump],
  ['mysqlimport', mysql.fetchMysqlimport],
  ['mysqlpump', mysql.fetchMysqlpump],
  ['mysqlshow', mysql.fetchMysqlshow],
  ['mysqlslap', mysql.fetchMysqlslap],
  ['nice', gnuCoreutils.fetchNice],
  ['nl', gnuCoreutils.fetchNl],
  ['nohup', gnuCoreutils.fetchNohup],
  ['nproc', gnuCoreutils.fetchNproc],
  ['numfmt', gnuCoreutils.fetchNumfmt],
  ['od', gnuCoreutils.fetchOd],
  ['paste', gnuCoreutils.fetchPaste],
  ['pathchk', gnuCoreutils.fetchPathchk],
  ['perl', fetchPerl],
  ['pinky', gnuCoreutils.fetchPinky],
  ['popd', bashBuiltin.fetchPopd],
  ['pr', gnuCoreutils.fetchPr],
  ['printenv', gnuCoreutils.fetchPrintenv],
  ['printf', join(gnuCoreutils.fetchPrintf, bashBuiltin.fetchPrintf)],
  ['ptx', gnuCoreutils.fetchPtx],
  ['pushd', bashBuiltin.fetchPushd],
  ['pwd', join(gnuCoreutils.fetchPwd, bashBuiltin.fetchPwd)],
  ['python', fetchPython],
  ['read', bashBuiltin.fetchRead],
  ['readarray', bashBuiltin.fetchReadarray],
  ['readlink', gnuCoreutils.fetchReadlink],
  ['readonly', bashBuiltin.fetchReadonly],
  ['realpath', gnuCoreutils.fetchRealpath],
  ['return', bashBuiltin.fetchReturn],
  ['rm', gnuCoreutils.fetchRm],
  ['rmdir', gnuCoreutils.fetchRmdir],
  ['rsync', fetchRsync],
  ['runcon', gnuCoreutils.fetchRuncon],
  ['seq', gnuCoreutils.fetchSeq],
  ['set', bashBuiltin.fetchSet],
  ['setlock', daemontools.fetchSetlock],
  ['sha1sum', gnuCoreutils.fetchSha1sum],
  ['sha224sum', gnuCoreutils.fetchSha224sum],
  ['sha256sum', gnuCoreutils.fetchSha256sum],
  ['sha384sum', gnuCoreutils.fetchSha384sum],
  ['sha512sum', gnuCoreutils.fetchSha512sum],
  ['shift', bashBuiltin.fetchShift],
  ['shopt', bashBuiltin.fetchShopt],
  ['shred', gnuCoreutils.fetchShred],
  ['shuf', gnuCoreutils.fetchShuf],
  ['sleep', gnuCoreutils.fetchSleep],
  ['softlimit', daemontools.fetchSoftlimit],
  ['sort', gnuCoreutils.fetchSort],
  ['source', bashBuiltin.fetchSource],
  ['split', gnuCoreutils.fetchSplit],
  ['sshuttle', fetchSshuttle],
  ['stat', gnuCoreutils.fetchStat],
  ['stdbuf', gnuCoreutils.fetchStdbuf],
  ['stty', gnuCoreutils.fetchStty],
  ['sum', gnuCoreutils.fetchSum],
  ['suspend', bashBuiltin.fetchSuspend],
  ['svc', daemontools.fetchSvc],
  ['sync', gnuCoreutils.fetchSync],
  ['tac', gnuCoreutils.fetchTac],
  ['tail', gnuCoreutils.fetchTail],
  ['tee', gnuCoreutils.fetchTee],
  ['terraform', fetchTerraform],
  ['test', join(gnuCoreutils.fetchTest, bashBuiltin.fetchTest)],
  ['time', bashBuiltin.fetchTime],
  ['timeout', gnuCoreutils.fetchTimeout],
  ['times', bashBuiltin.fetchTimes],
  ['touch', gnuCoreutils.fetchTouch],
  ['tr', gnuCoreutils.fetchTr],
  ['trap', bashBuiltin.fetchTrap],
  ['true', join(gnuCoreutils.fetchTrue, bashBuiltin.fetchTrue)],
  ['truncate', gnuCoreutils.fetchTruncate],
  ['tsort', gnuCoreutils.fetchTsort],
  ['tty', gnuCoreutils.fetchTty],
  ['type', bashBuiltin.fetchType],
  ['typeset', bashBuiltin.fetchTypeset],
  ['ulimit', bashBuiltin.fetchUlimit],
  ['umask', bashBuiltin.fetchUmask],
  ['unalias', bashBuiltin.fetchUnalias],
  ['uname', gnuCoreutils.fetchUname],
  ['unexpand', gnuCoreutils.fetchUnexpand],
  ['uniq', gnuCoreutils.fetchUniq],
  ['unlink', gnuCoreutils.fetchUnlink],
  ['unset', bashBuiltin.fetchUnset],
  ['uptime', gnuCoreutils.fetchUptime],
  ['users', gnuCoreutils.fetchUsers],
  ['vdir', gnuCoreutils.fetchVdir],
  ['wc', gnuCoreutils.fetchWc],
  ['who', gnuCoreutils.fetchWho],
  ['whoami', gnuCoreutils.fetchWhoami],
  ['yarn', fetchYarn],
  ['yes', gnuCoreutils.fetchYes],
]);
