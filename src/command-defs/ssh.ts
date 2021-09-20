import { FetchFunction, Command } from '../types';
import { SourceDef, openssh } from '../common-fetchers/openssh';

const sourceDef: SourceDef = {
  url: 'https://man.openbsd.org/ssh',
};

export const fetchSsh: FetchFunction = (): Command[] => openssh(sourceDef);
