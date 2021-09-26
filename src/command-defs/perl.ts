import { URL } from 'url';

import { FetchFunction, Command, OptionDictionary, Option } from '../types';
import {
  DtDdPair,
  fetchDocumentFromURL,
  findDtDdPairs,
  previousClosest,
} from '../utils/forFetcher/dom';
import {
  mergeRepresentations,
  partitionShortAndLongOptionLabels,
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

  const shortOptionDictionary: OptionDictionary = new Map();
  const longOptionDictionary: OptionDictionary = new Map();

  const dtDdPairs = findDtDdPairs(optionDl, true);
  for (const dtDdPair of dtDdPairs) {
    const maybeOption = dtDdPairToOption(dtDdPair);
    if (!maybeOption) {
      continue;
    }
    const { shortOptionLabels, longOptionLabels, option } = maybeOption;
    for (const shortOptionLabel of shortOptionLabels) {
      shortOptionDictionary.set(shortOptionLabel, option);
    }
    for (const longOptionLabel of longOptionLabels) {
      longOptionDictionary.set(longOptionLabel, option);
    }
  }

  return [
    {
      command: 'perl',
      shortOptionDictionary,
      longOptionDictionary,
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

const dtDdPairToOption = ({
  dts,
  dd,
}: DtDdPair): {
  shortOptionLabels: string[];
  longOptionLabels: string[];
  option: Option;
} | null => {
  const representations = dts.map((dt) =>
    dt.startsWith('#') ? dt.slice(1) : dt
  );
  const representation = mergeRepresentations(representations);
  const option = {
    representation,
    description: dd,
  };

  const labels = transformOptionStrings(representations, [
    trimOptionalElements,
    trimOptionValues,
    trimNonDelimitedOptionValues,
    trimOptionArguments,
    trimAfterColons,
  ]);

  const { shortOptionLabels, longOptionLabels } =
    partitionShortAndLongOptionLabels(labels);

  if (shortOptionLabels.length === 0 && longOptionLabels.length === 0) {
    return null;
  }

  return {
    shortOptionLabels,
    longOptionLabels,
    option,
  };
};
