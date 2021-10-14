import { Command, Option, OptionStyle } from '../../types';
import { getInnerText } from '../../utils/dom';
import { fetchDocumentFromURL } from '../../utils/forFetcher/http';
import { uniqueOptions } from '../../utils/forFetcher/options';
import { makeOptionList } from '../../utils/forFetcher/optionString';
import {
  transformOptionStrings,
  trimSpaceDelimitedArguments,
} from '../../utils/forFetcher/transformOptionString';

export interface Config {
  url: URL;
}

const OPTION_STYLE = OptionStyle.SINGLE_DASH;

export const build = (commandName: string, config: Config) => ({
  fetch: () => fetch(commandName, config.url),
});

const fetch = async (commandName: string, url: URL): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(url);
  const optionTable = document.querySelector('table');
  if (!optionTable) {
    return [];
  }
  const options = optionTableToOptions(optionTable);

  return [
    {
      name: commandName,
      optionStyle: OPTION_STYLE,
      options: uniqueOptions(options),
    },
  ];
};

const optionTableToOptions = (table: Element): Option[] => {
  const rows = Array.from(table.querySelectorAll('tr'));
  const options: Option[] = [];
  for (const row of rows) {
    const tds = Array.from(row.querySelectorAll('td'));
    if (tds.length !== 2) {
      continue;
    }
    const title = getInnerText(tds[0]).trim();
    const description = getInnerText(tds[1]).trim();
    const optionStrings = transformOptionStrings(
      [title],
      [trimSpaceDelimitedArguments]
    );
    options.push(
      ...makeOptionList(optionStrings, OPTION_STYLE, title, description)
    );
  }
  return options;
};
