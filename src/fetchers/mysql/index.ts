import { FetchFunction, Command } from '../../types';
import { fetch } from './fetcher';

// Alternative sources:
// - https://github.com/mysql/mysql-server/blob/8.0/client/mysql.cc#L1637
// - https://github.com/mysql/mysql-server/blob/8.0/man/mysql.1
// The webpage has more succinct descriptions than the man page.

export const fetchMysql: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'mysql',
    url: new URL(
      'https://dev.mysql.com/doc/refman/8.0/en/mysql-command-options.html'
    ),
  });

export const fetchMysqladmin: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'mysqladmin',
    url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqladmin.html'),
  });

export const fetchMysqlcheck: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'mysqlcheck',
    url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlcheck.html'),
  });

export const fetchMysqldump: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'mysqldump',
    url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html'),
  });

export const fetchMysqlimport: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'mysqlimport',
    url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html'),
  });

export const fetchMysqlpump: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'mysqlpump',
    url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlpump.html'),
  });

export const fetchMysqlshow: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'mysqlshow',
    url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlshow.html'),
  });

export const fetchMysqlslap: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'mysqlslap',
    url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlslap.html'),
  });
