import { URL } from 'url';

import { Command, Option, Fetcher, OptionStyle } from '../types';
import { getInnerText } from '../utils/dom';
import { findAnchorsWithPattern } from '../utils/forFetcher/dom';
import { fetchDocumentFromURL } from '../utils/forFetcher/http';
import { uniqueOptions } from '../utils/forFetcher/options';
import { makeOptionList } from '../utils/forFetcher/optionString';
import {
  transformOptionStrings,
  trimSpaceDelimitedArguments,
  trimEqualDelimitedArguments,
} from '../utils/forFetcher/transformOptionString';
import { isElement } from '../utils/typeGuards';
import { mergeLists } from '../utils/utils';

// Alternative sources:
// - https://github.com/hashicorp/terraform/blob/main/website/docs/cli/commands/apply.html.md
// - https://github.com/hashicorp/terraform/blob/main/internal/command/apply.go#L333

// BUG: Global options are listed in the page below, but these are not collected.
//      https://github.com/hashicorp/terraform/blob/5b07bb70401093a9ddbb3f2ebc3e2598ec9642d7/website/docs/cli/commands/index.html.md

export const terraform: Fetcher = {
  fetch: () => fetch(),
};

interface SubcommandLocation {
  command: string; // e.g. "terraform apply"
  url: URL; // e.g. https://www.terraform.io/docs/cli/commands/apply.html
}

const OPTION_STYLE = OptionStyle.SINGLE_DASH;
const BASE_URL = 'https://www.terraform.io/';

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

const fetchSubcommandLocations = async (): Promise<SubcommandLocation[]> => {
  const document = await fetchDocumentFromURL(
    new URL('/docs/cli/index.html', BASE_URL)
  );
  const commandsHeading = Array.from(document.querySelectorAll('a')).find(
    (a) => getInnerText(a) === 'Alphabetical List of Commands'
  );
  if (!commandsHeading) {
    return [];
  }
  const commandList = commandsHeading.nextElementSibling;
  if (!(commandList && isElement(commandList, 'ul'))) {
    return [];
  }
  const anchors = findAnchorsWithPattern(
    commandList,
    /^\/docs\/cli\/commands\/[^\s]+\.html/,
    null
  );
  return anchors.map((anchor) => ({
    command: `terraform ${getInnerText(anchor).trim()}`,
    url: new URL(anchor.href, BASE_URL),
  }));
};

const fetchSubcommand = async (
  location: SubcommandLocation
): Promise<Command | null> => {
  const document = await fetchDocumentFromURL(location.url);
  const lis = Array.from(document.querySelectorAll('#inner > ul > li'));
  const options = mergeLists(lis.map((li) => listItemToOptions(li)));

  return {
    name: location.command,
    optionStyle: OPTION_STYLE,
    options: uniqueOptions(options),
  };
};

const DESCRIPTION_WITH_DELIMITER_PATTERN = /^\s+[-—]\s+([^]+)$/;
const DESCRIPTION_WITHOUT_DELIMITER_PATTERN = /^\s+([^]+)$/;
const listItemToOptions = (listItem: Element): Option[] => {
  const liText = getInnerText(listItem).trim();
  const titleElement = listItem.querySelector('code');
  if (!titleElement) {
    return [];
  }
  const title = getInnerText(titleElement);
  if (!liText.startsWith(title)) {
    return [];
  }
  const remainingText = liText.slice(title.length);
  const descriptionMatch =
    remainingText.match(DESCRIPTION_WITH_DELIMITER_PATTERN) ??
    remainingText.match(DESCRIPTION_WITHOUT_DELIMITER_PATTERN);
  if (!descriptionMatch) {
    return [];
  }
  const description = descriptionMatch[1].trim();
  const optionStrings = transformOptionStrings(
    [title],
    [trimSpaceDelimitedArguments, trimEqualDelimitedArguments]
  );
  return makeOptionList(optionStrings, OPTION_STYLE, title, description);
};
