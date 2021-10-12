import { fetch } from './fetcher';

// Alternative sources:
// - https://github.com/mysql/mysql-server/blob/8.0/client/mysql.cc#L1637
// - https://github.com/mysql/mysql-server/blob/8.0/man/mysql.1
// The webpage has more succinct descriptions than the man page.

export const mysql = {
  mysql: () =>
    fetch({
      commandName: 'mysql',
      url: new URL(
        'https://dev.mysql.com/doc/refman/8.0/en/mysql-command-options.html'
      ),
    }),
  mysqladmin: () =>
    fetch({
      commandName: 'mysqladmin',
      url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqladmin.html'),
    }),
  mysqlcheck: () =>
    fetch({
      commandName: 'mysqlcheck',
      url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlcheck.html'),
    }),
  mysqldump: () =>
    fetch({
      commandName: 'mysqldump',
      url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html'),
    }),
  mysqlimport: () =>
    fetch({
      commandName: 'mysqlimport',
      url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html'),
    }),
  mysqlpump: () =>
    fetch({
      commandName: 'mysqlpump',
      url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlpump.html'),
    }),
  mysqlshow: () =>
    fetch({
      commandName: 'mysqlshow',
      url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlshow.html'),
    }),
  mysqlslap: () =>
    fetch({
      commandName: 'mysqlslap',
      url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlslap.html'),
    }),
};
