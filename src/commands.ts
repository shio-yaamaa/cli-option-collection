import { FetchFunction } from './types';

import { fetchAptCache } from './command-defs/apt-cache';
import { fetchAptGet } from './command-defs/apt-get';
import { fetchBrew } from './command-defs/brew';
import { fetchDocker } from './command-defs/docker';
import { fetchFfmpeg } from './command-defs/ffmpeg';
import { fetchFfplay } from './command-defs/ffplay';
import { fetchFfprobe } from './command-defs/ffprobe';
import { fetchGo } from './command-defs/go';
import { fetchMysql } from './command-defs/mysql';
import { fetchMysqladmin } from './command-defs/mysqladmin';
import { fetchMysqlcheck } from './command-defs/mysqlcheck';
import { fetchMysqldump } from './command-defs/mysqldump';
import { fetchMysqlimport } from './command-defs/mysqlimport';
import { fetchMysqlpump } from './command-defs/mysqlpump';
import { fetchMysqlshow } from './command-defs/mysqlshow';
import { fetchMysqlslap } from './command-defs/mysqlslap';
import { fetchPerl } from './command-defs/perl';
import { fetchSetlock } from './command-defs/setlock';
import { fetchSoftlimit } from './command-defs/softlimit';
import { fetchSshuttle } from './command-defs/sshuttle';
import { fetchSvc } from './command-defs/svc';
import { fetchYarn } from './command-defs/yarn';

export const baseCommandToFetchFunction = new Map<string, FetchFunction>([
  ['apt-cache', fetchAptCache],
  ['apt-get', fetchAptGet],
  ['brew', fetchBrew],
  ['docker', fetchDocker],
  ['ffmpeg', fetchFfmpeg],
  ['ffplay', fetchFfplay],
  ['ffprobe', fetchFfprobe],
  ['go', fetchGo],
  ['mysql', fetchMysql],
  ['mysqladmin', fetchMysqladmin],
  ['mysqlcheck', fetchMysqlcheck],
  ['mysqldump', fetchMysqldump],
  ['mysqlimport', fetchMysqlimport],
  ['mysqlpump', fetchMysqlpump],
  ['mysqlshow', fetchMysqlshow],
  ['mysqlslap', fetchMysqlslap],
  ['perl', fetchPerl],
  ['setlock', fetchSetlock],
  ['softlimit', fetchSoftlimit],
  ['sshuttle', fetchSshuttle],
  ['svc', fetchSvc],
  ['yarn', fetchYarn],
]);
