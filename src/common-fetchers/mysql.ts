import { Fetcher, Command, OptionDictionary, Option } from '../types';
import { fetchDocumentFromURL } from '../utils/forFetcher/dom';
import { partitionShortAndLongOptionLabels } from '../utils/forFetcher/optionString';
import { adjustSpacingAroundComma } from '../utils/forFetcher/string';
import {
  splitByComma,
  transformOptionStrings,
  trimOptionalElements,
  trimOptionArguments,
  trimOptionValues,
} from '../utils/forFetcher/transformOptionString';

export interface SourceDef {
  commandName: string;
  url: URL;
}

interface OptionTableItem {
  hash: string; // e.g. "option_mysql_auto-rehash"
  representation: string;
  description: string;
}

export const mysql: Fetcher<SourceDef> = async (
  sourceDef: SourceDef
): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(sourceDef.url);
  const hashDescriptionPairs = findOptionTableItems(document, sourceDef.url);

  const shortOptionDictionary: OptionDictionary = new Map();
  const longOptionDictionary: OptionDictionary = new Map();

  for (const hashDescriptionPair of hashDescriptionPairs) {
    const correspondingOption = findOptionCorrespondingToOptionTableItem(
      document,
      hashDescriptionPair
    );
    if (correspondingOption) {
      const { option, shortOptionLabels, longOptionLabels } =
        correspondingOption;

      for (const shortOptionLabel of shortOptionLabels) {
        shortOptionDictionary.set(shortOptionLabel, option);
      }
      for (const longOptionLabel of longOptionLabels) {
        longOptionDictionary.set(longOptionLabel, option);
      }
    } else {
      // Options that begin with "--ssl" are consolidated as "--ssl*" in the command list.
      // In such cases, use the option label specified in the option table.

      const option = {
        representation: hashDescriptionPair.representation,
        description: hashDescriptionPair.description,
      };

      const { shortOptionLabels, longOptionLabels } =
        partitionShortAndLongOptionLabels([hashDescriptionPair.representation]);

      for (const shortOptionLabel of shortOptionLabels) {
        shortOptionDictionary.set(shortOptionLabel, option);
      }
      for (const longOptionLabel of longOptionLabels) {
        longOptionDictionary.set(longOptionLabel, option);
      }
    }
  }

  return [
    {
      command: sourceDef.commandName,
      shortOptionDictionary,
      longOptionDictionary,
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
      representation: th?.textContent ?? '',
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

const findOptionCorrespondingToOptionTableItem = (
  document: Document,
  optionTableItem: OptionTableItem
): {
  option: Option;
  shortOptionLabels: string[];
  longOptionLabels: string[];
} | null => {
  const marker = document.querySelector(`a[name=${optionTableItem.hash}]`);
  const label = marker?.parentElement?.textContent?.trim();
  if (!label) {
    return null;
  }

  const option: Option = {
    representation: adjustSpacingAroundComma(label),
    description: optionTableItem.description,
  };

  const labels = transformOptionStrings(
    [label],
    [splitByComma, trimOptionalElements, trimOptionArguments, trimOptionValues]
  );

  // Example: "--skip-named-commands" links to "--named-commands"
  if (labels[0] !== optionTableItem.representation) {
    return null;
  }

  const { shortOptionLabels, longOptionLabels } =
    partitionShortAndLongOptionLabels(labels);

  // Return null if the option labels are not valid (e.g. "--ssl*")
  if (shortOptionLabels.length === 0 && longOptionLabels.length === 0) {
    return null;
  }

  return {
    option,
    shortOptionLabels,
    longOptionLabels,
  };
};
