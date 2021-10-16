import { Command, Fetcher, Option, OptionStyle } from '../types';
import { getInnerText } from '../utils/dom';
import { DListEntry, findDListEntries } from '../utils/forFetcher/dom';
import { fetchDocumentFromManPageURL } from '../utils/forFetcher/http';
import { uniqueOptions } from '../utils/forFetcher/options';
import {
  makeOptionList,
  mergeOptionTitles,
} from '../utils/forFetcher/optionString';
import {
  splitByComma,
  transformOptionStrings,
  trimEqualDelimitedArguments,
  trimOptionalElements,
  trimSpaceDelimitedArguments,
} from '../utils/forFetcher/transformOptionString';
import { mergeLists } from '../utils/utils';

// Alternative sources:
// - https://www.freebsd.org/cgi/man.cgi?query=iconv&manpath=FreeBSD+13.0-RELEASE+and+Ports

export const iconv: Fetcher = {
  fetch: () => fetch(),
};

const OPTION_STYLE = OptionStyle.SHORT_AND_LONG;
const DOC_URL =
  'https://git.savannah.gnu.org/gitweb/?p=libiconv.git;a=blob_plain;f=man/iconv.1;hb=HEAD';

const fetch = async (): Promise<Command[]> => {
  const document = await fetchDocumentFromManPageURL(new URL(DOC_URL));
  const optionsHeading = document.querySelector('#DESCRIPTION');
  const optionSection = optionsHeading?.closest('section');
  if (!optionSection) {
    return [];
  }
  const dlists = Array.from(
    optionSection.querySelectorAll<HTMLDListElement>('section > dl')
  );
  const dlistEntries = mergeLists(
    dlists.map((dlist) => findDListEntries(dlist))
  );
  const options = mergeLists(
    dlistEntries.map((entry) => dlistEntryToOptions(entry))
  );
  return [
    {
      name: 'iconv',
      optionStyle: OPTION_STYLE,
      options: uniqueOptions(options),
    },
  ];
};

const dlistEntryToOptions = ({ dts, dd }: DListEntry): Option[] => {
  const dtTexts = dts.map((dt) => getInnerText(dt));
  const title = mergeOptionTitles(dtTexts);
  const description = getInnerText(dd);
  const optionStrings = transformOptionStrings(dtTexts, [
    splitByComma,
    trimOptionalElements,
    trimSpaceDelimitedArguments,
    trimEqualDelimitedArguments,
  ]);
  return makeOptionList(optionStrings, OPTION_STYLE, title, description);
};
