import { Fetcher, Command, Option } from '../../types';
import { fetchDocumentFromURL } from '../../utils/forFetcher/http';
import { makeOptionList } from '../../utils/forFetcher/optionString';
import { normalizeSpacingAroundComma } from '../../utils/forFetcher/string';
import {
  splitByComma,
  transformOptionStrings,
  trimOptionalElements,
  trimOptionArguments,
  trimOptionValues,
} from '../../utils/forFetcher/transformOptionString';

export interface SourceDef {
  commandName: string;
  url: URL;
}

interface OptionTableItem {
  hash: string; // e.g. "option_mysql_auto-rehash"
  title: string;
  description: string;
}

export const fetch: Fetcher<SourceDef> = async (
  sourceDef: SourceDef
): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(sourceDef.url);
  const hashDescriptionPairs = findOptionTableItems(document, sourceDef.url);

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
          hashDescriptionPair.title,
          hashDescriptionPair.description
        )
      );
    }
  }

  return [
    {
      name: sourceDef.commandName,
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
    const link = th?.querySelector('a')?.getAttribute('href');
    if (!link) {
      continue;
    }

    const hash = new URL(link, url).hash.slice(1);
    const description = tr.querySelector('td')?.textContent;
    if (hash.length === 0 || !description) {
      continue;
    }

    items.push({
      hash,
      title: th?.textContent ?? '',
      description,
    });
  }

  return items;
};

const findOptionTable = (document: Document): HTMLTableElement | null => {
  const tables = Array.from(document.querySelectorAll('table'));
  return (
    tables.find(
      (table) =>
        table.querySelector('th')?.textContent?.trim() === 'Option Name'
    ) ?? null
  );
};

const findOptionsCorrespondingToOptionTableItem = (
  document: Document,
  optionTableItem: OptionTableItem
): Option[] => {
  const marker = document.querySelector(`a[name=${optionTableItem.hash}]`);
  const title = marker?.parentElement?.textContent?.trim();
  if (!title) {
    return [];
  }

  const optionStrings = transformOptionStrings(
    [title],
    [splitByComma, trimOptionalElements, trimOptionArguments, trimOptionValues]
  );

  // Example: "--skip-named-commands" links to "--named-commands"
  if (optionStrings[0] !== optionTableItem.title.split(',')[0]) {
    return [];
  }

  return makeOptionList(
    optionStrings,
    normalizeSpacingAroundComma(title),
    optionTableItem.description
  );
};
