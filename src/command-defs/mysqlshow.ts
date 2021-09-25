import { FetchFunction, Command } from '../types';
import { SourceDef, mysql } from '../common-fetchers/mysql';

const sourceDef: SourceDef = {
  commandName: 'mysqlshow',
  url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlshow.html'),
};

export const fetchMysqlshow: FetchFunction = async (): Promise<Command[]> =>
  mysql(sourceDef);
