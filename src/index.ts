import {
  baseCommandNames as allBaseCommandNames,
  baseCommandToFetcher,
} from './commands';
import { openbsd } from './fetchers/openbsd';
// import { prepare } from './prepare';
import { writeSnapshot } from './snapshot';

const fetchAllCommands = async () => {
  fetchCommands(allBaseCommandNames);
};

const fetchSpecifiedCommands = async (baseCommandNames: string[]) => {
  fetchCommands(baseCommandNames);
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

fetchAllCommands();
// fetchSpecifiedCommands(['apt-cache']);
// fetchSpecifiedCommands(Object.keys(openbsd));

// prepare();
