import { Fetcher, Command, Option } from '../../types';
import { getInnerText } from '../../utils/dom';
import { DListEntry, findDListEntries } from '../../utils/forFetcher/dom';
import { fetchDocumentFromURL } from '../../utils/forFetcher/http';
import { uniqueOptions } from '../../utils/forFetcher/options';
import {
  makeOptionListForSingleDashStyle,
  mergeOptionTitles,
} from '../../utils/forFetcher/optionString';
import { normalizeSpacingAroundComma } from '../../utils/forFetcher/string';
import {
  splitByComma,
  transformOptionStrings,
  trimAfterColons,
  trimOptionalElements,
  trimSpaceDelimitedArguments,
} from '../../utils/forFetcher/transformOptionString';
import { mergeLists } from '../../utils/utils';

// BUG: "no" prefix is not considered.
// NOTE: ffmpeg uses single dash for both single-letter and multiple-letter options,
//       but this fetcher distinguishes these two types anyway.

export interface SourceDef {
  commandName: string;
}

export const fetch: Fetcher<SourceDef> = async (
  sourceDef: SourceDef
): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(
    new URL(`https://www.ffmpeg.org/${sourceDef.commandName}.html`)
  );
  const dlists = findTopLevelLists(document);
  const dlistEntries = mergeLists(dlists.map((dl) => findDListEntries(dl)));
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

const findTopLevelLists = (document: Document): HTMLDListElement[] =>
  Array.from(document.querySelectorAll('.page-content > dl'));

const dlistEntryToOptions = ({ dts, dd }: DListEntry): Option[] => {
  const dtTexts = dts.map((dt) => getInnerText(dt).trim());
  const title = normalizeSpacingAroundComma(mergeOptionTitles(dtTexts));
  const description = getInnerText(dd).trim();
  const optionStrings = transformOptionStrings(dtTexts, [
    trimOptionalElements,
    splitByComma,
    trimSpaceDelimitedArguments,
    trimAfterColons,
  ]);
  return makeOptionListForSingleDashStyle(optionStrings, title, description);
};
