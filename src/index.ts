import { baseCommandToFetchFunction } from './commands';
import { writeSnapshot } from './snapshot';

const main = async () => {
  const baseCommandNames = ['perl'];
  for (const baseCommandName of baseCommandNames) {
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

main();
