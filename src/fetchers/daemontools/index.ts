import { build } from './builder';

export const daemontools = {
  setlock: build('setlock'),
  softlimit: build('softlimit'),
  svc: build('svc'),
};
