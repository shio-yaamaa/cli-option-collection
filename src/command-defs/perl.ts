import { URL } from 'url';

import { FetchFunction, Command, Option } from '../types';
import {
  DtDdPair,
  fetchDocumentFromURL,
  findDtDdPairs,
  previousClosest,
} from '../utils/forFetcher/dom';
import { uniqueOptions } from '../utils/forFetcher/options';
import {
  mergeOptionTitles,
  distinguishOptionKeyType,
} from '../utils/forFetcher/optionString';
import {
  transformOptionStrings,
  trimAfterColons,
  trimOptionalElements,
  trimOptionArguments,
  trimOptionValues,
  trimNonDelimitedOptionValues,
} from '../utils/forFetcher/transformOptionString';

// Alternative sources:
// - https://github.com/Perl/perl5/blob/blead/pod/perlrun.pod

// NOTE: This command has options that include colons (e.g. "-d:MOD[=bar,baz]").
//       This fetcher cannot distinguish them from ordinary short options (e.g. "-d").

const DOC_URL = 'https://perldoc.perl.org/perlrun';

export const fetchPerl: FetchFunction = async (): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(new URL(DOC_URL));
  const optionDl = findOptionDl(document);
  if (!optionDl) {
    return [];
  }

  const dtDdPairs = findDtDdPairs(optionDl, true);
  const options = ([] as Option[]).concat(
    ...dtDdPairs.map((dtDdPair) => dtDdPairToOptions(dtDdPair))
  );

  return [
    {
      name: 'perl',
      options: uniqueOptions(options),
    },
  ];
};

const findOptionDl = (document: Document): HTMLDListElement | null => {
  const dls = Array.from(document.querySelectorAll('dl'));
  return (
    dls.find((dl) =>
      previousClosest(dl, (element) => element.id === 'Command-Switches')
    ) ?? null
  );
};

const dtDdPairToOptions = ({ dts, dd }: DtDdPair): Option[] => {
  const dtTexts = dts.map((dt) => (dt.startsWith('#') ? dt.slice(1) : dt));
  const title = mergeOptionTitles(dtTexts);
  const description = dd;

  const optionStrings = transformOptionStrings(dtTexts, [
    trimOptionalElements,
    trimOptionValues,
    trimNonDelimitedOptionValues,
    trimOptionArguments,
    trimAfterColons,
  ]);

  return distinguishOptionKeyType(optionStrings).map(({ type, key }) => ({
    type,
    key,
    title,
    description,
  }));
};
