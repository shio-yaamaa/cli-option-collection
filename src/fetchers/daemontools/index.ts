import { fetch } from './fetcher';

export const daemontools = {
  setlock: () =>
    fetch({
      commandName: 'setlock',
    }),
  softlimit: () =>
    fetch({
      commandName: 'softlimit',
    }),
  svc: () =>
    fetch({
      commandName: 'svc',
    }),
};
