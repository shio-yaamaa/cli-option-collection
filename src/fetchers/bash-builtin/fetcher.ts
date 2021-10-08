import { Fetcher, Command, Option } from '../../types';
import { DListEntry, findDListEntries } from '../../utils/forFetcher/dom';
import { fetchDocumentFromURL } from '../../utils/forFetcher/http';
import { uniqueOptions } from '../../utils/forFetcher/options';
import { makeOptionList } from '../../utils/forFetcher/optionString';
import {
  transformOptionStrings,
  trimOptionArguments,
} from '../../utils/forFetcher/transformOptionString';
import { mergeLists } from '../../utils/utils';

const DOC_URL =
  'https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html';

export interface SourceDef {
  commandName: string;
}

let promise: Promise<Map<string, Element>> | null = null;

const getCommandNameToCommandBody = async (): Promise<Map<string, Element>> => {
  promise ||= fetchDocumentFromURL(new URL(DOC_URL)).then((document) => {
    const map = new Map<string, Element>();
    const commandList = document.querySelector<HTMLDListElement>('body > dl');
    if (!commandList) {
      return map;
    }
    const dlistEntries = findDListEntries(commandList);
    for (const { dts, dd } of dlistEntries) {
      const commandName = dts[0].textContent?.trim();
      if (commandName) {
        map.set(commandName, dd);
      }
    }
    return map;
  });
  return promise;
};

const commandNameToCommandBody = async (
  commandName: string
): Promise<Element | null> => {
  return (await getCommandNameToCommandBody()).get(commandName) ?? null;
};

export const fetch: Fetcher<SourceDef> = async (
  sourceDef: SourceDef
): Promise<Command[]> => {
  const commandBody = await commandNameToCommandBody(sourceDef.commandName);
  if (!commandBody) {
    return [];
  }
  const options = commandBodyToOptions(commandBody);

  return [
    {
      name: sourceDef.commandName,
      options: uniqueOptions(options),
    },
  ];
};

const commandBodyToOptions = (body: Element): Option[] => {
  const dls = Array.from(body.children).filter(
    (child): child is HTMLDListElement => child.tagName.toLowerCase() === 'dl'
  );
  const dlistEntries = mergeLists(dls.map((dl) => findDListEntries(dl)));
  return mergeLists(dlistEntries.map((entry) => dlistEntryToOptions(entry)));
};

const dlistEntryToOptions = (dlistEntry: DListEntry): Option[] => {
  const title = dlistEntry.dts[0].textContent?.trim();
  if (!title) {
    return [];
  }
  const optionStrings = transformOptionStrings([title], [trimOptionArguments]);
  return makeOptionList(
    optionStrings,
    title,
    dlistEntry.dd.textContent?.trim() ?? ''
  );
};
