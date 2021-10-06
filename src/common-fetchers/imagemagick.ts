import { Fetcher, Command, Option } from '../types';
import { fetchDocumentFromURL } from '../utils/forFetcher/http';
import { uniqueOptions } from '../utils/forFetcher/options';
import { makeOptionListForSingleDashStyle } from '../utils/forFetcher/optionString';
import { normalizeSpacesAndLinebreaks } from '../utils/forFetcher/string';
import {
  transformOptionStrings,
  trimOptionArguments,
} from '../utils/forFetcher/transformOptionString';

export interface SourceDef {
  commandName: string;
  url: URL;
}

export const imagemagick: Fetcher<SourceDef> = async (
  sourceDef: SourceDef
): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(sourceDef.url);
  const optionTable = document.querySelector('table');
  if (!optionTable) {
    return [];
  }
  const options = optionTableToOptions(optionTable);

  return [
    {
      name: sourceDef.commandName,
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
    const title = tds[0].textContent?.trim();
    const description = tds[1].textContent?.trim();
    if (!title || !description) {
      continue;
    }
    const optionStrings = transformOptionStrings(
      [title],
      [trimOptionArguments]
    );
    options.push(
      ...makeOptionListForSingleDashStyle(
        optionStrings,
        title,
        normalizeSpacesAndLinebreaks(description)
      )
    );
  }
  return options;
};
