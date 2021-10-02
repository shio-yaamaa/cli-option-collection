import { FetchFunction, Command } from '../types';
import { SourceDef, apt } from '../common-fetchers/apt';

const sourceDef: SourceDef = {
  commandName: 'apt-get',
  url: new URL(
    'https://manpages.ubuntu.com/manpages/bionic/man8/apt-get.8.html'
  ),
};

export const fetchAptGet: FetchFunction = async (): Promise<Command[]> =>
  apt(sourceDef);
