import { FetchFunction, Command, Option, OptionType } from '../types';
import { DListEntry, findDListEntries } from '../utils/forFetcher/dom';
import { fetchDocumentFromURL } from '../utils/forFetcher/http';
import { uniqueOptions } from '../utils/forFetcher/options';
import { makeOptionList } from '../utils/forFetcher/optionString';
import {
  splitByComma,
  transformOptionStrings,
  trimOptionArguments,
  trimOptionValues,
} from '../utils/forFetcher/transformOptionString';
import { mergeLists } from '../utils/utils';

// Alternative sources:
// - https://github.com/sshuttle/sshuttle/blob/bd00a530dde4ec71aa5bc08984e33241b8b7eaa4/sshuttle/options.py#L188

const DOC_URL = 'https://sshuttle.readthedocs.io/en/stable/manpage.html';

export const fetchSshuttle: FetchFunction = async (): Promise<Command[]> => {
  const document = await fetchDocumentFromURL(new URL(DOC_URL));
  const dlists = findDLists(document);
  const dlistEntries = mergeLists(
    dlists.map((dlist) => findDListEntries(dlist))
  );
  const options = mergeLists(
    dlistEntries.map((dlistEntry) => dlistEntryToOptions(dlistEntry))
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
  const description = dd.textContent?.trim() ?? '';
  const optionStrings = transformOptionStrings(
    [title],
    [splitByComma, trimOptionArguments, trimOptionValues]
  );
  return makeOptionList(optionStrings, title, description);
};