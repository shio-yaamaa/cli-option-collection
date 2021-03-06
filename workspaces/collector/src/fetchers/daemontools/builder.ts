import { Command, Fetcher, Option, OptionStyle } from '../../types';
import { getInnerText } from '../../utils/dom';
import { fetchDocumentFromURL } from '../../utils/forFetcher/http';
import { uniqueOptions } from '../../utils/forFetcher/options';
import { makeOptionList } from '../../utils/forFetcher/optionString';
import {
  transformOptionStrings,
  trimSpaceDelimitedArguments,
} from '../../utils/forFetcher/transformOptionString';
import { splitN } from '../../utils/string';
import { mergeLists } from '../../utils/utils';

const OPTION_STYLE = OptionStyle.SHORT_AND_LONG;

export const build = (commandName: string): Fetcher => ({
  fetch: () => fetch(commandName),
});

const fetch = async (commandName: string): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(
    new URL(`https://cr.yp.to/daemontools/${commandName}.html`)
  );
  const lists = findTopLevelLists(document);
  const options = mergeLists(lists.map((list) => listToOptions(list)));

  return [
    {
      name: commandName,
      optionStyle: OPTION_STYLE,
      options: uniqueOptions(options),
    },
  ];
};

const findTopLevelLists = (document: Document): HTMLUListElement[] =>
  Array.from(document.querySelectorAll('body > ul'));

const listToOptions = (list: HTMLUListElement): Option[] => {
  const lis = Array.from(list.querySelectorAll('li'));
  return mergeLists(lis.map((li) => listItemToOptions(li)));
};

const listItemToOptions = (listItem: HTMLLIElement): Option[] => {
  const listItemText = getInnerText(listItem);

  const [title, description] = splitN(listItemText, ':', 2).map((item) =>
    item.trim()
  );
  if (!title || !description) {
    return [];
  }

  const optionStrings = transformOptionStrings(
    [title],
    [trimSpaceDelimitedArguments]
  );
  return makeOptionList(optionStrings, OPTION_STYLE, title, description);
};
