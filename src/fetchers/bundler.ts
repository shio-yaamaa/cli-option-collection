import { Command, Option } from '../types';
import { getInnerText } from '../utils/dom';
import {
  DListEntry,
  findAnchorsWithPattern,
  findDListEntries,
  findElementsUnderHeading,
} from '../utils/forFetcher/dom';
import { fetchDocumentFromURL } from '../utils/forFetcher/http';
import { uniqueOptions } from '../utils/forFetcher/options';
import {
  makeOptionList,
  mergeOptionTitles,
} from '../utils/forFetcher/optionString';
import { normalizeSpacingAroundComma } from '../utils/forFetcher/string';
import {
  splitByComma,
  splitByCustomString,
  transformOptionStrings,
  trimEqualDelimitedArguments,
  trimOptionalElements,
} from '../utils/forFetcher/transformOptionString';
import { isElement } from '../utils/typeGuards';
import { mergeLists } from '../utils/utils';

export const bundler = {
  bundle: {
    fetch: () => fetchBundle(),
  },
};

interface SubcommandLocation {
  command: string; // e.g. "bundle install"
  url: URL; // e.g. https://bundler.io/man/bundle-install.1.html
}

const fetchBundle = async (): Promise<Command[]> => {
  const subcommandLocations = await fetchSubcommandLocations();

  const commands: Command[] = [];
  for (const subcommandLocation of subcommandLocations) {
    commands.push(await fetchSubcommand(subcommandLocation));
  }
  return commands;
};

const fetchSubcommandLocations = async (): Promise<SubcommandLocation[]> => {
  const document = await fetchDocumentFromURL(
    new URL('https://bundler.io/man/bundle.1.html')
  );
  const sidebar = document.querySelector('#sidebar-wrapper');
  if (!sidebar) {
    return [];
  }
  const anchors = findAnchorsWithPattern(
    sidebar,
    /\/bundle[A-Za-z0-9-_]*(\.\d+)?\.html$/,
    /^bundle/
  );
  return [
    ...anchors.map((anchor) => ({
      command: getInnerText(anchor)
        .replace(/\(\d+\)/, '')
        .trim(),
      url: new URL(anchor.href),
    })),
  ];
};

const fetchSubcommand = async ({
  command,
  url,
}: SubcommandLocation): Promise<Command> => {
  const document = await fetchDocumentFromURL(url);
  const optionsHeading = document.querySelector('#OPTIONS');
  if (!optionsHeading) {
    return {
      name: command,
      options: [],
    };
  }
  const dls = findElementsUnderHeading(optionsHeading, ['h1', 'h2'], 'dl');
  const dlistEntries: DListEntry[] = [];
  for (const dl of dls) {
    if (isElement(dl, 'dl')) {
      dlistEntries.push(...findDListEntries(dl));
    }
  }
  const options = mergeLists(
    dlistEntries.map((entry) => dlistEntryToOptions(entry))
  );

  return {
    name: command,
    options: uniqueOptions(options),
  };
};

const dlistEntryToOptions = ({ dts, dd }: DListEntry): Option[] => {
  const dtTexts = dts.map((dt) => getInnerText(dt));
  const title = normalizeSpacingAroundComma(mergeOptionTitles(dtTexts));
  const description = getInnerText(dd);
  const optionStrings = transformOptionStrings(dtTexts, [
    splitByComma,
    splitByCustomString(' or '),
    trimOptionalElements,
    trimEqualDelimitedArguments,
  ]);
  return makeOptionList(optionStrings, title, description);
};
