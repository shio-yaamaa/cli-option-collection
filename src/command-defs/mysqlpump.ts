import { FetchFunction, Command } from '../types';
import { SourceDef, mysql } from '../common-fetchers/mysql';

const sourceDef: SourceDef = {
  commandName: 'mysqlpump',
  url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlpump.html'),
};

export const fetchMysqlpump: FetchFunction = async (): Promise<Command[]> =>
  mysql(sourceDef);
