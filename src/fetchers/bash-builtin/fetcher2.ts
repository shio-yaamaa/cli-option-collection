import { Fetcher, Command, Option } from '../../types';
import { fetchPlainTextFromURL } from '../../utils/forFetcher/http';
import {
  ListItem,
  parseTabbedTextList2,
} from '../../utils/forFetcher/listParser';
import { uniqueOptions } from '../../utils/forFetcher/options';
import { makeOptionList } from '../../utils/forFetcher/optionString';
import { extractLines } from '../../utils/forFetcher/string';
import { transformOptionStrings } from '../../utils/forFetcher/transformOptionString';
import { mergeLists } from '../../utils/utils';

export interface SourceDef {
  commandName: string;
  defFileBasename: string;
}

export const fetch: Fetcher<SourceDef> = async (
  sourceDef: SourceDef
): Promise<Command[]> => {
  const text = await fetchPlainTextFromURL(
    buildDefFileURL(sourceDef.defFileBasename)
  );
  const lines = text.split('\n').map((line) => line.replace(/\t/g, '  '));
  const helpSection = findHelpSection(lines, sourceDef.commandName);
  const optionList = findOptionList(helpSection);
  const listItems = parseTabbedTextList2(optionList.join('\n'));
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
  );
};

const findOptionList = (lines: string[]): string[] => {
  const extractedLines = extractLines(
    lines,
    (line) => line === `Options:`,
    (line) => line.trim().length === 0
  );
  return extractedLines.slice(1);
};

const listItemToOptions = (listItem: ListItem): Option[] => {
  const optionString = transformOptionStrings([listItem.title], []);
  const description = listItem.descriptionLines.join(' ');
  return makeOptionList(optionString, listItem.title, description);
};
