import { SourceDef, mysql } from '../common-fetchers/mysql';

const sourceDef: SourceDef = {
  url: 'https://dev.mysql.com/doc/refman/8.0/en/mysql-command-options.html',
};

export const fetchMysqldump = () => mysql(sourceDef);
