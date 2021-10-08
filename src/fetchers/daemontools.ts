import { FetchFunction, Command } from '../types';
import { daemontools } from '../common-fetchers/daemontools';

export const fetchSetlock: FetchFunction = async (): Promise<Command[]> =>
  daemontools({
    commandName: 'setlock',
    url: new URL('https://cr.yp.to/daemontools/setlock.html'),
  });

export const fetchSoftlimit: FetchFunction = async (): Promise<Command[]> =>
  daemontools({
    commandName: 'softlimit',
    url: new URL('https://cr.yp.to/daemontools/softlimit.html'),
  });

export const fetchSvc: FetchFunction = async (): Promise<Command[]> =>
  daemontools({
    commandName: 'svc',
    url: new URL('https://cr.yp.to/daemontools/svc.html'),
  });
