import { SourceDef, man7 } from '../common-fetchers/man7';

const sourceDef: SourceDef = {
  url: 'https://man7.org/linux/man-pages/man1/diff.1.html',
  source: 'http://savannah.gnu.org/projects/diffutils/', // Needs to be downloaded
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

export const fetchDiff = () => man7(sourceDef);