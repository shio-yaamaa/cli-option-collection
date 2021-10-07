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
  ['ffmpeg', fetchFfmpeg],
  ['ffplay', fetchFfplay],
  ['ffprobe', fetchFfprobe],
  ['git', fetchGit],
  ['go', fetchGo],
  ['jq', fetchJq],
  ['magick', fetchMagick],
  ['magick-script', fetchMagickScript],
  ['mysql', fetchMysql],
  ['mysqladmin', fetchMysqladmin],
  ['mysqlcheck', fetchMysqlcheck],
  ['mysqldump', fetchMysqldump],
  ['mysqlimport', fetchMysqlimport],
  ['mysqlpump', fetchMysqlpump],
  ['mysqlshow', fetchMysqlshow],
  ['mysqlslap', fetchMysqlslap],
  ['perl', fetchPerl],
  ['python', fetchPython],
  ['rm', gnuCoreutils.fetchRm],
  ['setlock', fetchSetlock],
  ['softlimit', fetchSoftlimit],
  ['sshuttle', fetchSshuttle],
  ['svc', fetchSvc],
  ['terraform', fetchTerraform],
  ['yarn', fetchYarn],
]);
