import { URL } from 'url';

import { FetchFunction, Command, Option } from '../types';
import { getInnerText } from '../utils/dom';
import { DListEntry, findDListEntries } from '../utils/forFetcher/dom';
import { fetchDocumentFromManPageURL } from '../utils/forFetcher/http';
import { uniqueOptions } from '../utils/forFetcher/options';
import {
  makeOptionList,
  mergeOptionTitles,
} from '../utils/forFetcher/optionString';
import {
  splitBySpace,
  transformOptionStrings,
  trimOptionalElements,
  trimSpaceDelimitedArguments,
  trimEqualDelimitedArguments,
} from '../utils/forFetcher/transformOptionString';
import { mergeLists } from '../utils/utils';

const DOC_URL =
  'https://raw.githubusercontent.com/htop-dev/htop/main/htop.1.in';

export const htop: FetchFunction = async (): Promise<Command[]> => {
  const document = await fetchDocumentFromManPageURL(new URL(DOC_URL));
  const section = findOptionsSection(document);
  if (!section) {
    return [];
  }
  const options = sectionToOptions(section);

  return [
    {
      name: 'htop',
      options: uniqueOptions(options),
    },
  ];
};

const findOptionsSection = (document: Document): Element | null => {
  const optionsHeading = document.querySelector('#COMMAND-LINE_OPTIONS');
  return optionsHeading?.closest('section') ?? null;
};

const sectionToOptions = (section: Element): Option[] => {
  const dlists = Array.from(
    section.querySelectorAll<HTMLDListElement>('section > dl')
  );
  const dlistEntries = mergeLists(
    dlists.map((dlist) => findDListEntries(dlist))
  );
  const options = mergeLists(
    dlistEntries.map((entry) => dlistEntryToOptions(entry))
  );
  return options;
};

const dlistEntryToOptions = ({ dts, dd }: DListEntry): Option[] => {
  const dtTexts = dts.map((dt) => getInnerText(dt));
  const title = mergeOptionTitles(dtTexts);
  const description = getInnerText(dd).trim();
  const optionStrings = transformOptionStrings(dtTexts, [
    splitBySpace,
    trimEqualDelimitedArguments,
    trimOptionalElements,
    trimSpaceDelimitedArguments,
  ]);
  return makeOptionList(optionStrings, title, description);
};
