import { FetchFunction, Command } from '../types';
import { SourceDef, man7 } from '../common-fetchers/man7';

// Alternative sources:
// - https://github.com/coreutils/coreutils/blob/master/doc/coreutils.texi
// Descriptions for --help seem to be hardcoded like this: https://github.com/coreutils/coreutils/blob/23953cecf9c1fce96c9b94bce74aa5f8e3494424/src/echo.c#L51-L58

const sourceDef: SourceDef = {
  url: 'https://man7.org/linux/man-pages/man1/echo.1.html',
  source: 'http://www.gnu.org/software/coreutils/',
  features: {
    containers: ['pre-after-h2-description'],
    mixed: true,
    sections: null,
    options: {
      style: null,
      element: 'b',
      indent: 7,
    },
    descriptions: {
      element: null,
      indent: 14,
      can_be_on_same_line: true,
      can_contain: [],
    },
  },
};

export const fetchEcho: FetchFunction = async (): Promise<Command[]> =>
  man7(sourceDef);
