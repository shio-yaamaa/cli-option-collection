import { Fetcher, Command, Option, OptionType } from '../types';
import { DListEntry, findDListEntries } from '../utils/forFetcher/dom';
import { fetchDocumentFromURL } from '../utils/forFetcher/http';
import { uniqueOptions } from '../utils/forFetcher/options';
import {
  makeOptionListForSingleDashStyle,
  mergeOptionTitles,
} from '../utils/forFetcher/optionString';
import { normalizeSpacingAroundComma } from '../utils/forFetcher/string';
import {
  splitByComma,
  transformOptionStrings,
  trimAfterColons,
  trimOptionalElements,
  trimOptionArguments,
} from '../utils/forFetcher/transformOptionString';

// BUG: "no" prefix is not considered.
// NOTE: ffmpeg uses single dash for both single-letter and multiple-letter options,
//       but this fetcher distinguishes these two types anyway.

export interface SourceDef {
  commandName: string;
  url: URL;
}

export const ffmpeg: Fetcher<SourceDef> = async (
  sourceDef: SourceDef
): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(sourceDef.url);
  const dlists = findTopLevelLists(document);
  const dlistEntries = ([] as DListEntry[]).concat(
    ...dlists.map((dl) => findDListEntries(dl))
  );
  const options = ([] as Option[]).concat(
    ...dlistEntries.map((entry) => dlistEntryToOptions(entry))
  );

  return [
    {
      name: sourceDef.commandName,
      options: uniqueOptions(options),
    },
  ];
};

const findTopLevelLists = (document: Document): HTMLDListElement[] =>
  Array.from(document.querySelectorAll('.page-content > dl'));

const dlistEntryToOptions = ({ dts, dd }: DListEntry): Option[] => {
  const dtTexts = dts
    .map((dt) => dt.textContent?.trim())
    .filter((text): text is string => typeof text === 'string');
  const title = normalizeSpacingAroundComma(mergeOptionTitles(dtTexts));
  const description = dd.textContent?.trim() ?? '';
  const optionStrings = transformOptionStrings(dtTexts, [
    trimOptionalElements,
    splitByComma,
    trimOptionArguments,
    trimAfterColons,
  ]);
  return makeOptionListForSingleDashStyle(optionStrings, title, description);
};
