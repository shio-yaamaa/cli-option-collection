import { Command, Fetcher, Option } from '../../types';
import { getInnerText } from '../../utils/dom';
import {
  DListEntry,
  findDListEntries,
  findElementsUnderHeading,
} from '../../utils/forFetcher/dom';
import { fetchDocumentFromURL } from '../../utils/forFetcher/http';
import { uniqueOptions } from '../../utils/forFetcher/options';
import {
  makeOptionList,
  mergeOptionTitles,
} from '../../utils/forFetcher/optionString';
import {
  splitByComma,
  transformOptionStrings,
  trimEqualDelimitedArguments,
  trimOptionalElements,
  trimSpaceDelimitedArguments,
} from '../../utils/forFetcher/transformOptionString';
import { mergeLists } from '../../utils/utils';

export const build = (commandName: string): Fetcher => {
  return {
    fetch: () => fetch(commandName),
  };
};

const fetch = async (commandName: string): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(
    new URL(
      `https://www.freedesktop.org/software/systemd/man/${commandName}.html`
    )
  );
  const optionsHeading = document.querySelector('#Options');
  if (!optionsHeading) {
    return [];
  }
  const contents = findElementsUnderHeading(
    optionsHeading,
    ['h1', 'h2'],
    'div'
  );
  const dls = mergeLists(
    contents.map((content) =>
      Array.from(content.querySelectorAll<HTMLDListElement>('div > dl'))
    )
  );
  const dlistEntries = mergeLists(dls.map((dl) => findDListEntries(dl)));
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
  const dtTexts = dts.map((dt) => getInnerText(dt).replace('¶', '').trim());
  const title = mergeOptionTitles(dtTexts);
  const description = getInnerText(dd).replace(/¶/g, '');
  const optionStrings = transformOptionStrings(dtTexts, [
    splitByComma,
    trimOptionalElements,
    trimEqualDelimitedArguments,
    trimSpaceDelimitedArguments,
  ]);
  return makeOptionList(optionStrings, title, description);
};
