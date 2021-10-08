import { FetchFunction, Command } from '../types';
import { mysql } from '../common-fetchers/mysql';

// Alternative sources:
// - https://github.com/mysql/mysql-server/blob/8.0/client/mysql.cc#L1637
// - https://github.com/mysql/mysql-server/blob/8.0/man/mysql.1
// The webpage has more succinct descriptions than the man page.

export const fetchMysql: FetchFunction = async (): Promise<Command[]> =>
  mysql({
    commandName: 'mysql',
    url: new URL(
      'https://dev.mysql.com/doc/refman/8.0/en/mysql-command-options.html'
    ),
  });

export const fetchMysqladmin: FetchFunction = async (): Promise<Command[]> =>
  mysql({
    commandName: 'mysqladmin',
    url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqladmin.html'),
  });

export const fetchMysqlcheck: FetchFunction = async (): Promise<Command[]> =>
  mysql({
    commandName: 'mysqlcheck',
    url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlcheck.html'),
  });

export const fetchMysqldump: FetchFunction = async (): Promise<Command[]> =>
  mysql({
    commandName: 'mysqldump',
    url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html'),
  });

export const fetchMysqlimport: FetchFunction = async (): Promise<Command[]> =>
  mysql({
    commandName: 'mysqlimport',
    url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html'),
  });

export const fetchMysqlpump: FetchFunction = async (): Promise<Command[]> =>
  mysql({
    commandName: 'mysqlpump',
    url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlpump.html'),
  });

export const fetchMysqlshow: FetchFunction = async (): Promise<Command[]> =>
  mysql({
    commandName: 'mysqlshow',
    url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlshow.html'),
  });

export const fetchMysqlslap: FetchFunction = async (): Promise<Command[]> =>
  mysql({
    commandName: 'mysqlslap',
    url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlslap.html'),
  });
