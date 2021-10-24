import path from 'path';
import fs from 'fs';

import { Command } from '../../common/types';

const SNAPSHOTS_PATH = path.resolve(__dirname, `../../../../../snapshots`);

export const getBaseCommandNamesFromSnapshots = (): string[] => {
  const filenames = fs.readdirSync(SNAPSHOTS_PATH);
  return filenames.map((filename) => filename.replace(/\.json$/, ''));
};

export const getCommandsFromSnapshot = (baseCommandName: string): Command[] => {
  const json = JSON.parse(
    fs
      .readFileSync(path.resolve(SNAPSHOTS_PATH, `${baseCommandName}.json`))
      .toString()
  );
  return json as Command[];
};
