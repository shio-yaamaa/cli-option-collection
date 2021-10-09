import { Command, FetchFunction } from '../types';
import { mergeBy, uniqueBy } from './utils';

export const joinFetchFunctions = (
  ...funcs: FetchFunction[]
): FetchFunction => {
  return async (): Promise<Command[]> => {
    const commands: Command[] = [];
    for (const func of funcs) {
      commands.push(...(await func()));
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
  };
};
