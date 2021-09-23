export type Fetcher<T> = (sourceDef: T) => Promise<Command[]>;
export type FetchFunction = () => Promise<Command[]>;

export interface Command {
  command: string;
  shortOptionDictionary: OptionDictionary;
  longOptionDictionary: OptionDictionary;
}

export type OptionDictionary = Map<string, Option>;

export interface Option {
  representation: string; // e.g. "-I, --ignore=PATTERN"
  description: string; // e.g. "do not list implied entries matching shell PATTERN"
}
