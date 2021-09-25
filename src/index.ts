import { baseCommandToFetchFunction } from './commands';
import { writeSnapshot } from './snapshot';

const main = async () => {
  const baseCommandName = 'mysqlslap';

  const fetchFunction = baseCommandToFetchFunction.get(baseCommandName);
  if (!fetchFunction) {
    console.log('No such base command');
    return;
  }

  const commands = await fetchFunction();

  writeSnapshot(baseCommandName, commands);
};

main();
