import { Fetcher, Command, Option } from '../types';
import { fetchDocumentFromURLViaFilter } from '../utils/forFetcher/dom';
import {
  findIndentedListItems,
  IndentedListItem,
} from '../utils/forFetcher/indentedList';
import { uniqueOptions } from '../utils/forFetcher/options';
import { distinguishOptionKeyType } from '../utils/forFetcher/optionString';
import {
  splitByComma,
  transformOptionStrings,
  trimOptionArguments,
} from '../utils/forFetcher/transformOptionString';

export interface SourceDef {
  commandName: string;
  url: URL;
}

export const apt: Fetcher<SourceDef> = async (
  sourceDef: SourceDef
): Promise<Command[]> => {
  // Man pages on manpages.ubuntu.com have invalid HTML structure, which tries to close a <div> with a </pre>,
  // so a string manipulation is needed before passing the HTML to the DOM parser.
  const document = await fetchDocumentFromURLViaFilter(sourceDef.url, (data) =>
    data.replace(/<\/pre>\s*<\/pre>/, '</pre></div>')
  );
  const list = findOptionList(document);
  if (!list) {
    return [];
  }
  const options = listToOptions(list);

  return [
    {
      name: sourceDef.commandName,
      options: uniqueOptions(options),
    },
  ];
};

const findOptionList = (document: Document): Element | null => {
  const headings = Array.from(document.querySelectorAll('h4'));
  const optionHeading = headings.find(
    (heading) => heading.textContent?.trim() === 'OPTIONS'
  );
  if (!optionHeading) {
    return null;
  }
  const nextSibling = optionHeading.nextElementSibling;
  return nextSibling?.tagName.toLowerCase() === 'pre' ? nextSibling : null;
};

const listToOptions = (list: Element): Option[] => {
  const listText = list.textContent;
  if (!listText) {
    return [];
  }
  const listItems = findIndentedListItems(listText, 7, 11);
  return ([] as Option[]).concat(
    ...listItems.map((item) => listItemToOptions(item))
  );
};

const listItemToOptions = ({
  titles,
  descriptions,
}: IndentedListItem): Option[] => {
  if (titles.length === 0 || descriptions.length === 0) {
    return [];
  }

  const optionStrings = transformOptionStrings(titles, [
    splitByComma,
    trimOptionArguments,
  ]);

  return distinguishOptionKeyType(optionStrings).map(({ type, key }) => ({
    type,
    key,
    title: titles.join(' '),
    description: descriptions.join(' '),
  }));
};