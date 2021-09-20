import { SourceDef, rsync } from '../common-fetchers/rsync';

const sourceDef: SourceDef = {
  url: 'https://raw.githubusercontent.com/WayneD/rsync/master/rsync.1.md',
};

export const fetchRsync = () => rsync(sourceDef);
