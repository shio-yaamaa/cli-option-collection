import { URL } from 'url';

import { Command, Fetcher, Option, OptionStyle } from '../types';
import { getInnerText } from '../utils/dom';
import { fetchDocumentFromURL } from '../utils/forFetcher/http';
import { uniqueOptions } from '../utils/forFetcher/options';
import { makeOptionList } from '../utils/forFetcher/optionString';
import { normalizeSlashDelimitedString } from '../utils/forFetcher/string';
import {
  transformOptionStrings,
  trimNonDelimitedArguments,
  trimSpaceDelimitedArguments,
} from '../utils/forFetcher/transformOptionString';
import { isElement } from '../utils/typeGuards';

// Alternative sources:
// - https://github.com/stedolan/jq/blob/master/src/main.c#L73
// - https://github.com/stedolan/jq/blob/master/docs/content/manual/manual.yml

const OPTION_STYLE = OptionStyle.SHORT_AND_LONG;
const DOC_URL = 'https://stedolan.github.io/jq/manual/';

export const jq: Fetcher = {
  fetch: () => fetch(),
};

const fetch = async (): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(new URL(DOC_URL));
  const section = findOptionsSection(document);
  if (!section) {
    return [];
  }
  const options = sectionToOptions(section);

  return [
    {
      name: 'jq',
      optionStyle: OPTION_STYLE,
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
    const li = ul.querySelector('li');
    if (!li) {
      continue;
    }
    const liText = getInnerText(li);
    const title = normalizeSlashDelimitedString(liText.trim().slice(0, -1));
    const description = findDescriptionForList(ul);
    const optionStrings = ulToOptionStrings(ul);
    options.push(
      ...makeOptionList(optionStrings, OPTION_STYLE, title, description)
    );
  }

  return options;
};

const ulToOptionStrings = (ul: Element): string[] => {
  const codes = Array.from(ul.querySelectorAll('code'));
  const texts = codes.map((code) => getInnerText(code));
  return transformOptionStrings(texts, [
    trimSpaceDelimitedArguments,
    trimNonDelimitedArguments,
  ]);
};

const findDescriptionForList = (list: Element): string => {
  const descriptionElements: Element[] = [];
  let element: Element | null = list;
  while ((element = element.nextElementSibling)) {
    if (isElement(element, 'p')) {
      descriptionElements.push(element);
    } else {
      break;
    }
  }
  return descriptionElements
    .map((element) => getInnerText(element).trim())
    .join('\n');
};
