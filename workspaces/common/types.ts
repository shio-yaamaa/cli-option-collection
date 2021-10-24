export interface Fetcher {
  fetch: () => Promise<Command[]>;
}

export enum OptionStyle {
  // POSIX (short) + GNU (long) style
  // Example: -v, --version
  SHORT_AND_LONG = 'short-and-long',

  // Go flag style
  // Example: -v, -version
  SINGLE_DASH = 'single-dash',
}

export interface Command {
  name: string; // e.g. "docker build"
  optionStyle: OptionStyle;
  options: Option[];
}

export interface Option {
  key: string; // e.g. "I"
  title: string; // e.g. "-I, --ignore=PATTERN"
  description: string; // e.g. "do not list implied entries matching shell PATTERN"
}
