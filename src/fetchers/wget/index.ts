import { fetchWget } from './wget';
import { fetchWget2 } from './wget2';

// BUG: Options with a single dash and multiple letters (e.g. "-nd", "-nH")
//      are not recognized.

export const wget = {
  wget: {
    fetch: () => fetchWget(),
  },
  wget2: {
    fetch: () => fetchWget2(),
  },
};
