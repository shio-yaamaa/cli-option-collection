import { Option, OptionStyle } from '../../types';
import { getInnerText } from '../../utils/dom';
import { DListEntry, findDListEntries } from '../../utils/forFetcher/dom';
import {
  makeOptionList,
  mergeOptionTitles,
} from '../../utils/forFetcher/optionString';
import {
  splitByComma,
  splitBySpace,
  stripTopLevelParentheses,
  transformOptionStrings,
  trimSpaceDelimitedArguments,
} from '../../utils/forFetcher/transformOptionString';
import { mergeLists } from '../../utils/utils';

export const OPTION_STYLE = OptionStyle.SHORT_AND_LONG;

export const listToOptions = (list: HTMLDListElement): Option[] => {
  const dlistEntries = findDListEntries(list);
  const options = mergeLists(
    dlistEntries.map((entry) => dlistEntryToOptions(entry))
  );
  return options;
};

const dlistEntryToOptions = ({ dts, dd }: DListEntry) => {
  const dtTexts = dts.map((dt) => getInnerText(dt));
  const title = mergeOptionTitles(dtTexts);
  const description = getInnerText(dd);
  return optionTitlesToOptions(dtTexts, title, description);
};

export const optionTitlesToOptions = (
  optionTitles: string[],
  title: string,
  description: string
): Option[] => {
  const optionStrings = transformOptionStrings(optionTitles, [
    splitByComma,
    stripTopLevelParentheses,
    splitBySpace,
    trimSpaceDelimitedArguments,
  ]);
  return makeOptionList(optionStrings, OPTION_STYLE, title, description);
};
