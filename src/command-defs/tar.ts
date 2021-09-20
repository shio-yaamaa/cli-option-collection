import { FetchFunction, Command } from '../types';
import { SourceDef, man7 } from '../common-fetchers/man7';

// NOTE: --ignore-command-error has incorrect indentation
// NOTE: -? option
// NOTE: https://www.gnu.org/software/tar/manual/html_node/All-Options.html can be used as well

const sourceDef: SourceDef = {
  url: 'https://man7.org/linux/man-pages/man1/tar.1.html',
  source: 'http://savannah.gnu.org/projects/tar/',
  features: {
    containers: ['pre-after-h2-description', 'pre-after-h2-options'],
    mixed: true,
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

export const fetchTar: FetchFunction = (): Command[] => man7(sourceDef);
