import { FetchFunction, Command } from '../types';
import { SourceDef, mysql } from '../common-fetchers/mysql';

// BUG: "--all-tablespaces, -Y" is not fetched
//      because this option is not specified in the option table.

const sourceDef: SourceDef = {
  commandName: 'mysqldump',
  url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html'),
};

export const fetchMysqldump: FetchFunction = async (): Promise<Command[]> =>
  mysql(sourceDef);
