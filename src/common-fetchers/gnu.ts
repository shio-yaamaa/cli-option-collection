import { Fetcher, Command } from '../types';

export interface SourceDef {
  url: string;
}

export const gnu: Fetcher<SourceDef> = (sourceDef: SourceDef): Command[] => {
  return [];
};
