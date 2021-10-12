import tabToSpace from 'tab-to-space';

import { Fetcher, Command, Option } from '../../types';
import { fetchPlainTextFromURL } from '../../utils/forFetcher/http';
import { ListItem, parseTextList } from '../../utils/forFetcher/textListParser';
import { uniqueOptions } from '../../utils/forFetcher/options';
import {
  makeOptionList,
  mergeOptionTitles,
} from '../../utils/forFetcher/optionString';
import {
  countIndentWidth,
  extractLines,
  normalizeSpaces,
} from '../../utils/forFetcher/string';
import {
  transformOptionStrings,
  trimSpaceDelimitedArguments,
} from '../../utils/forFetcher/transformOptionString';
import { findHeadingContentsPairs } from '../../utils/forFetcher/utils';
import { mergeLists } from '../../utils/utils';

interface Config {
  defFileBasename?: string; // Defaults to commandName
}

export const build = (commandName: string, config?: Config): Fetcher => ({
  fetch: () => fetch(commandName, config?.defFileBasename ?? commandName),
});

export const fetch = async (
  commandName: string,
  defFileBasename: string
): Promise<Command[]> => {
  const text = await fetchPlainTextFromURL(buildDefFileURL(defFileBasename));
  // Some .def files use tab indents and some use space indents. Normalize them by replacing tabs with spaces.
  const lines = text.split('\n').map((line) => tabToSpace(line, 8));
  const helpSection = findHelpSection(lines, commandName);
  const optionLists = findOptionLists(helpSection);
  const listItems = mergeLists(optionLists.map((list) => parseTextList(list)));
  const options = mergeLists(listItems.map((item) => listItemToOptions(item)));

  return [
    {
      name: commandName,
      options: uniqueOptions(options),
    },
  ];
};

const buildDefFileURL = (basename: string) =>
  new URL(
    `http://git.savannah.gnu.org/cgit/bash.git/plain/builtins/${basename}.def`
  );

// The help section for a command starts with a line "$BUILTIN ..." and ends with "$END"
const findHelpSection = (lines: string[], commandName: string): string[] => {
  return extractLines(
    lines,
    (line) => line === `$BUILTIN ${commandName}`,
    (line) => line === '$END'
  ).filter((line) => !line.startsWith('#')); // Ignore comment lines
};

const findOptionLists = (lines: string[]): string[][] => {
  const headingContentPairs = findHeadingContentsPairs(
    lines,
    (line) => countIndentWidth(line) === 0,
    (line) => line.trim().length > 0 && countIndentWidth(line) > 0
  );
  return headingContentPairs
    .filter(({ contents }) => contents.length > 0)
    .map(({ contents }) => contents);
};

const listItemToOptions = (listItem: ListItem): Option[] => {
  const title = normalizeSpaces(mergeOptionTitles(listItem.titles));
  const optionString = transformOptionStrings(
    [title],
    [trimSpaceDelimitedArguments]
  );
  const description = normalizeSpaces(listItem.descriptionLines.join(' '));
  return makeOptionList(optionString, title, description);
};
