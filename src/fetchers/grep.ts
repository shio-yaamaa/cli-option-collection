import { Command, Fetcher, Option, OptionStyle } from '../types';
import { getInnerText } from '../utils/dom';
import { DListEntry, findDListEntries } from '../utils/forFetcher/dom';
import { fetchDocumentFromURL } from '../utils/forFetcher/http';
import { uniqueOptions } from '../utils/forFetcher/options';
import {
  makeOptionList,
  mergeOptionTitles,
} from '../utils/forFetcher/optionString';
import {
  transformOptionStrings,
  trimEqualDelimitedArguments,
  trimOptionalElements,
  trimSpaceDelimitedArguments,
} from '../utils/forFetcher/transformOptionString';
import { mergeLists } from '../utils/utils';

export const grep: Fetcher = {
  fetch: () => fetch(),
};

const OPTION_STYLE = OptionStyle.SHORT_AND_LONG;
const DOC_URL = 'https://www.gnu.org/software/grep/manual/grep.html';

const fetch = async (): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(new URL(DOC_URL));
  const optionSection = document.querySelector('#Command_002dline-Options');
  if (!optionSection) {
    return [];
  }
  const optionLists = Array.from(
    optionSection.querySelectorAll<HTMLDListElement>('.subsection > dl')
  );
  const dlistEntries = mergeLists(
    optionLists.map((list) => findDListEntries(list))
  );
  const options = mergeLists(
    dlistEntries.map((entry) => dlistEntryToOptions(entry))
  );
  return [
    {
      name: 'grep',
      optionStyle: OPTION_STYLE,
      options: uniqueOptions(options),
    },
  ];
};

const dlistEntryToOptions = ({ dts, dd }: DListEntry): Option[] => {
  const dtTexts = dts.map((dt) => getInnerText(dt).replace('¶', '').trim());
  const title = mergeOptionTitles(dtTexts);
  const description = getInnerText(dd);
  const optionStrings = transformOptionStrings(dtTexts, [
    trimOptionalElements,
    trimSpaceDelimitedArguments,
    trimEqualDelimitedArguments,
  ]);
  return makeOptionList(optionStrings, OPTION_STYLE, title, description);
};
