import { Command, Option, Fetcher, OptionStyle } from '../types';
import { fetchDocumentFromURL } from '../utils/forFetcher/http';
import { parseTextList } from '../utils/forFetcher/textListParser';
import { uniqueOptions } from '../utils/forFetcher/options';
import {
  makeOptionList,
  mergeOptionTitles,
} from '../utils/forFetcher/optionString';
import {
  splitByComma,
  transformOptionStrings,
  trimOptionalElements,
  trimSpaceDelimitedArguments,
  trimEqualDelimitedArguments,
} from '../utils/forFetcher/transformOptionString';
import { mergeLists } from '../utils/utils';
import { isElement } from '../utils/typeGuards';
import { getInnerText } from '../utils/dom';

// Alternative sources:
// - https://raw.githubusercontent.com/WayneD/rsync/master/rsync.1.md

// NOTE: There are multiple interpretations of -h and -M.
//       Only the first one is listed in the result.

const OPTION_STYLE = OptionStyle.SHORT_AND_LONG;
const DOC_URL = 'https://download.samba.org/pub/rsync/rsync.1';

export const rsync: Fetcher = {
  fetch: () => fetch(),
};

const fetch = async (): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(new URL(DOC_URL));
  const optionLists = findOptionLists(document);
  const options = mergeLists(optionLists.map((list) => listToOptions(list)));

  return [
    {
      name: 'rsync',
      optionStyle: OPTION_STYLE,
      options: uniqueOptions(options),
    },
  ];
};

const findOptionLists = (document: Document): Element[] => {
  const h1s = Array.from(document.querySelectorAll('h1'));
  const optionSummaryHeading = h1s.find(
    (element) => getInnerText(element) === 'OPTION SUMMARY'
  );
  if (!optionSummaryHeading) {
    return [];
  }
  const lists: Element[] = [];
  let currentElement: Element | null = optionSummaryHeading;
  while ((currentElement = currentElement.nextElementSibling)) {
    if (isElement(currentElement, 'h1')) {
      break;
    }
    if (isElement(currentElement, 'pre')) {
      lists.push(currentElement);
    }
  }
  return lists;
};

const listToOptions = (list: Element): Option[] => {
  const listItems = parseTextList(getInnerText(list).split('\n'));
  const options: Option[] = [];
  for (const { titles, descriptionLines } of listItems) {
    const optionStrings = transformOptionStrings(titles, [
      splitByComma,
      trimOptionalElements,
      trimSpaceDelimitedArguments,
      trimEqualDelimitedArguments,
    ]);
    options.push(
      ...makeOptionList(
        optionStrings,
        OPTION_STYLE,
        mergeOptionTitles(titles),
        descriptionLines.join(' ')
      )
    );
  }
  return options;
};
