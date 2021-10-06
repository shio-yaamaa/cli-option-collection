import { URL } from 'url';

import { FetchFunction, Command, Option } from '../types';
import {
  fetchDocumentFromURL,
  findAnchorsWithPattern,
} from '../utils/forFetcher/dom';
import { uniqueOptions } from '../utils/forFetcher/options';
import { makeOptionListForSingleDashStyle } from '../utils/forFetcher/optionString';
import {
  transformOptionStrings,
  trimOptionArguments,
  trimOptionValues,
} from '../utils/forFetcher/transformOptionString';

// Alternative sources:
// - https://github.com/hashicorp/terraform/blob/main/website/docs/cli/commands/apply.html.md
// - https://github.com/hashicorp/terraform/blob/main/internal/command/apply.go#L333

interface SubcommandLocation {
  command: string; // e.g. "terraform apply"
  url: URL; // e.g. https://www.terraform.io/docs/cli/commands/apply.html
}

const BASE_URL = 'https://www.terraform.io/';

export const fetchTerraform: FetchFunction = async (): Promise<Command[]> => {
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
    (a) => a.textContent === 'Alphabetical List of Commands'
  );
  if (!commandsHeading) {
    return [];
  }
  const commandList = commandsHeading.nextElementSibling;
  if (commandList?.tagName.toLowerCase() !== 'ul') {
    return [];
  }
  const anchors = findAnchorsWithPattern(
    commandList,
    /^\/docs\/cli\/commands\/[^\s]+\.html/,
    null
  );
  return anchors
    .filter((anchor) => anchor.textContent)
    .map((anchor) => ({
      command: `terraform ${anchor.textContent!.trim()}`,
      url: new URL(anchor.href, BASE_URL),
    }));
};

const fetchSubcommand = async (
  location: SubcommandLocation
): Promise<Command | null> => {
  const document = await fetchDocumentFromURL(location.url);
  const lis = Array.from(document.querySelectorAll('#inner > ul > li'));
  const options = ([] as Option[]).concat(
    ...lis.map((li) => listItemToOptions(li))
  );

  return {
    name: location.command,
    options: uniqueOptions(options),
  };
};

const DESCRIPTION_WITH_DELIMITER_PATTERN = /^\s+[-—]\s+([^]+)$/;
const DESCRIPTION_WITHOUT_DELIMITER_PATTERN = /^\s+([^]+)$/;
const listItemToOptions = (listItem: Element): Option[] => {
  const liText = listItem.textContent?.trim();
  if (!liText) {
    return [];
  }
  const title = listItem.querySelector('code')?.textContent?.trim();
  if (!title) {
    return [];
  }
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
    [trimOptionArguments, trimOptionValues]
  );
  return [
    {
      ...makeOptionListForSingleDashStyle(optionStrings)[0],
      title,
      description,
    },
  ];
};
