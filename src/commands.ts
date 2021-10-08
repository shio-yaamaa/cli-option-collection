import { FetchFunction } from './types';

import { fetchAptCache } from './command-defs/apt-cache';
import { fetchAptGet } from './command-defs/apt-get';
import { fetchBrew } from './command-defs/brew';
import { fetchDocker } from './command-defs/docker';
import { fetchDot } from './command-defs/dot';
import { fetchFfmpeg } from './command-defs/ffmpeg';
import { fetchFfplay } from './command-defs/ffplay';
import { fetchFfprobe } from './command-defs/ffprobe';
import { fetchGit } from './command-defs/git';
import * as gnuCoreutils from './command-defs/gnu-coreutils';
import { fetchGo } from './command-defs/go';
import { fetchJq } from './command-defs/jq';
import { fetchMagick } from './command-defs/magick';
import { fetchMagickScript } from './command-defs/magick-script';
import { fetchMysql } from './command-defs/mysql';
import { fetchMysqladmin } from './command-defs/mysqladmin';
import { fetchMysqlcheck } from './command-defs/mysqlcheck';
import { fetchMysqldump } from './command-defs/mysqldump';
import { fetchMysqlimport } from './command-defs/mysqlimport';
import { fetchMysqlpump } from './command-defs/mysqlpump';
import { fetchMysqlshow } from './command-defs/mysqlshow';
import { fetchMysqlslap } from './command-defs/mysqlslap';
import { fetchPerl } from './command-defs/perl';
import { fetchPython } from './command-defs/python';
import { fetchRsync } from './command-defs/rsync';
import { fetchSetlock } from './command-defs/setlock';
import { fetchSoftlimit } from './command-defs/softlimit';
import { fetchSshuttle } from './command-defs/sshuttle';
import { fetchSvc } from './command-defs/svc';
import { fetchTerraform } from './command-defs/terraform';
import { fetchYarn } from './command-defs/yarn';

export const baseCommandToFetchFunction = new Map<string, FetchFunction>([
  ['apt-cache', fetchAptCache],
  ['apt-get', fetchAptGet],
  ['arch', gnuCoreutils.fetchArch],
  ['b2sum', gnuCoreutils.fetchB2sum],
  ['base32', gnuCoreutils.fetchBase32],
  ['base64', gnuCoreutils.fetchBase64],
  ['basename', gnuCoreutils.fetchBasename],
  ['basenc', gnuCoreutils.fetchBasenc],
  ['brew', fetchBrew],
  ['cat', gnuCoreutils.fetchCat],
  ['chcon', gnuCoreutils.fetchChcon],
  ['chgrp', gnuCoreutils.fetchChgrp],
  ['chmod', gnuCoreutils.fetchChmod],
  ['chown', gnuCoreutils.fetchChown],
  ['chroot', gnuCoreutils.fetchChroot],
  ['cksum', gnuCoreutils.fetchCksum],
  ['comm', gnuCoreutils.fetchComm],
  ['coreutils', gnuCoreutils.fetchCoreutils],
  ['cp', gnuCoreutils.fetchCp],
  ['csplit', gnuCoreutils.fetchCsplit],
  ['cut', gnuCoreutils.fetchCut],
  ['date', gnuCoreutils.fetchDate],
  ['dd', gnuCoreutils.fetchDd],
  ['df', gnuCoreutils.fetchDf],
  ['dir', gnuCoreutils.fetchDir],
  ['dircolors', gnuCoreutils.fetchDircolors],
  ['dirname', gnuCoreutils.fetchDirname],
  ['docker', fetchDocker],
  ['dot', fetchDot],
  ['du', gnuCoreutils.fetchDu],
  ['echo', gnuCoreutils.fetchEcho],
  ['env', gnuCoreutils.fetchEnv],
  ['expand', gnuCoreutils.fetchExpand],
  ['expr', gnuCoreutils.fetchExpr],
  ['factor', gnuCoreutils.fetchFactor],
  ['false', gnuCoreutils.fetchFalse],
  ['ffmpeg', fetchFfmpeg],
  ['ffplay', fetchFfplay],
  ['ffprobe', fetchFfprobe],
  ['fmt', gnuCoreutils.fetchFmt],
  ['fold', gnuCoreutils.fetchFold],
  ['git', fetchGit],
  ['go', fetchGo],
  ['groups', gnuCoreutils.fetchGroups],
  ['head', gnuCoreutils.fetchHead],
  ['hostid', gnuCoreutils.fetchHostid],
  ['hostname', gnuCoreutils.fetchHostname],
  ['id', gnuCoreutils.fetchId],
  ['install', gnuCoreutils.fetchInstall],
  ['join', gnuCoreutils.fetchJoin],
  ['jq', fetchJq],
  ['kill', gnuCoreutils.fetchKill],
  ['link', gnuCoreutils.fetchLink],
  ['ln', gnuCoreutils.fetchLn],
  ['logname', gnuCoreutils.fetchLogname],
  ['ls', gnuCoreutils.fetchLs],
  ['magick', fetchMagick],
  ['magick-script', fetchMagickScript],
  ['md5sum', gnuCoreutils.fetchMd5sum],
  ['mkdir', gnuCoreutils.fetchMkdir],
  ['mkfifo', gnuCoreutils.fetchMkfifo],
  ['mknod', gnuCoreutils.fetchMknod],
  ['mktemp', gnuCoreutils.fetchMktemp],
  ['mv', gnuCoreutils.fetchMv],
  ['mysql', fetchMysql],
  ['mysqladmin', fetchMysqladmin],
  ['mysqlcheck', fetchMysqlcheck],
  ['mysqldump', fetchMysqldump],
  ['mysqlimport', fetchMysqlimport],
  ['mysqlpump', fetchMysqlpump],
  ['mysqlshow', fetchMysqlshow],
  ['mysqlslap', fetchMysqlslap],
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
  ['pr', gnuCoreutils.fetchPr],
  ['printenv', gnuCoreutils.fetchPrintenv],
  ['printf', gnuCoreutils.fetchPrintf],
  ['ptx', gnuCoreutils.fetchPtx],
  ['pwd', gnuCoreutils.fetchPwd],
  ['python', fetchPython],
  ['readlink', gnuCoreutils.fetchReadlink],
  ['realpath', gnuCoreutils.fetchRealpath],
  ['rm', gnuCoreutils.fetchRm],
  ['rmdir', gnuCoreutils.fetchRmdir],
  ['rsync', fetchRsync],
  ['runcon', gnuCoreutils.fetchRuncon],
  ['seq', gnuCoreutils.fetchSeq],
  ['setlock', fetchSetlock],
  ['sha1sum', gnuCoreutils.fetchSha1sum],
  ['sha224sum', gnuCoreutils.fetchSha224sum],
  ['sha256sum', gnuCoreutils.fetchSha256sum],
  ['sha384sum', gnuCoreutils.fetchSha384sum],
  ['sha512sum', gnuCoreutils.fetchSha512sum],
  ['shred', gnuCoreutils.fetchShred],
  ['shuf', gnuCoreutils.fetchShuf],
  ['sleep', gnuCoreutils.fetchSleep],
  ['softlimit', fetchSoftlimit],
  ['sort', gnuCoreutils.fetchSort],
  ['split', gnuCoreutils.fetchSplit],
  ['sshuttle', fetchSshuttle],
  ['stat', gnuCoreutils.fetchStat],
  ['stdbuf', gnuCoreutils.fetchStdbuf],
  ['stty', gnuCoreutils.fetchStty],
  ['sum', gnuCoreutils.fetchSum],
  ['svc', fetchSvc],
  ['sync', gnuCoreutils.fetchSync],
  ['tac', gnuCoreutils.fetchTac],
  ['tail', gnuCoreutils.fetchTail],
  ['tee', gnuCoreutils.fetchTee],
  ['terraform', fetchTerraform],
  ['test', gnuCoreutils.fetchTest],
  ['timeout', gnuCoreutils.fetchTimeout],
  ['touch', gnuCoreutils.fetchTouch],
  ['tr', gnuCoreutils.fetchTr],
  ['true', gnuCoreutils.fetchTrue],
  ['truncate', gnuCoreutils.fetchTruncate],
  ['tsort', gnuCoreutils.fetchTsort],
  ['tty', gnuCoreutils.fetchTty],
  ['uname', gnuCoreutils.fetchUname],
  ['unexpand', gnuCoreutils.fetchUnexpand],
  ['uniq', gnuCoreutils.fetchUniq],
  ['unlink', gnuCoreutils.fetchUnlink],
  ['uptime', gnuCoreutils.fetchUptime],
  ['users', gnuCoreutils.fetchUsers],
  ['vdir', gnuCoreutils.fetchVdir],
  ['wc', gnuCoreutils.fetchWc],
  ['yarn', fetchYarn],
]);
