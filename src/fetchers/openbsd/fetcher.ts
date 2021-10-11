import { Fetcher, Command, Option } from '../../types';
import { getInnerText } from '../../utils/dom';
import { DListEntry, findDListEntries } from '../../utils/forFetcher/dom';
import { fetchDocumentFromURL } from '../../utils/forFetcher/http';
import { uniqueOptions } from '../../utils/forFetcher/options';
import {
  makeOptionList,
  mergeOptionTitles,
} from '../../utils/forFetcher/optionString';
import {
  splitByPipe,
  transformOptionStrings,
  trimEqualDelimitedArguments,
  trimOptionalElements,
  trimSpaceDelimitedArguments,
} from '../../utils/forFetcher/transformOptionString';
import { mergeLists } from '../../utils/utils';

export interface SourceDef {
  commandName: string;
  optionsHeadingID: string;
}

const documentURL = (commandName: string) =>
  new URL(`https://man.openbsd.org/${commandName}`);

export const fetch: Fetcher<SourceDef> = async (
  sourceDef: SourceDef
): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(
    documentURL(sourceDef.commandName)
  );
  const optionSection = findOptionSection(document, sourceDef.optionsHeadingID);
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
      name: sourceDef.commandName,
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
    splitByPipe,
    trimEqualDelimitedArguments,
    trimSpaceDelimitedArguments,
    trimOptionalElements,
  ]);
  return makeOptionList(optionStrings, title, description);
};
