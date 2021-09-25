import { FetchFunction, Command } from '../types';
import { SourceDef, mysql } from '../common-fetchers/mysql';

const sourceDef: SourceDef = {
  commandName: 'mysqlslap',
  url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlslap.html'),
};

export const fetchMysqlslap: FetchFunction = async (): Promise<Command[]> =>
  mysql(sourceDef);
