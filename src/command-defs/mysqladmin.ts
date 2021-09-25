import { FetchFunction, Command } from '../types';
import { SourceDef, mysql } from '../common-fetchers/mysql';

const sourceDef: SourceDef = {
  commandName: 'mysqladmin',
  url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqladmin.html'),
};

export const fetchMysqladmin: FetchFunction = async (): Promise<Command[]> =>
  mysql(sourceDef);
