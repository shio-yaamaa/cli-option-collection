import { FetchFunction, Command } from '../types';
import { SourceDef, daemontools } from '../common-fetchers/daemontools';

const sourceDef: SourceDef = {
  commandName: 'setlock',
  url: new URL('https://cr.yp.to/daemontools/setlock.html'),
};

export const fetchSetlock: FetchFunction = async (): Promise<Command[]> =>
  daemontools(sourceDef);
