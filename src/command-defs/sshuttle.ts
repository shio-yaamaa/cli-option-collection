import { FetchFunction, Command, Option, OptionType } from '../types';
import {
  DListEntry,
  fetchDocumentFromURL,
  findDListEntries,
} from '../utils/forFetcher/dom';
import { uniqueOptions } from '../utils/forFetcher/options';
import { makeOptionList } from '../utils/forFetcher/optionString';
import {
  splitByComma,
  transformOptionStrings,
  trimOptionArguments,
  trimOptionValues,
} from '../utils/forFetcher/transformOptionString';

const DOC_URL = 'https://sshuttle.readthedocs.io/en/stable/manpage.html';

export const fetchSshuttle: FetchFunction = async (): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(new URL(DOC_URL));
  const dlists = findDLists(document);
  const dlistEntries = ([] as DListEntry[]).concat(
    ...dlists.map((dlist) => findDListEntries(dlist))
  );
  const options = ([] as Option[]).concat(
    ...dlistEntries.map((dlistEntry) => dlistEntryToOptions(dlistEntry))
  );

  return [
    {
      name: 'sshuttle',
      options: uniqueOptions(options),
    },
  ];
};

const findDLists = (document: Document): HTMLDListElement[] => {
  return Array.from(document.querySelectorAll('#options > dl'));
};

const dlistEntryToOptions = ({ dts, dd }: DListEntry): Option[] => {
  if (dts.length === 0) {
    return [];
  }
  const title = dts[0].textContent?.trim().replace('¶', '') ?? '';
  const optionStrings = transformOptionStrings(
    [title],
    [splitByComma, trimOptionArguments, trimOptionValues]
  );
  return makeOptionList(optionStrings).map(({ type, key }) => ({
    type,
    key,
    title,
    description: dd.textContent?.trim() ?? '',
  }));
};
