import { FetchFunction, Command } from '../types';
import { SourceDef, daemontools } from '../common-fetchers/daemontools';

const sourceDef: SourceDef = {
  commandName: 'svc',
  url: new URL('https://cr.yp.to/daemontools/svc.html'),
};

export const fetchSvc: FetchFunction = async (): Promise<Command[]> =>
  daemontools(sourceDef);
