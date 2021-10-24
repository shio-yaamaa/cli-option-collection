// A snapshot file has a name of a command group and contains all the commands that belong to the group.

import fs from 'fs-extra';

import { Command } from './types';

const buildFilename = (baseCommandName: string): string =>
  `snapshots/${baseCommandName}.json`;

export const readSnapshot = (baseCommandName: string): Command[] => {
  const filename = buildFilename(baseCommandName);
  return fs.readJSONSync(filename);
};

export const writeSnapshot = (baseCommandName: string, commands: Command[]) => {
  const filename = buildFilename(baseCommandName);
  fs.outputJSONSync(filename, commands, { spaces: 2 });
  console.log(`Saved ${filename}`);
};
