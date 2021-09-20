import { FetchFunction, Command } from '../types';
import { SourceDef, man7 } from '../common-fetchers/man7';

const sourceDef: SourceDef = {
  url: 'https://man7.org/linux/man-pages/man1/grep.1.html',
  source: 'https://www.gnu.org/software/grep/', // Can be generalized as GNU. No difference from --help regarding succinctness
  features: {
    containers: ['pre-after-h2-options'],
    mixed: false,
    sections: {
      element: 'b',
      indent: 3,
    },
    options: {
      style: null,
      element: 'b',
      indent: 7,
    },
    descriptions: {
      element: null,
      indent: 14,
      can_be_on_same_line: true,
      can_contain: ['b', 'i'],
    },
  },
};

export const fetchGrep: FetchFunction = async (): Promise<Command[]> =>
  man7(sourceDef);
