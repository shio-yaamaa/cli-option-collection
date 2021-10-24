import { fetchWget } from './wget';
import { fetchWget2 } from './wget2';

// Alternative sources:
// - wget
//   - https://github.com/jay/wget/blob/master/vms/WGET.HLP
//     - More succinct descriptions, but harder to parse.
// - wget2
//   - https://github.com/rockdaboot/wget2/blob/master/src/options.c#L1267

// BUG: Options with a single dash and multiple letters (e.g. "-nd", "-nH")
//      are not recognized.
// NOTE: "Not implemented" message is included in option titles.

export const wget = {
  wget: {
    fetch: () => fetchWget(),
  },
  wget2: {
    fetch: () => fetchWget2(),
  },
};
