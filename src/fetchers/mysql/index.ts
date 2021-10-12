import { build } from './builder';

// Alternative sources:
// - https://github.com/mysql/mysql-server/blob/8.0/client/mysql.cc#L1637
// - https://github.com/mysql/mysql-server/blob/8.0/man/mysql.1
// The webpage has more succinct descriptions than the man page.

export const mysql = {
  mysql: build('mysql', {
    url: new URL(
      'https://dev.mysql.com/doc/refman/8.0/en/mysql-command-options.html'
    ),
  }),
  mysqladmin: build('mysqladmin', {
    url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqladmin.html'),
  }),
  mysqlcheck: build('mysqlcheck', {
    url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlcheck.html'),
  }),
  mysqldump: build('mysqldump', {
    url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html'),
  }),
  mysqlimport: build('mysqlimport', {
    url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html'),
  }),
  mysqlpump: build('mysqlpump', {
    url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlpump.html'),
  }),
  mysqlshow: build('mysqlshow', {
    url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlshow.html'),
  }),
  mysqlslap: build('mysqlslap', {
    url: new URL('https://dev.mysql.com/doc/refman/8.0/en/mysqlslap.html'),
  }),
};
