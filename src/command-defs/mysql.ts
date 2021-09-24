import { FetchFunction, Command } from '../types';
import { SourceDef, mysql } from '../common-fetchers/mysql';

// Alternative sources:
// - https://github.com/mysql/mysql-server/blob/8.0/client/mysql.cc#L1637
// - https://github.com/mysql/mysql-server/blob/8.0/man/mysql.1

const sourceDef: SourceDef = {
  commandName: 'mysql',
  url: new URL(
    'https://dev.mysql.com/doc/refman/8.0/en/mysql-command-options.html'
  ),
};

export const fetchMysql: FetchFunction = async (): Promise<Command[]> =>
  mysql(sourceDef);
