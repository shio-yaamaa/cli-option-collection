import { URL } from 'url';

import { FetchFunction, Command, Option } from '../types';
import {
  DListEntry,
  findDListEntries,
  previousClosest,
} from '../utils/forFetcher/dom';
import { fetchDocumentFromURL } from '../utils/forFetcher/http';
import { uniqueOptions } from '../utils/forFetcher/options';
import {
  mergeOptionTitles,
  makeOptionList,
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

  const dlistEntries = findDListEntries(optionDl, true);
  const options = ([] as Option[]).concat(
    ...dlistEntries.map((entry) => dlistEntryToOptions(entry))
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

const dlistEntryToOptions = ({ dts, dd }: DListEntry): Option[] => {
  const dtTexts = dts
    .map((dt) =>
      dt.textContent?.startsWith('#') ? dt.textContent.slice(1) : dt
    )
    .filter((text): text is string => typeof text === 'string');
  const title = mergeOptionTitles(dtTexts);
  const description = dd.textContent?.trim() ?? '';

  const optionStrings = transformOptionStrings(dtTexts, [
    trimOptionalElements,
    trimOptionValues,
    trimNonDelimitedOptionValues,
    trimOptionArguments,
    trimAfterColons,
  ]);

  return makeOptionList(optionStrings, title, description);
};
