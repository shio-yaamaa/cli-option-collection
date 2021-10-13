import { build } from './builder';

// BUG: The line breaks and indentation in descriptions are not preserved.

export const apt = {
  aptCache: build('apt-cache', {
    url: new URL(
      'https://manpages.ubuntu.com/manpages/bionic/man8/apt-cache.8.html'
    ),
  }),
  aptFile: build('apt-file', {
    url: new URL(
      'https://manpages.ubuntu.com/manpages/bionic/man1/apt-file.1.html'
    ),
  }),
  aptGet: build('apt-get', {
    url: new URL(
      'https://manpages.ubuntu.com/manpages/bionic/man8/apt-get.8.html'
    ),
  }),
};
