import { Command, Fetcher } from '../types';
import { mergeBy, uniqueBy } from './utils';

export const joinFetchers = (...fetchers: Fetcher[]): Fetcher => {
  return {
    fetch: async (): Promise<Command[]> => {
      const commands: Command[] = [];
      for (const fetcher of fetchers) {
        commands.push(...(await fetcher.fetch()));
      }
      return mergeBy(
        commands,
        (command) => command.name,
        (a: Command, b: Command) => ({
          name: a.name,
          options: uniqueBy([...a.options, ...b.options], (option) => [
            option.type,
            option.key,
          ]),
        })
      );
    },
  };
};
