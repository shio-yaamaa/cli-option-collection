import { Command, Option, Fetcher } from '../../types';
import { DListEntry, findDListEntries } from '../../utils/forFetcher/dom';
import { fetchDocumentFromManPageURL } from '../../utils/forFetcher/http';
import { uniqueOptions } from '../../utils/forFetcher/options';
import {
  makeOptionList,
  mergeOptionTitles,
} from '../../utils/forFetcher/optionString';
import {
  splitByComma,
  transformOptionStrings,
  trimOptionalElements,
  trimSpaceDelimitedArguments,
  trimEqualDelimitedArguments,
} from '../../utils/forFetcher/transformOptionString';
import { mergeLists } from '../../utils/utils';

// BUG: Options starting with "+" are not collected.

export interface SourceDef {
  commandName: string;
  url: URL;
  optionsHeaderID: string;
}

export const fetch: Fetcher<SourceDef> = async (
  sourceDef: SourceDef
): Promise<Command[]> => {
  const document = await fetchDocumentFromManPageURL(sourceDef.url);
  const section = findOptionsSection(document, sourceDef.optionsHeaderID);
  if (!section) {
    return [];
  }
  const options = sectionToOptions(section);

  return [
    {
      name: sourceDef.commandName,
      options: uniqueOptions(options),
    },
  ];
};

const findOptionsSection = (
  document: Document,
  optionsHeaderID: string
): Element | null => {
  const optionsHeading = document.querySelector(`#${optionsHeaderID}`);
  return optionsHeading?.closest('section') ?? null;
};

const sectionToOptions = (section: Element): Option[] => {
  const dlists = Array.from(
    section.querySelectorAll<HTMLDListElement>('section > dl')
  );
  const dlistEntries = mergeLists(
    dlists.map((dlist) => findDListEntries(dlist))
  );
  const options = mergeLists(
    dlistEntries.map((entry) => dlistEntryToOptions(entry))
  );
  return options;
};

const dlistEntryToOptions = ({ dts, dd }: DListEntry): Option[] => {
  const dtTexts = dts
    .map((dt) => dt.textContent)
    .filter((text): text is string => typeof text === 'string');
  const title = mergeOptionTitles(dtTexts);
  const description = dd.textContent?.trim() ?? '';
  const optionStrings = transformOptionStrings(dtTexts, [
    splitByComma,
    trimEqualDelimitedArguments,
    trimOptionalElements,
    trimSpaceDelimitedArguments,
  ]);
  return makeOptionList(optionStrings, title, description);
};
