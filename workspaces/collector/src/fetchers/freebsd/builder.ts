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
  splitByComma,
  transformOptionStrings,
  trimEqualDelimitedArguments,
  trimOptionalElements,
  trimSpaceDelimitedArguments,
} from '../../utils/forFetcher/transformOptionString';
import { mergeLists } from '../../utils/utils';

interface Config {
  url: URL;
  optionStyle: OptionStyle;
  optionsHeading: string;
}

export const build = (commandName: string, config: Config): Fetcher => ({
  fetch: () =>
    fetch(commandName, config.url, config.optionStyle, config.optionsHeading),
});

const fetch = async (
  commandName: string,
  url: URL,
  optionStyle: OptionStyle,
  optionsHeading: string
): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(url);
  const pre = document.querySelector('#content')?.querySelector('pre');
  if (!pre) {
    return [];
  }
  const options = textToOptions(getInnerText(pre), optionStyle, optionsHeading);
  return [
    {
      name: commandName,
      optionStyle: optionStyle,
      options: uniqueOptions(options),
    },
  ];
};

const textToOptions = (
  text: string,
  optionStyle: OptionStyle,
  optionsHeading: string
): Option[] => {
  const lines = text.split('\n').map((line) => tabToSpace(line, 8));

  const optionSectionLines = extractLines(
    lines,
    (line) => line === optionsHeading,
    (line) => countIndentWidth(line) === 0 && line.trim().length > 0
  ).slice(1, -1);
  const listItems = parseTextList(optionSectionLines);
  return mergeLists(
    listItems.map((item) => listItemToOptions(item, optionStyle))
  );
};

const listItemToOptions = (
  { titles, descriptionLines }: ListItem,
  optionStyle: OptionStyle
): Option[] => {
  const title = mergeOptionTitles(titles);
  const description = descriptionLines.join(' ');
  const optionStrings = transformOptionStrings(titles, [
    splitByComma,
    trimOptionalElements,
    trimSpaceDelimitedArguments,
    trimEqualDelimitedArguments,
  ]);
  return makeOptionList(optionStrings, optionStyle, title, description);
};
