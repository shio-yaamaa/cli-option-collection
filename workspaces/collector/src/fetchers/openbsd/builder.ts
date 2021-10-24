import { Command, Option, OptionStyle } from '../../types';
import { getInnerText } from '../../utils/dom';
import { DListEntry, findDListEntries } from '../../utils/forFetcher/dom';
import { fetchDocumentFromURL } from '../../utils/forFetcher/http';
import { uniqueOptions } from '../../utils/forFetcher/options';
import {
  makeOptionList,
  mergeOptionTitles,
} from '../../utils/forFetcher/optionString';
import {
  splitByComma,
  splitByPipe,
  transformOptionStrings,
  trimEqualDelimitedArguments,
  trimOptionalElements,
  trimSpaceDelimitedArguments,
} from '../../utils/forFetcher/transformOptionString';
import { mergeLists } from '../../utils/utils';

interface Config {
  optionsHeadingID?: string; // Defaults to "DESCRIPTION"
}

const OPTION_STYLE = OptionStyle.SHORT_AND_LONG;

export const build = (commandName: string, config?: Config) => ({
  fetch: () => fetch(commandName, config?.optionsHeadingID ?? 'DESCRIPTION'),
});

const documentURL = (commandName: string) =>
  new URL(`https://man.openbsd.org/${commandName}`);

export const fetch = async (
  commandName: string,
  optionsHeadingID: string
): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(documentURL(commandName));
  const optionSection = findOptionSection(document, optionsHeadingID);
  if (!optionSection) {
    return [];
  }
  const optionLists = findOptionLists(optionSection);
  const dlistEntries = mergeLists(
    optionLists.map((dlist) => findDListEntries(dlist, true))
  );
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

const findOptionSection = (
  document: Document,
  optionsHeadingID: string
): Element | null => {
  const optionsHeading = document.querySelector(`#${optionsHeadingID}`);
  return optionsHeading?.closest('section') ?? null;
};

const findOptionLists = (section: Element): HTMLDListElement[] =>
  Array.from(section.querySelectorAll<HTMLDListElement>('section > dl'));

const dlistEntryToOptions = ({ dts, dd }: DListEntry): Option[] => {
  const dtTexts = dts.map((dt) => getInnerText(dt));
  const title = mergeOptionTitles(dtTexts);
  const description = getInnerText(dd).trim();
  const optionStrings = transformOptionStrings(dtTexts, [
    splitByComma,
    splitByPipe,
    trimEqualDelimitedArguments,
    trimSpaceDelimitedArguments,
    trimOptionalElements,
  ]);
  return makeOptionList(optionStrings, OPTION_STYLE, title, description);
};
