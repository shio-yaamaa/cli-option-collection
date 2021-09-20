import { Fetcher, Command } from '../types';

export interface SourceDef {
  url: string;
}

export const rsync: Fetcher<SourceDef> = (sourceDef: SourceDef): Command[] => {
  return [];
};
