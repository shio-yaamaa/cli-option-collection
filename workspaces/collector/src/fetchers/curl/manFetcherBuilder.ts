import path from 'path';

import { Command, Fetcher, Option, OptionStyle } from '../../types';
import { getInnerText } from '../../utils/dom';
import { DListEntry, findDListEntries } from '../../utils/forFetcher/dom';
import {
  DOWNLOADS_DIRECTORY,
  fetchDocumentFromManFile,
} from '../../utils/forFetcher/http';
import { uniqueOptions } from '../../utils/forFetcher/options';
import {
  makeOptionList,
  mergeOptionTitles,
} from '../../utils/forFetcher/optionString';
import {
  transformOptionStrings,
  trimOptionalElements,
  trimSpaceDelimitedArguments,
} from '../../utils/forFetcher/transformOptionString';
import { mergeLists } from '../../utils/utils';

interface Config {
  filename: string;
}

const OPTION_STYLE = OptionStyle.SHORT_AND_LONG;

export const buildManFetcher = (
  commandName: string,
  config: Config
): Fetcher => ({
  fetch: () => fetch(commandName, config.filename),
});

const fetch = async (
  commandName: string,
  filename: string
): Promise<Command[]> => {
  const filePath = path.resolve(DOWNLOADS_DIRECTORY, 'curl/docs', filename);
  const document = await fetchDocumentFromManFile(filePath);
  const optionsHeading = document.querySelector('#OPTIONS');
  const optionSection = optionsHeading?.closest('section');
  if (!optionSection) {
    return [
      {
        name: commandName,
        optionStyle: OPTION_STYLE,
        options: [],
      },
    ];
  }
  const lists = Array.from(optionSection.querySelectorAll('dl'));
  const dlistEntries = mergeLists(lists.map((list) => findDListEntries(list)));
  const options = mergeLists(
    dlistEntries.map((entry) => dlistEntryToOptions(entry))
  );
  return [
    {
      name: commandName,
      optionStyle: OPTION_STYLE,
      options: uniqueOptions(options),
    },
  ];
};

const dlistEntryToOptions = ({ dts, dd }: DListEntry): Option[] => {
  const dtTexts = dts.map((dt) => getInnerText(dt));
  const title = mergeOptionTitles(dtTexts);
  const description = getInnerText(dd);
  const optionStrings = transformOptionStrings(dtTexts, [
    trimOptionalElements,
    trimSpaceDelimitedArguments,
  ]);
  return makeOptionList(optionStrings, OPTION_STYLE, title, description);
};
