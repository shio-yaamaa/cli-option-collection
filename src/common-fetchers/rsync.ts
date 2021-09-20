import { Fetcher } from '../types';

export interface SourceDef {
  url: string;
}

export const rsync: Fetcher<SourceDef> = (sourceDef: SourceDef) => {};
