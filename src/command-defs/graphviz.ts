import { FetchFunction, Command, Option } from '../types';
import { fetchPlainTextFromURL } from '../utils/forFetcher/http';
import {
  findIndentedListItems,
  IndentedListItem,
} from '../utils/forFetcher/indentedList';
import { uniqueOptions } from '../utils/forFetcher/options';
import {
  makeOptionList,
  mergeOptionTitles,
} from '../utils/forFetcher/optionString';
import {
  transformOptionStrings,
  trimNonDelimitedOptionValues,
  trimOptionalElements,
  trimOptionValues,
} from '../utils/forFetcher/transformOptionString';
import { mergeLists } from '../utils/utils';

// Alternative sources:
// - https://graphviz.org/doc/info/command.html

const DOC_URL = 'https://gitlab.com/graphviz/graphviz/-/raw/main/doc/Dot.ref';

export const fetchDot: FetchFunction = async (): Promise<Command[]> => {
  const url = new URL(DOC_URL);
  const text = await fetchPlainTextFromURL(url);
  const lines = text.split('\n');
  const headingLineIndex = lines.findIndex((line) => line === 'Flags');
  const optionSectionEndLineIndex = lines.findIndex(
    (line, index) =>
      index > headingLineIndex &&
      line.trim().length > 0 &&
      !/^[\s\-]/.test(line)
  );
  const optionSectionLines = lines.slice(
    headingLineIndex,
    optionSectionEndLineIndex
  );
  const indentedListItems = findIndentedListItems(
    optionSectionLines.join('\n'),
    0,
    5
  );
  const options = mergeLists(
    indentedListItems.map((listItem) => indentedListItemToOptions(listItem))
  );

  return [
    {
      name: 'dot',
      options: uniqueOptions(options),
    },
  ];
};

const indentedListItemToOptions = (listItem: IndentedListItem): Option[] => {
  const title = mergeOptionTitles(listItem.titles);
  const description = listItem.descriptions.join(' ');
  const optionStrings = transformOptionStrings(listItem.titles, [
    trimOptionalElements,
    trimOptionValues,
    trimNonDelimitedOptionValues,
  ]);
  return makeOptionList(optionStrings, title, description);
};
