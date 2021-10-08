import { FetchFunction, Command } from '../../types';
import { fetch } from './fetcher';

export const fetchSetlock: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'setlock',
    url: new URL('https://cr.yp.to/daemontools/setlock.html'),
  });

export const fetchSoftlimit: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'softlimit',
    url: new URL('https://cr.yp.to/daemontools/softlimit.html'),
  });

export const fetchSvc: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'svc',
    url: new URL('https://cr.yp.to/daemontools/svc.html'),
  });
