import { FetchFunction, Command } from '../types';
import { SourceDef, daemontools } from '../common-fetchers/daemontools';

const sourceDef: SourceDef = {
  commandName: 'softlimit',
  url: new URL('https://cr.yp.to/daemontools/softlimit.html'),
};

export const fetchSoftlimit: FetchFunction = async (): Promise<Command[]> =>
  daemontools(sourceDef);
