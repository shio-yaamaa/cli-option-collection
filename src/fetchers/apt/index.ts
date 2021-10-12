import { build } from './builder';

export const apt = {
  aptCache: build('apt-cache', {
    url: new URL(
      'https://manpages.ubuntu.com/manpages/bionic/man8/apt-cache.8.html'
    ),
  }),
  aptGet: build('apt-get', {
    url: new URL(
      'https://manpages.ubuntu.com/manpages/bionic/man8/apt-get.8.html'
    ),
  }),
};
