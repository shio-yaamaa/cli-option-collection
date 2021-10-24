import fs from 'fs';

import { Command } from '../types';
import { resolveRelativePathFromRoot } from './path';

export const getBaseCommandNamesFromSnapshots = (): string[] => {
  const filenames = fs.readdirSync(resolveRelativePathFromRoot('snapshots'));
  return filenames.map((filename) => filename.replace(/\.json$/, ''));
};

export const getCommandsFromSnapshot = (baseCommandName: string): Command[] => {
  const json = JSON.parse(
    fs
      .readFileSync(
        resolveRelativePathFromRoot(`snapshots/${baseCommandName}.json`)
      )
      .toString()
  );
  return json as Command[];
};
