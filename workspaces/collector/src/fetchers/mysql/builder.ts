import { Fetcher, Command, Option, OptionStyle } from '../../types';
import { getInnerText } from '../../utils/dom';
import { fetchDocumentFromURL } from '../../utils/forFetcher/http';
import { makeOptionList } from '../../utils/forFetcher/optionString';
import { normalizeCommaDelimitedString } from '../../utils/forFetcher/string';
import {
  splitByComma,
  transformOptionStrings,
  trimOptionalElements,
  trimSpaceDelimitedArguments,
  trimEqualDelimitedArguments,
} from '../../utils/forFetcher/transformOptionString';

interface Config {
  url: URL;
}

export const build = (commandName: string, config: Config): Fetcher => {
  return {
    fetch: () => fetch(commandName, config.url),
  };
};

interface OptionTableItem {
  hash: string; // e.g. "option_mysql_auto-rehash"
  title: string;
  description: string;
}

const OPTION_STYLE = OptionStyle.SHORT_AND_LONG;

export const fetch = async (
  commandName: string,
  url: URL
): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(url);
  const hashDescriptionPairs = findOptionTableItems(document, url);

  const options: Option[] = [];

  for (const hashDescriptionPair of hashDescriptionPairs) {
    const correspondingOptions = findOptionsCorrespondingToOptionTableItem(
      document,
      hashDescriptionPair
    );
    if (correspondingOptions.length > 0) {
      options.push(...correspondingOptions);
    } else {
      // Options that begin with "--ssl" are consolidated as "--ssl*" in the command list.
      // In such cases, use the option label specified in the option table.
      options.push(
        ...makeOptionList(
          [hashDescriptionPair.title],
          OPTION_STYLE,
          hashDescriptionPair.title,
          hashDescriptionPair.description
        )
      );
    }
  }

  return [
    {
      name: commandName,
      optionStyle: OPTION_STYLE,
      options,
    },
  ];
};

const findOptionTableItems = (
  document: Document,
  url: URL
): OptionTableItem[] => {
  const optionTable = findOptionTable(document);
  if (!optionTable) {
    return [];
  }

  const trs = Array.from(optionTable.querySelectorAll('tbody tr'));
  const items: OptionTableItem[] = [];

  for (const tr of trs) {
    const th = tr.querySelector('th');
    if (!th) {
      continue;
    }
    const link = th.querySelector('a')?.getAttribute('href');
    if (!link) {
      continue;
    }

    const hash = new URL(link, url).hash.slice(1);
    const descriptionElement = tr.querySelector('td');
    if (hash.length === 0 || !descriptionElement) {
      continue;
    }
    const description = getInnerText(descriptionElement);

    items.push({
      hash,
      title: getInnerText(th),
      description,
    });
  }

  return items;
};

const findOptionTable = (document: Document): HTMLTableElement | null => {
  const tables = Array.from(document.querySelectorAll('table'));
  return (
    tables.find((table) => {
      const th = table.querySelector('th');
      return th && getInnerText(th).trim() === 'Option Name';
    }) ?? null
  );
};

const findOptionsCorrespondingToOptionTableItem = (
  document: Document,
  optionTableItem: OptionTableItem
): Option[] => {
  const marker = document.querySelector(`a[name=${optionTableItem.hash}]`);
  const titleElement = marker?.parentElement;
  if (!titleElement) {
    return [];
  }
  const title = getInnerText(titleElement).trim();

  const optionStrings = transformOptionStrings(
    [title],
    [
      splitByComma,
      trimOptionalElements,
      trimSpaceDelimitedArguments,
      trimEqualDelimitedArguments,
    ]
  );

  // Example: "--skip-named-commands" links to "--named-commands"
  if (optionStrings[0] !== optionTableItem.title.split(',')[0]) {
    return [];
  }

  return makeOptionList(
    optionStrings,
    OPTION_STYLE,
    normalizeCommaDelimitedString(title),
    optionTableItem.description
  );
};
