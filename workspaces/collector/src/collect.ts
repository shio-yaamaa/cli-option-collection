import yargs from 'yargs';

import {
  baseCommandNames as allBaseCommandNames,
  baseCommandToFetcher,
} from './commands';
import { openbsd } from './fetchers/openbsd';
import { writeSnapshot } from './snapshot';

const argv = yargs(process.argv).argv;

// Edit this list to configure which command to fetch
// when running with --mode=some option.
const BASE_COMMAND_NAMES = ['apt-cache'];
// const BASE_COMMAND_NAMES = Object.keys(openbsd);
// const BASE_COMMAND_NAMES = allBaseCommandNames.slice(
//   allBaseCommandNames.findIndex((key) => key === 'zegrep')
// );

const main = async () => {
  switch (argv.mode) {
    case 'all':
      await fetchCommands(allBaseCommandNames);
      break;
    case 'some':
      await fetchCommands(BASE_COMMAND_NAMES);
      break;
    default:
      console.log(
        '--mode option is required. Specify --mode=all or --mode=some'
      );
  }
};

const fetchCommands = async (baseCommandNames: string[]) => {
  for (const baseCommandName of baseCommandNames) {
    console.log(`Fetching ${baseCommandName}...`);
    await fetchOptions(baseCommandName);
  }
};

const fetchOptions = async (baseCommandName: string) => {
  const fetcher = baseCommandToFetcher.get(baseCommandName);
  if (!fetcher) {
    console.log('No such base command');
    return;
  }

  const commands = await fetcher.fetch();

  writeSnapshot(baseCommandName, commands);
};

main();
