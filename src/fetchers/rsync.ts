import { FetchFunction, Command, Option } from '../types';
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

// Alternative sources:
// - https://raw.githubusercontent.com/WayneD/rsync/master/rsync.1.md

// NOTE: There are multiple interpretations of -h and -M.
//       Only the first one is listed in the result.

const DOC_URL = 'https://download.samba.org/pub/rsync/rsync.1';

export const fetchRsync: FetchFunction = async (): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(new URL(DOC_URL));
  const optionLists = findOptionLists(document);
  const options = mergeLists(optionLists.map((list) => listToOptions(list)));

  return [
    {
      name: 'rsync',
      options: uniqueOptions(options),
    },
  ];
};

const findOptionLists = (document: Document): Element[] => {
  const h1s = Array.from(document.querySelectorAll('h1'));
  const optionSummaryHeading = h1s.find(
    (element) => element.textContent === 'OPTION SUMMARY'
  );
  if (!optionSummaryHeading) {
    return [];
  }
  const lists: Element[] = [];
  let currentElement: Element | null = optionSummaryHeading;
  while ((currentElement = currentElement.nextElementSibling)) {
    if (currentElement?.tagName.toLowerCase() === 'h1') {
      break;
    }
    if (currentElement.tagName.toLowerCase() === 'pre') {
      lists.push(currentElement);
    }
  }
  return lists;
};

const listToOptions = (list: Element): Option[] => {
  const text = list.textContent;
  if (!text) {
    return [];
  }
  const listItems = parseTextList(text.split('\n'));
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
        mergeOptionTitles(titles),
        descriptionLines.join(' ')
      )
    );
  }
  return options;
};
