import { Fetcher } from '../types';

export interface SourceDef {
  url: string;
}

export const openssh: Fetcher<SourceDef> = (sourceDef: SourceDef) => {};
