import { Fetcher, Command } from '../types';

export interface SourceDef {
  url: string;
  source: string;
  features: {
    containers: string[];
    mixed: boolean;
    sections: {
      element: string | null;
      indent: number;
    } | null;
    options: {
      style: string | null;
      element: string | null;
      indent: number;
    };
    descriptions: {
      element: string | null;
      indent: number;
      can_be_on_same_line: boolean;
      can_contain: string[];
    };
  };
}

export const man7: Fetcher<SourceDef> = (sourceDef: SourceDef): Command[] => {
  return [];
};
