import { FetchFunction, Command } from '../../types';
import { fetch } from './fetcher';

export const fetchAptCache: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'apt-cache',
    url: new URL(
      'https://manpages.ubuntu.com/manpages/bionic/man8/apt-cache.8.html'
    ),
  });

export const fetchAptGet: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'apt-get',
    url: new URL(
      'https://manpages.ubuntu.com/manpages/bionic/man8/apt-get.8.html'
    ),
  });
