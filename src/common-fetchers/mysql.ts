import { Fetcher } from '../types';

export interface SourceDef {
  url: string;
}

export const mysql: Fetcher<SourceDef> = (sourceDef: SourceDef) => {};
