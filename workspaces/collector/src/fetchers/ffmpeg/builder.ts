import { Command, Fetcher, Option, OptionStyle } from '../../types';
import { getInnerText } from '../../utils/dom';
import { DListEntry, findDListEntries } from '../../utils/forFetcher/dom';
import { fetchDocumentFromURL } from '../../utils/forFetcher/http';
import { uniqueOptions } from '../../utils/forFetcher/options';
import {
  makeOptionList,
  mergeOptionTitles,
} from '../../utils/forFetcher/optionString';
import { normalizeCommaDelimitedString } from '../../utils/forFetcher/string';
import {
  splitByComma,
  transformOptionStrings,
  trimAfterColons,
  trimOptionalElements,
  trimSpaceDelimitedArguments,
} from '../../utils/forFetcher/transformOptionString';
import { mergeLists } from '../../utils/utils';

// BUG: "no" prefix is not considered.

const OPTION_STYLE = OptionStyle.SINGLE_DASH;

export const build = (commandName: string): Fetcher => ({
  fetch: () => fetch(commandName),
});

const fetch = async (commandName: string): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(
    new URL(`https://www.ffmpeg.org/${commandName}.html`)
  );
  const dlists = findTopLevelLists(document);
  const dlistEntries = mergeLists(dlists.map((dl) => findDListEntries(dl)));
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

const findTopLevelLists = (document: Document): HTMLDListElement[] =>
  Array.from(document.querySelectorAll('.page-content > dl'));

const dlistEntryToOptions = ({ dts, dd }: DListEntry): Option[] => {
  const dtTexts = dts.map((dt) => getInnerText(dt).trim());
  const title = normalizeCommaDelimitedString(mergeOptionTitles(dtTexts));
  const description = getInnerText(dd).trim();
  const optionStrings = transformOptionStrings(dtTexts, [
    trimOptionalElements,
    splitByComma,
    trimSpaceDelimitedArguments,
    trimAfterColons,
  ]);
  return makeOptionList(optionStrings, OPTION_STYLE, title, description);
};
