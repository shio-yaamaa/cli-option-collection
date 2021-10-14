import { Command, Fetcher, Option } from '../../types';
import { getInnerText } from '../../utils/dom';
import { DListEntry, findDListEntries } from '../../utils/forFetcher/dom';
import { fetchDocumentFromManPageURL } from '../../utils/forFetcher/http';
import { uniqueOptions } from '../../utils/forFetcher/options';
import {
  makeOptionList,
  mergeOptionTitles,
} from '../../utils/forFetcher/optionString';
import {
  transformOptionStrings,
  trimEqualDelimitedArguments,
  trimOptionalElements,
  trimSpaceDelimitedArguments,
} from '../../utils/forFetcher/transformOptionString';
import { mergeLists } from '../../utils/utils';

interface Config {
  manFilename: string;
}

export const build = (commandName: string, config: Config): Fetcher => {
  return {
    fetch: () => fetch(commandName, config.manFilename),
  };
};

const fetch = async (
  commandName: string,
  manFilename: string
): Promise<Command[]> => {
  const document = await fetchDocumentFromManPageURL(
    new URL(
      `https://raw.githubusercontent.com/ruby/ruby/master/man/${manFilename}`
    )
  );
  const optionsSection = document.querySelector('#OPTIONS')?.parentElement;
  if (!optionsSection) {
    return [
      {
        name: commandName,
        options: [],
      },
    ];
  }
  const dls = Array.from(
    optionsSection.querySelectorAll<HTMLDListElement>('section > dl')
  );
  const dlistEntries = mergeLists(dls.map((dl) => findDListEntries(dl, true)));
  const options = mergeLists(
    dlistEntries.map((entry) => dlistEntryToOptions(entry))
  );
  return [
    {
      name: commandName,
      options: uniqueOptions(options),
    },
  ];
};

const dlistEntryToOptions = ({ dts, dd }: DListEntry): Option[] => {
  const dtTexts = dts.map((dt) => getInnerText(dt));
  const title = mergeOptionTitles(dtTexts);
  const description = getInnerText(dd).trim();
  const optionStrings = transformOptionStrings(dtTexts, [
    trimOptionalElements,
    trimEqualDelimitedArguments,
    trimSpaceDelimitedArguments,
  ]);
  return makeOptionList(optionStrings, title, description);
};
