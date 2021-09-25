import { FetchFunction, Command } from '../types';
import { SourceDef, mysql } from '../common-fetchers/mysql';

const sourceDef: SourceDef = {
  commandName: 'mysqlcheck',
  url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlcheck.html'),
};

export const fetchMysqlcheck: FetchFunction = async (): Promise<Command[]> =>
  mysql(sourceDef);
