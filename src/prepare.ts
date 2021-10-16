import { rmSync } from 'fs-extra';

import { DOWNLOADS_DIRECTORY } from './utils/forFetcher/http';

import { prepareCurl } from './fetchers/curl/prepare';
import { prepareGNUCoreutils } from './fetchers/gnu-coreutils/prepare';

export const prepare = async () => {
  rmSync(DOWNLOADS_DIRECTORY, { recursive: true, force: true });
  await prepareGNUCoreutils();
  await prepareCurl();
};
