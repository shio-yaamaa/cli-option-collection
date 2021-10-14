import { Fetcher, Command, Option, OptionStyle } from '../../types';
import { fetchDocumentFromURLViaFilter } from '../../utils/forFetcher/http';
import { ListItem, parseTextList } from '../../utils/forFetcher/textListParser';
import { uniqueOptions } from '../../utils/forFetcher/options';
import { makeOptionList } from '../../utils/forFetcher/optionString';
import {
  splitByComma,
  transformOptionStrings,
  trimSpaceDelimitedArguments,
} from '../../utils/forFetcher/transformOptionString';
import { mergeLists } from '../../utils/utils';
import { isElement } from '../../utils/typeGuards';
import { getInnerText } from '../../utils/dom';

interface Config {
  url: URL;
}

const OPTION_STYLE = OptionStyle.SHORT_AND_LONG;

export const build = (commandName: string, config: Config): Fetcher => ({
  fetch: () => fetch(commandName, config.url),
});

const fetch = async (commandName: string, url: URL): Promise<Command[]> => {
  // Man pages on manpages.ubuntu.com have invalid HTML structure, which tries to close a <div> with a </pre>,
  // so a string manipulation is needed before passing the HTML to the DOM parser.
  const document = await fetchDocumentFromURLViaFilter(url, (data) =>
    data.replace(/<\/pre>\s*<\/pre>/, '</pre></div>')
  );
  const list = findOptionList(document);
  if (!list) {
    return [];
  }
  const options = listToOptions(list);

  return [
    {
      name: commandName,
      optionStyle: OPTION_STYLE,
      options: uniqueOptions(options),
    },
  ];
};

const findOptionList = (document: Document): Element | null => {
  const headings = Array.from(document.querySelectorAll('h4'));
  const optionHeading = headings.find(
    (heading) => getInnerText(heading).trim() === 'OPTIONS'
  );
  if (!optionHeading) {
    return null;
  }
  const nextSibling = optionHeading.nextElementSibling;
  return nextSibling && isElement(nextSibling, 'pre') ? nextSibling : null;
};

const listToOptions = (list: Element): Option[] => {
  const listItems = parseTextList(getInnerText(list).split('\n'));
  return mergeLists(listItems.map((item) => listItemToOptions(item)));
};

const listItemToOptions = ({
  titles,
  descriptionLines,
}: ListItem): Option[] => {
  if (titles.length === 0 || descriptionLines.length === 0) {
    return [];
  }

  const optionStrings = transformOptionStrings(titles, [
    splitByComma,
    trimSpaceDelimitedArguments,
  ]);

  return makeOptionList(
    optionStrings,
    OPTION_STYLE,
    titles.join(' '),
    descriptionLines.join(' ')
  );
};
