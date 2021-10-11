import path from 'path';

import { Fetcher, Command, Option } from '../../types';
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

export interface SourceDef {
  commandName: string;
  filename: string;
  optionsHeadingID: string;
}

export const fetch: Fetcher<SourceDef> = async (
  sourceDef: SourceDef
): Promise<Command[]> => {
  const filePath = path.resolve(
    DOWNLOADS_DIRECTORY,
    'gnu-coreutils/man',
    sourceDef.filename
  );
  const document = await fetchDocumentFromManFile(filePath);
  const optionLists = findOptionLists(document, sourceDef.optionsHeadingID);
  const options = mergeLists(
    optionLists.map((list) => optionListToOptions(list))
  );
  return [
    {
      name: sourceDef.commandName,
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
