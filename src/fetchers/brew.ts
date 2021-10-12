import { Command, Option, Fetcher } from '../types';
import { getInnerText } from '../utils/dom';
import { findDListEntries } from '../utils/forFetcher/dom';
import { fetchDocumentFromManPageURL } from '../utils/forFetcher/http';
import { uniqueOptions } from '../utils/forFetcher/options';
import {
  makeOptionList,
  mergeOptionTitles,
} from '../utils/forFetcher/optionString';
import {
  splitByComma,
  transformOptionStrings,
  trimOptionalElements,
} from '../utils/forFetcher/transformOptionString';
import { isElement } from '../utils/typeGuards';
import { mergeLists } from '../utils/utils';

// Alternative sources:
// - https://docs.brew.sh/Manpage
// - https://github.com/Homebrew/brew/blob/master/docs/Manpage.md

// NOTE: Sub-subcommands are ignored.
//       For example, "brew autoupdate start" and "brew autoupdate stop"
//       are merged into a single subcommand, "brew autoupdate".
// BUG: Top-level options (e.g. "--env", "--version") are ignored.

const DOC_URL =
  'https://raw.githubusercontent.com/Homebrew/brew/master/manpages/brew.1';
const SUBCOMMAND_PATTERN = /^[A-Za-z][A-Za-z0-9-]*$/;

export const brew: Fetcher = {
  fetch: () => fetch(),
};

const fetch = async () => {
  const url = new URL(DOC_URL);
  const document = await fetchDocumentFromManPageURL(url);
  const commandSections = findCommandSections(document);
  return mergeLists(
    commandSections.map((section) => commandSectionToCommands(section))
  );
};

const findCommandSections = (document: Document): Element[] => {
  // Collect command sections under these headings.
  const headingIds = [
    'COMMANDS',
    'DEVELOPER_COMMANDS',
    'OFFICIAL_EXTERNAL_COMMANDS',
  ];

  const commandSections: Element[] = [];
  for (const headingId of headingIds) {
    const heading = document.querySelector(`#${headingId}`);
    const parentSection = heading?.parentElement;
    if (!parentSection) {
      continue;
    }
    const childSections = Array.from(parentSection.children).filter((child) =>
      isElement(child, 'section')
    );
    commandSections.push(...childSections);
  }

  return commandSections;
};

const commandSectionToCommands = (commandSection: Element): Command[] => {
  const heading = commandSection.firstElementChild;
  if (!heading) {
    return [];
  }
  const headingText = getInnerText(heading);
  if (!headingText) {
    return [];
  }
  const commandNames = headingToCommandNames(headingText);
  if (commandNames.length === 0) {
    return [];
  }

  const optionLists = Array.from(commandSection.querySelectorAll('dl'));
  const options = uniqueOptions(
    mergeLists(optionLists.map((list) => optionListToOptions(list)))
  );

  const commands: Command[] = [];
  for (const commandName of commandNames) {
    commands.push({
      name: commandName,
      options,
    });
  }
  return commands;
};

const headingToCommandNames = (heading: string): string[] => {
  let currentHeading = heading;
  const firstArguments: string[] = [];
  while (currentHeading.length > 0) {
    const nextCommaIndex = currentHeading.indexOf(',');
    const nextSpaceIndex = currentHeading.indexOf(' ');
    // The next delimiter is a comma.
    if (
      nextCommaIndex >= 0 &&
      (nextSpaceIndex === -1 || nextCommaIndex < nextSpaceIndex)
    ) {
      firstArguments.push(currentHeading.slice(0, nextCommaIndex).trim());
      // There can be more first arguments.
      currentHeading = currentHeading.slice(nextCommaIndex + 1).trimStart();
      continue;
    }
    // The next delimiter is a space.
    if (
      nextSpaceIndex >= 0 &&
      (nextCommaIndex === -1 || nextSpaceIndex < nextCommaIndex)
    ) {
      firstArguments.push(currentHeading.slice(0, nextSpaceIndex).trim());
      // There are no more first arguments.
      break;
    }
    // There are no more delimiters.
    firstArguments.push(currentHeading.trim());
    break;
  }
  const subcommands = firstArguments.filter((argument) =>
    SUBCOMMAND_PATTERN.test(argument)
  );
  return subcommands.map((subcommand) => `brew ${subcommand}`);
};

const optionListToOptions = (dlist: HTMLDListElement): Option[] => {
  const dlistEntries = findDListEntries(dlist);
  const options: Option[] = [];
  for (const { dts, dd } of dlistEntries) {
    const dtTexts = dts.map((dt) => getInnerText(dt));
    const title = mergeOptionTitles(dtTexts);
    const description = getInnerText(dd).trim().replace(/´/g, "'");
    const optionStrings = transformOptionStrings(dtTexts, [
      splitByComma,
      trimOptionalElements,
    ]);
    options.push(...makeOptionList(optionStrings, title, description));
  }
  return options;
};
