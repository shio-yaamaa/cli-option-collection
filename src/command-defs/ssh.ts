import { SourceDef, openssh } from '../common-fetchers/openssh';

const sourceDef: SourceDef = {
  url: 'https://man.openbsd.org/ssh',
};

export const fetchSsh = () => openssh(sourceDef);
