export type Fetcher<T> = (sourceDef: T) => Promise<Command[]>;
export type FetchFunction = () => Promise<Command[]>;

export enum OptionType {
  SHORT = 'short',
  LONG = 'long',
}

export interface Command {
  name: string; // e.g. "docker build"
  options: Option[];
}

export interface Option {
  type: OptionType;
  key: string; // e.g. "I"
  title: string; // e.g. "-I, --ignore=PATTERN"
  description: string; // e.g. "do not list implied entries matching shell PATTERN"
}
