import { Command, Option } from '../../types';
import { getInnerText } from '../../utils/dom';
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

interface Config {
  optionsHeaderID: string;
}

export const build = (commandName: string, config: Config) => ({
  fetch: () => fetch(commandName, config.optionsHeaderID),
});

const fetch = async (
  commandName: string,
  optionsHeaderID: string
): Promise<Command[]> => {
  const document = await fetchDocumentFromManPageURL(
    new URL(
      `https://raw.githubusercontent.com/junegunn/fzf/master/man/man1/${commandName}.1`
    )
  );
  const section = findOptionsSection(document, optionsHeaderID);
  if (!section) {
    return [];
  }
  const options = sectionToOptions(section);

  return [
    {
      name: commandName,
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
  const dtTexts = dts.map((dt) => getInnerText(dt));
  const title = mergeOptionTitles(dtTexts);
  const description = getInnerText(dd);
  const optionStrings = transformOptionStrings(dtTexts, [
    splitByComma,
    trimEqualDelimitedArguments,
    trimOptionalElements,
    trimSpaceDelimitedArguments,
  ]);
  return makeOptionList(optionStrings, title, description);
};
