import { Command, Option, Fetcher } from '../types';
import { getInnerText } from '../utils/dom';
import { findDListEntries } from '../utils/forFetcher/dom';
import { fetchDocumentFromManPageURL } from '../utils/forFetcher/http';
import { uniqueOptions } from '../utils/forFetcher/options';
import { makeOptionList } from '../utils/forFetcher/optionString';
import { normalizeCommaDelimitedString } from '../utils/forFetcher/string';
import {
  splitByComma,
  transformOptionStrings,
  trimSpaceDelimitedArguments,
} from '../utils/forFetcher/transformOptionString';
import { isElement } from '../utils/typeGuards';

// Alternative sources:
// - https://docs.python.org/3/using/cmdline.html

const DOC_URL =
  'https://raw.githubusercontent.com/python/cpython/main/Misc/python.man';

export const python: Fetcher = {
  fetch: () => fetch(),
};

const fetch = async (): Promise<Command[]> => {
  const url = new URL(DOC_URL);
  const document = await fetchDocumentFromManPageURL(url);
  const optionList = findOptionList(document);
  if (!optionList) {
    return [];
  }
  const options = optionListToOptions(optionList);
  return [
    {
      name: 'python',
      options: uniqueOptions(options),
    },
  ];
};

const findOptionList = (document: Document): HTMLDListElement | null => {
  const optionsHeading = document.querySelector('#COMMAND_LINE_OPTIONS');
  if (!optionsHeading) {
    return null;
  }
  const nextElement = optionsHeading.nextElementSibling;
  return nextElement && isElement(nextElement, 'dl') ? nextElement : null;
};

const optionListToOptions = (list: HTMLDListElement): Option[] => {
  const dlistEntries = findDListEntries(list);
  const options: Option[] = [];
  for (const { dts, dd } of dlistEntries) {
    const title = getInnerText(dts[0]);
    const optionStrings = transformOptionStrings(
      [title],
      [splitByComma, trimSpaceDelimitedArguments]
    );
    options.push(
      ...makeOptionList(
        optionStrings,
        normalizeCommaDelimitedString(title),
        getInnerText(dd).trim()
      )
    );
  }
  return options;
};
