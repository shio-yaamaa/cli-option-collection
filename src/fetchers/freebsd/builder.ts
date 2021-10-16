import tabToSpace from 'tab-to-space';

import { Command, Fetcher, Option, OptionStyle } from '../../types';
import { getInnerText } from '../../utils/dom';
import { fetchDocumentFromURL } from '../../utils/forFetcher/http';
import { uniqueOptions } from '../../utils/forFetcher/options';
import {
  makeOptionList,
  mergeOptionTitles,
} from '../../utils/forFetcher/optionString';
import { countIndentWidth, extractLines } from '../../utils/forFetcher/string';
import { ListItem, parseTextList } from '../../utils/forFetcher/textListParser';
import {
  transformOptionStrings,
  trimEqualDelimitedArguments,
  trimOptionalElements,
  trimSpaceDelimitedArguments,
} from '../../utils/forFetcher/transformOptionString';
import { mergeLists } from '../../utils/utils';

interface Config {
  url: URL;
}

export const build = (commandName: string, config: Config): Fetcher => ({
  fetch: () => fetch(commandName, config.url),
});

const OPTION_STYLE = OptionStyle.SHORT_AND_LONG;

const fetch = async (commandName: string, url: URL): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(url);
  const pre = document.querySelector('#content')?.querySelector('pre');
  if (!pre) {
    return [];
  }
  const options = textToOptions(getInnerText(pre));
  return [
    {
      name: commandName,
      optionStyle: OPTION_STYLE,
      options: uniqueOptions(options),
    },
  ];
};

const textToOptions = (text: string): Option[] => {
  const lines = text.split('\n').map((line) => tabToSpace(line, 8));

  const optionSectionLines = extractLines(
    lines,
    (line) => line === 'OPTIONS',
    (line) => countIndentWidth(line) === 0 && line.trim().length > 0
  ).slice(1, -1);
  const listItems = parseTextList(optionSectionLines);
  return mergeLists(listItems.map((item) => listItemToOptions(item)));
};

const listItemToOptions = ({
  titles,
  descriptionLines,
}: ListItem): Option[] => {
  const title = mergeOptionTitles(titles);
  const description = descriptionLines.join(' ');
  const optionStrings = transformOptionStrings(titles, [
    trimOptionalElements,
    trimSpaceDelimitedArguments,
    trimEqualDelimitedArguments,
  ]);
  return makeOptionList(optionStrings, OPTION_STYLE, title, description);
};
