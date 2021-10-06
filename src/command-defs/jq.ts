import { URL } from 'url';

import { FetchFunction, Command, Option } from '../types';
import { fetchDocumentFromURL } from '../utils/forFetcher/dom';
import { uniqueOptions } from '../utils/forFetcher/options';
import { makeOptionList } from '../utils/forFetcher/optionString';
import {
  normalizeSpacesAndLinebreaks,
  normalizeSpacingAroundSlash,
} from '../utils/forFetcher/string';
import {
  transformOptionStrings,
  trimNonDelimitedOptionValues,
  trimOptionArguments,
} from '../utils/forFetcher/transformOptionString';

// Alternative sources:
// - https://github.com/stedolan/jq/blob/master/src/main.c#L73
// - https://github.com/stedolan/jq/blob/master/docs/content/manual/manual.yml

const DOC_URL = 'https://stedolan.github.io/jq/manual/';

export const fetchJq: FetchFunction = async (): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(new URL(DOC_URL));
  const section = findOptionsSection(document);
  if (!section) {
    return [];
  }
  const options = sectionToOptions(section);

  return [
    {
      name: 'jq',
      options: uniqueOptions(options),
    },
  ];
};

const findOptionsSection = (document: Document): Element | null =>
  document.querySelector('#Invokingjq');

const sectionToOptions = (section: Element): Option[] => {
  const options: Option[] = [];

  const uls = Array.from(section.querySelectorAll('ul'));
  for (const ul of uls) {
    const ulText = ul.textContent;
    if (!ulText) {
      continue;
    }
    const title = normalizeSpacingAroundSlash(ulText.trim().slice(0, -1));
    const description = findDescriptionForList(ul);
    const optionStrings = ulToOptionStrings(ul);
    options.push(
      ...makeOptionList(optionStrings).map(({ type, key }) => ({
        type,
        key,
        title,
        description,
      }))
    );
  }

  return options;
};

const ulToOptionStrings = (ul: Element): string[] => {
  const codes = Array.from(ul.querySelectorAll('code'));
  const texts = codes
    .map((code) => code.textContent)
    .filter((text): text is string => typeof text === 'string');
  return transformOptionStrings(texts, [
    trimOptionArguments,
    trimNonDelimitedOptionValues,
  ]);
};

const findDescriptionForList = (list: Element): string => {
  const descriptionElements: Element[] = [];
  let element: Element | null = list;
  while ((element = element.nextElementSibling)) {
    if (element.tagName.toLowerCase() === 'p') {
      descriptionElements.push(element);
    } else {
      break;
    }
  }
  return descriptionElements
    .map((element) => element.textContent)
    .filter((text): text is string => typeof text === 'string')
    .map((text) => normalizeSpacesAndLinebreaks(text.trim()))
    .join('\n');
};
