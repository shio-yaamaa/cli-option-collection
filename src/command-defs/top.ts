import { FetchFunction, Command } from '../types';

// https://man7.org/linux/man-pages/man1/top.1.html
// The format is different from both coreutils and ps,
// so maybe implement a fetcher just for top command

export const fetchTop: FetchFunction = (): Command[] => {
  return [];
};
