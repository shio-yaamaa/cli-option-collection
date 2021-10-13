import { Command, Fetcher, Option } from '../types';
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
import {
  transformOptionStrings,
  trimOptionalElements,
  trimSpaceDelimitedArguments,
} from '../utils/forFetcher/transformOptionString';
import { mergeLists } from '../utils/utils';

export const cargo: Fetcher = {
  fetch: () => fetch(),
};

const fetch = async (): Promise<Command[]> => {
  const subcommandLocations = await fetchSubcommandLocations();
  const commands: Command[] = [];
  for (const subcommandLocation of subcommandLocations) {
    const subcommand = await fetchSubcommand(subcommandLocation);
    if (subcommand) {
      commands.push(subcommand);
    }
  }
  return commands;
};

interface SubcommandLocation {
  command: string; // e.g. "cargo build"
  url: URL; // e.g. https://doc.rust-lang.org/cargo/commands/cargo-build.html
}

const fetchSubcommandLocations = async (): Promise<SubcommandLocation[]> => {
  const commandCategoryAnchors = await getAnchorsInPageContent(
    new URL('https://doc.rust-lang.org/stable/cargo/commands/index.html'),
    null,
    /[^\s]/
  );

  const subcommandLocations: SubcommandLocation[] = [];
  for (const commandCategoryAnchor of commandCategoryAnchors) {
    const subcommandAnchors = await getAnchorsInPageContent(
      new URL(commandCategoryAnchor.href),
      null,
      /^cargo(\s.*)?$/
    );
    subcommandLocations.push(
      ...subcommandAnchors.map((anchor) => ({
        command: getInnerText(anchor).trim(),
        url: new URL(anchor.href),
      }))
    );
  }
  return subcommandLocations;
};

const getAnchorsInPageContent = async (
  url: URL,
  hrefPattern: RegExp | null,
  textPattern: RegExp | null
): Promise<HTMLAnchorElement[]> => {
  const document = await fetchDocumentFromURL(url);
  const content = document.querySelector('#content');
  if (!content) {
    return [];
  }
  return findAnchorsWithPattern(content, hrefPattern, textPattern);
};

const fetchSubcommand = async ({
  command,
  url,
}: SubcommandLocation): Promise<Command> => {
  const document = await fetchDocumentFromURL(url);
  const optionsHeading = document.querySelector('#options');
  if (!optionsHeading) {
    return {
      name: command,
      options: [],
    };
  }
  const dls = findElementsUnderHeading(
    optionsHeading,
    ['h1', 'h2'],
    'dl'
  ) as HTMLDListElement[];
  const dlistEntries = mergeLists(dls.map((dl) => findDListEntries(dl)));
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
  const title = mergeOptionTitles(dtTexts);
  const description = getInnerText(dd);
  const optionStrings = transformOptionStrings(dtTexts, [
    trimOptionalElements,
    trimSpaceDelimitedArguments,
  ]);
  return makeOptionList(optionStrings, title, description);
};
