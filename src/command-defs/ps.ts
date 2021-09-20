import { FetchFunction, Command } from '../types';
import { SourceDef, man7 } from '../common-fetchers/man7';

const sourceDef: SourceDef = {
  url: 'https://man7.org/linux/man-pages/man1/ps.1.html',
  source: 'https://gitlab.com/procps-ng/procps',
  features: {
    containers: [
      'pre-after-h2-simple-process-selection',
      'pre-after-h2-process-selection-by-list',
      'pre-after-h2-output-format-control',
      'pre-after-h2-output-modifiers',
      'pre-after-h2-thread-display',
      'pre-after-h2-other-information',
    ],
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
      can_contain: ['b', 'i'],
    },
  },
};

export const fetchPs: FetchFunction = (): Command[] => man7(sourceDef);
