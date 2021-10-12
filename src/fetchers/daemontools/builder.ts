import { Command, Fetcher, Option } from '../../types';
import { getInnerText } from '../../utils/dom';
import { fetchDocumentFromURL } from '../../utils/forFetcher/http';
import { uniqueOptions } from '../../utils/forFetcher/options';
import { makeOptionList } from '../../utils/forFetcher/optionString';
import {
  transformOptionStrings,
  trimSpaceDelimitedArguments,
} from '../../utils/forFetcher/transformOptionString';
import { mergeLists } from '../../utils/utils';

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

  const colonIndex = listItemText.indexOf(':');
  if (colonIndex === -1) {
    return [];
  }

  const title = listItemText.slice(0, colonIndex).trim();
  const description = listItemText.slice(colonIndex + 1).trim();
  const optionStrings = transformOptionStrings(
    [title],
    [trimSpaceDelimitedArguments]
  );
  return makeOptionList(optionStrings, title, description);
};
