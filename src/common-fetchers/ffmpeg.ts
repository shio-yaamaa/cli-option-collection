import { Fetcher, Command, Option, OptionType } from '../types';
import {
  DListEntry,
  fetchDocumentFromURL,
  findDListEntries,
} from '../utils/forFetcher/dom';
import { uniqueOptions } from '../utils/forFetcher/options';
import { mergeOptionTitles } from '../utils/forFetcher/optionString';
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

const FLAG_PATTERN = /^-[A-Za-z0-9][A-Za-z0-9-]*/;

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
  const title = normalizeSpacingAroundComma(mergeOptionTitles(dts));
  const optionStrings = transformOptionStrings(dts, [
    trimOptionalElements,
    splitByComma,
    trimOptionArguments,
    trimAfterColons,
  ]);
  return [...new Set(optionStrings)]
    .filter((optionString) => FLAG_PATTERN.test(optionString))
    .map((optionString) => {
      const key = optionString.slice(1);
      return {
        type: key.length === 1 ? OptionType.SHORT : OptionType.LONG,
        key,
        title,
        description: dd,
      };
    });
};
