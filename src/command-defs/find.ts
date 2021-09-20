import { SourceDef, man7 } from '../common-fetchers/man7';

const sourceDef: SourceDef = {
  url: 'https://man7.org/linux/man-pages/man1/find.1.html',
  source: 'http://www.gnu.org/software/findutils/', // The format is too complicated
  features: {
    containers: ['pre-after-h2-options'],
    mixed: true,
    sections: null,
    options: {
      style: null,
      element: null,
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

export const fetchFind = () => man7(sourceDef);
