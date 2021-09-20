import { FetchFunction, Command } from '../types';
import { SourceDef, man7 } from '../common-fetchers/man7';

const sourceDef: SourceDef = {
  url: 'https://man7.org/linux/man-pages/man1/mv.1.html',
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
      can_contain: ['b'],
    },
  },
};

export const fetchMv: FetchFunction = (): Command[] => man7(sourceDef);
