import { baseCommandToFetchFunction } from './commands';
import { writeSnapshot } from './snapshot';

const fetchAllCommands = async () => {
  fetchCommands(Array.from(baseCommandToFetchFunction.keys()));
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
  const fetchFunction = baseCommandToFetchFunction.get(baseCommandName);
  if (!fetchFunction) {
    console.log('No such base command');
    return;
  }

  const commands = await fetchFunction();

  writeSnapshot(baseCommandName, commands);
};

fetchAllCommands();
// fetchSpecifiedCommands(['apt-cache']);
