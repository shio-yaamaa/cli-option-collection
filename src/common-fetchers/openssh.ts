import { Fetcher, Command } from '../types';

export interface SourceDef {
  url: string;
}

export const openssh: Fetcher<SourceDef> = async (
  sourceDef: SourceDef
): Promise<Command[]> => {
  return [];
};
