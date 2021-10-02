import { FetchFunction, Command } from '../types';
import { SourceDef, apt } from '../common-fetchers/apt';

const sourceDef: SourceDef = {
  commandName: 'apt-cache',
  url: new URL(
    'https://manpages.ubuntu.com/manpages/bionic/man8/apt-cache.8.html'
  ),
};

export const fetchAptCache: FetchFunction = async (): Promise<Command[]> =>
  apt(sourceDef);
