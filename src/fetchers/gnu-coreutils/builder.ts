import path from 'path';

import { Command, Option } from '../../types';
import { getInnerText } from '../../utils/dom';
import { findDListEntries } from '../../utils/forFetcher/dom';
import {
  DOWNLOADS_DIRECTORY,
  fetchDocumentFromManFile,
} from '../../utils/forFetcher/http';
import { uniqueOptions } from '../../utils/forFetcher/options';
import { makeOptionList } from '../../utils/forFetcher/optionString';
import { normalizeSpacingAroundComma } from '../../utils/forFetcher/string';
import {
  splitByComma,
  transformOptionStrings,
  trimOptionalElements,
  trimSpaceDelimitedArguments,
  trimEqualDelimitedArguments,
} from '../../utils/forFetcher/transformOptionString';
import { mergeLists } from '../../utils/utils';

interface Config {
  filename: string;
  optionsHeadingID?: string; // Defaults to "DESCRIPTION"
}

export const build = (commandName: string, config: Config) => ({
  fetch: () =>
    fetch(
      commandName,
      config.filename,
      config.optionsHeadingID ?? 'DESCRIPTION'
    ),
});

export const fetch = async (
  commandName: string,
  filename: string,
  optionsHeadingID: string
): Promise<Command[]> => {
  const filePath = path.resolve(
    DOWNLOADS_DIRECTORY,
    'gnu-coreutils/man',
    filename
  );
  const document = await fetchDocumentFromManFile(filePath);
  const optionLists = findOptionLists(document, optionsHeadingID);
  const options = mergeLists(
    optionLists.map((list) => optionListToOptions(list))
  );
  return [
    {
      name: commandName,
      options: uniqueOptions(options),
    },
  ];
};

const findOptionLists = (
  document: Document,
  optionsHeadingID: string
): HTMLDListElement[] => {
  const optionsHeading = document.querySelector(`#${optionsHeadingID}`);
  const optionsSection = optionsHeading?.parentElement;
  if (!optionsSection) {
    return [];
  }
  return Array.from(optionsSection.querySelectorAll('dl'));
};

const optionListToOptions = (list: HTMLDListElement): Option[] => {
  const dlistEntries = findDListEntries(list);
  const options: Option[] = [];
  for (const { dts, dd } of dlistEntries) {
    const title = normalizeSpacingAroundComma(getInnerText(dts[0]));
    const description = getInnerText(dd).trim();
    const optionStrings = transformOptionStrings(
      [title],
      [
        splitByComma,
        trimOptionalElements,
        trimEqualDelimitedArguments,
        trimSpaceDelimitedArguments,
      ]
    );
    options.push(...makeOptionList(optionStrings, title, description));
  }
  return options;
};
