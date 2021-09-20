import { Fetcher, Command } from '../types';

export interface SourceDef {
  url: string;
}

export const rsync: Fetcher<SourceDef> = async (
  sourceDef: SourceDef
): Promise<Command[]> => {
  return [];
};
