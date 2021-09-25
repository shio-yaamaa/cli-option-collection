import { FetchFunction, Command } from '../types';
import { SourceDef, mysql } from '../common-fetchers/mysql';

const sourceDef: SourceDef = {
  commandName: 'mysqlimport',
  url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html'),
};

export const fetchMysqlimport: FetchFunction = async (): Promise<Command[]> =>
  mysql(sourceDef);
