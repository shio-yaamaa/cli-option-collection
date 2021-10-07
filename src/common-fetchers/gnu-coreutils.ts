import path from 'path';

import { Fetcher, Command, Option } from '../types';
import { findDListEntries, nextClosest } from '../utils/forFetcher/dom';
import {
  DOWNLOADS_DIRECTORY,
  fetchDocumentFromManFile,
} from '../utils/forFetcher/http';
import { uniqueOptions } from '../utils/forFetcher/options';
import { makeOptionList } from '../utils/forFetcher/optionString';
import {
  normalizeSpacesAndLinebreaks,
  normalizeSpacingAroundComma,
} from '../utils/forFetcher/string';
import {
  splitByComma,
  transformOptionStrings,
  trimOptionalElements,
  trimOptionArguments,
} from '../utils/forFetcher/transformOptionString';

export interface SourceDef {
  commandName: string;
  filename: string;
  optionsHeadingID: string;
}

export const coreutils: Fetcher<SourceDef> = async (
  sourceDef: SourceDef
): Promise<Command[]> => {
  const filePath = path.resolve(
    DOWNLOADS_DIRECTORY,
    'gnu-coreutils/man',
    sourceDef.filename
  );
  const document = await fetchDocumentFromManFile(filePath);
  const optionList = findOptionList(document, sourceDef.optionsHeadingID);
  if (!optionList) {
    return [];
  }
  const options = optionListToOptions(optionList);
  return [
    {
      name: sourceDef.commandName,
      options: uniqueOptions(options),
    },
  ];
};

const findOptionList = (
  document: Document,
  optionsHeadingID: string
): HTMLDListElement | null => {
  const optionsHeading = document.querySelector(`#${optionsHeadingID}`);
  if (!optionsHeading) {
    return null;
  }
  return nextClosest(
    optionsHeading,
    (element) => element.tagName.toLowerCase() === 'dl'
  ) as HTMLDListElement;
};

const optionListToOptions = (list: HTMLDListElement): Option[] => {
  const dlistEntries = findDListEntries(list);
  const options: Option[] = [];
  for (const { dts, dd } of dlistEntries) {
    const title = dts[0].textContent;
    if (!title) {
      continue;
    }
    const optionStrings = transformOptionStrings(
      [title],
      [splitByComma, trimOptionalElements, trimOptionArguments]
    );
    options.push(
      ...makeOptionList(
        optionStrings,
        normalizeSpacesAndLinebreaks(normalizeSpacingAroundComma(title)),
        dd.textContent?.trim() ?? ''
      )
    );
  }
  return options;
};
