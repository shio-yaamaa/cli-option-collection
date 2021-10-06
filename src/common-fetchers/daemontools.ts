import { Fetcher, Command, Option } from '../types';
import { fetchDocumentFromURL } from '../utils/forFetcher/http';
import { uniqueOptions } from '../utils/forFetcher/options';
import { makeOptionList } from '../utils/forFetcher/optionString';
import {
  transformOptionStrings,
  trimOptionArguments,
} from '../utils/forFetcher/transformOptionString';

export interface SourceDef {
  commandName: string;
  url: URL;
}

export const daemontools: Fetcher<SourceDef> = async (
  sourceDef: SourceDef
): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(sourceDef.url);
  const lists = findTopLevelLists(document);
  const options = ([] as Option[]).concat(
    ...lists.map((list) => listToOptions(list))
  );

  return [
    {
      name: sourceDef.commandName,
      options: uniqueOptions(options),
    },
  ];
};

const findTopLevelLists = (document: Document): HTMLUListElement[] =>
  Array.from(document.querySelectorAll('body > ul'));

const listToOptions = (list: HTMLUListElement): Option[] => {
  const lis = Array.from(list.querySelectorAll('li'));
  return ([] as Option[]).concat(...lis.map((li) => listItemToOptions(li)));
};

const listItemToOptions = (listItem: HTMLLIElement): Option[] => {
  const listItemText = listItem.textContent;
  if (!listItemText) {
    return [];
  }

  const colonIndex = listItemText.indexOf(':');
  if (colonIndex === -1) {
    return [];
  }

  const title = listItemText.slice(0, colonIndex).trim();
  const description = listItemText.slice(colonIndex + 1).trim();
  const optionStrings = transformOptionStrings([title], [trimOptionArguments]);
  return makeOptionList(optionStrings).map(({ type, key }) => ({
    type,
    key,
    title,
    description,
  }));
};
