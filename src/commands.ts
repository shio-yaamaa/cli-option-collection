import { FetchFunction } from './types';

import { fetchBrew } from './command-defs/brew';
import { fetchCurl } from './command-defs/curl';
import { fetchDiff } from './command-defs/diff';
import { fetchDocker } from './command-defs/docker';
import { fetchEcho } from './command-defs/echo';
import { fetchFfmpeg } from './command-defs/ffmpeg';
import { fetchFind } from './command-defs/find';
import { fetchGo } from './command-defs/go';
import { fetchGrep } from './command-defs/grep';
import { fetchMkdir } from './command-defs/mkdir';
import { fetchMv } from './command-defs/mv';
import { fetchMysql } from './command-defs/mysql';
import { fetchMysqladmin } from './command-defs/mysqladmin';
import { fetchMysqlcheck } from './command-defs/mysqlcheck';
import { fetchMysqldump } from './command-defs/mysqldump';
import { fetchMysqlimport } from './command-defs/mysqlimport';
import { fetchMysqlpump } from './command-defs/mysqlpump';
import { fetchMysqlshow } from './command-defs/mysqlshow';
import { fetchMysqlslap } from './command-defs/mysqlslap';
import { fetchPerl } from './command-defs/perl';
import { fetchPs } from './command-defs/ps';
import { fetchPwd } from './command-defs/pwd';
import { fetchRm } from './command-defs/rm';
import { fetchRsync } from './command-defs/rsync';
import { fetchSed } from './command-defs/sed';
import { fetchSsh } from './command-defs/ssh';
import { fetchTail } from './command-defs/tail';
import { fetchTar } from './command-defs/tar';
import { fetchTop } from './command-defs/top';
import { fetchTouch } from './command-defs/touch';
import { fetchWhoami } from './command-defs/whoami';
import { fetchYarn } from './command-defs/yarn';

export const baseCommandToFetchFunction = new Map<string, FetchFunction>([
  ['brew', fetchBrew],
  ['curl', fetchCurl],
  ['diff', fetchDiff],
  ['docker', fetchDocker],
  ['echo', fetchEcho],
  ['ffmpeg', fetchFfmpeg],
  ['find', fetchFind],
  ['go', fetchGo],
  ['grep', fetchGrep],
  ['mkdir', fetchMkdir],
  ['mv', fetchMv],
  ['mysql', fetchMysql],
  ['mysqladmin', fetchMysqladmin],
  ['mysqlcheck', fetchMysqlcheck],
  ['mysqldump', fetchMysqldump],
  ['mysqlimport', fetchMysqlimport],
  ['mysqlpump', fetchMysqlpump],
  ['mysqlshow', fetchMysqlshow],
  ['mysqlslap', fetchMysqlslap],
  ['perl', fetchPerl],
  ['ps', fetchPs],
  ['pwd', fetchPwd],
  ['rm', fetchRm],
  ['rsync', fetchRsync],
  ['sed', fetchSed],
  ['ssh', fetchSsh],
  ['tail', fetchTail],
  ['tar', fetchTar],
  ['top', fetchTop],
  ['touch', fetchTouch],
  ['whoami', fetchWhoami],
  ['yarn', fetchYarn],
]);
