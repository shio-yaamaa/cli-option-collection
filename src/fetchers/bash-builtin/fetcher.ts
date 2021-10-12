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

export interface SourceDef {
  commandName: string;
  defFileBasename?: string; // Defaults to commandName
}

export const fetch: Fetcher<SourceDef> = async (
  sourceDef: SourceDef
): Promise<Command[]> => {
  const text = await fetchPlainTextFromURL(
    buildDefFileURL(sourceDef.defFileBasename ?? sourceDef.commandName)
  );
  // Some .def files use tab indents and some use space indents. Normalize them by replacing tabs with spaces.
  const lines = text.split('\n').map((line) => tabToSpace(line, 8));
  const helpSection = findHelpSection(lines, sourceDef.commandName);
  const optionLists = findOptionLists(helpSection);
  const listItems = mergeLists(optionLists.map((list) => parseTextList(list)));
  const options = mergeLists(listItems.map((item) => listItemToOptions(item)));

  return [
    {
      name: sourceDef.commandName,
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
