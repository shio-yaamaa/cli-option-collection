import { Fetcher, Command } from '../types';

export interface SourceDef {
  url: string;
}

export const mysql: Fetcher<SourceDef> = (sourceDef: SourceDef): Command[] => {
  return [];
};
