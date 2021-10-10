import { Fetcher, Command, Option } from '../../types';
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

export interface SourceDef {
  commandName: string;
  url: URL;
}

export const fetch: Fetcher<SourceDef> = async (
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
  const listItems = parseTextList(listText.split('\n'));
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
    titles.join(' '),
    descriptionLines.join(' ')
  );
};
