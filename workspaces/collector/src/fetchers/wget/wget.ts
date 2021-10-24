import { Command, Option, OptionStyle } from '../../types';
import { getInnerText } from '../../utils/dom';
import { DListEntry, findDListEntries } from '../../utils/forFetcher/dom';
import { fetchDocumentFromURL } from '../../utils/forFetcher/http';
import { uniqueOptions } from '../../utils/forFetcher/options';
import {
  makeOptionList,
  mergeOptionTitles,
} from '../../utils/forFetcher/optionString';
import { stripOuterSingleQuote } from '../../utils/forFetcher/string';
import {
  splitBySpace,
  transformOptionStrings,
  trimEqualDelimitedArguments,
  trimSpaceDelimitedArguments,
} from '../../utils/forFetcher/transformOptionString';
import { mergeLists } from '../../utils/utils';

const OPTION_STYLE = OptionStyle.SHORT_AND_LONG;
const DOC_URL = 'https://www.gnu.org/software/wget/manual/wget.html';

export const fetchWget = async (): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(new URL(DOC_URL));
  const dlists = Array.from(
    document.querySelectorAll<HTMLDListElement>('body > dl')
  );
  const dlistEntries = mergeLists(
    dlists.map((dlist) => findDListEntries(dlist))
  );
  const options = mergeLists(
    dlistEntries.map((entry) => dlistEntryToOptions(entry))
  );
  return [
    {
      name: 'wget',
      optionStyle: OPTION_STYLE,
      options: uniqueOptions(options),
    },
  ];
};

const dlistEntryToOptions = ({ dts, dd }: DListEntry): Option[] => {
  const dtTexts = dts.map((dt) => stripOuterSingleQuote(getInnerText(dt)));
  const title = mergeOptionTitles(dtTexts);
  const description = getInnerText(dd);
  const optionStrings = transformOptionStrings(dtTexts, [
    splitBySpace,
    trimSpaceDelimitedArguments,
    trimEqualDelimitedArguments,
  ]);
  return makeOptionList(optionStrings, OPTION_STYLE, title, description);
};
