import { fetch } from './fetcher';

export const apt = {
  aptCache: () =>
    fetch({
      commandName: 'apt-cache',
      url: new URL(
        'https://manpages.ubuntu.com/manpages/bionic/man8/apt-cache.8.html'
      ),
    }),
  aptGet: () =>
    fetch({
      commandName: 'apt-get',
      url: new URL(
        'https://manpages.ubuntu.com/manpages/bionic/man8/apt-get.8.html'
      ),
    }),
};
