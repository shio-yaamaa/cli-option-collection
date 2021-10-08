import { FetchFunction, Command } from '../types';
import { apt } from '../common-fetchers/apt';

export const fetchAptCache: FetchFunction = async (): Promise<Command[]> =>
  apt({
    commandName: 'apt-cache',
    url: new URL(
      'https://manpages.ubuntu.com/manpages/bionic/man8/apt-cache.8.html'
    ),
  });

export const fetchAptGet: FetchFunction = async (): Promise<Command[]> =>
  apt({
    commandName: 'apt-get',
    url: new URL(
      'https://manpages.ubuntu.com/manpages/bionic/man8/apt-get.8.html'
    ),
  });
