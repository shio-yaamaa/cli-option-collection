import { FetchFunction, Command, Option } from '../types';
import { findDListEntries } from '../utils/forFetcher/dom';
import { fetchDocumentFromManPageURL } from '../utils/forFetcher/http';
import { uniqueOptions } from '../utils/forFetcher/options';
import { makeOptionList } from '../utils/forFetcher/optionString';
import {
  normalizeSpacesAndLinebreaks,
  normalizeSpacingAroundComma,
} from '../utils/forFetcher/string';
import {
  splitByComma,
  transformOptionStrings,
  trimOptionArguments,
} from '../utils/forFetcher/transformOptionString';

// Alternative sources:
// - https://docs.python.org/3/using/cmdline.html

const DOC_URL =
  'https://raw.githubusercontent.com/python/cpython/main/Misc/python.man';

export const fetchPython: FetchFunction = async (): Promise<Command[]> => {
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
  if (nextElement?.tagName.toLowerCase() !== 'dl') {
    return null;
  }
  return nextElement as HTMLDListElement;
};

const optionListToOptions = (list: HTMLDListElement): Option[] => {
  const dlistEntries = findDListEntries(list);
  const options: Option[] = [];
  for (const { dts, dd } of dlistEntries) {
    const title = dts[0].textContent;
    if (!title) {
      continue;
    }
    const optionStrings = transformOptionStrings(
      [title],
      [splitByComma, trimOptionArguments]
    );
    options.push(
      ...makeOptionList(
        optionStrings,
        normalizeSpacesAndLinebreaks(normalizeSpacingAroundComma(title)),
        dd.textContent?.trim() ?? ''
      )
    );
  }
  return options;
};