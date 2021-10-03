import { URL } from 'url';

import { FetchFunction, Command, Option } from '../types';
import {
  fetchDocumentFromURL,
  findAnchorsWithPattern,
} from '../utils/forFetcher/dom';
import { normalizeSpacingAroundComma } from '../utils/forFetcher/string';
import {
  splitByComma,
  transformOptionStrings,
  trimOptionArguments,
} from '../utils/forFetcher/transformOptionString';
import { distinguishOptionKeyType } from '../utils/forFetcher/optionString';

// Yarn 2, not Yarn 1

// Alternative sources:
// - https://github.com/yarnpkg/berry/blob/master/packages/plugin-essentials/sources/commands/add.ts
// Could not find the repository that generates the Yarn 2 website.

interface SubcommandLocation {
  commandName: string; // e.g. "yarn install"
  url: URL; // e.g. https://yarnpkg.com/cli/install
}

const BASE_URL = 'https://yarnpkg.com';
const SUBCOMMAND_LINK_PATTERN = /^\/cli\//;
const SUBCOMMAND_TEXT_PATTERN = /^yarn\s/;

export const fetchYarn: FetchFunction = async (): Promise<Command[]> => {
  const subcommandLocations = await fetchSubcommandLocations();
  const commands: Command[] = [];
  for (const subcommandLocation of subcommandLocations) {
    commands.push(await fetchSubcommand(subcommandLocation));
  }
  return commands;
};

const fetchSubcommandLocations = async (): Promise<SubcommandLocation[]> => {
  const url = new URL('/cli/install', BASE_URL); // /cli gets redirected to /cli/install anyway
  const document = await fetchDocumentFromURL(url);
  const anchors = findAnchorsWithPattern(
    document,
    SUBCOMMAND_LINK_PATTERN,
    SUBCOMMAND_TEXT_PATTERN
  );
  return anchors.map((anchor) => ({
    commandName: anchor.textContent!,
    url: new URL(anchor.getAttribute('href')!, BASE_URL),
  }));
};

const fetchSubcommand = async (
  location: SubcommandLocation
): Promise<Command> => {
  const document = await fetchDocumentFromURL(location.url);

  const options: Option[] = [];

  const trs = Array.from(document.querySelectorAll('tr'));
  for (const tr of trs) {
    const tds = Array.from(tr.querySelectorAll('td'));
    if (tds.length !== 2) {
      continue;
    }
    if (tds[0].querySelectorAll('code').length !== 1) {
      continue;
    }
    const optionString = tds[0].textContent;
    const description = tds[1].textContent;
    if (!optionString || !description) {
      continue;
    }
    const title = normalizeSpacingAroundComma(optionString);

    const optionStrings = transformOptionStrings(
      [optionString],
      [splitByComma, trimOptionArguments]
    );
    options.push(
      ...distinguishOptionKeyType(optionStrings).map(({ type, key }) => ({
        type,
        key,
        title,
        description,
      }))
    );
  }

  return {
    name: location.commandName,
    options,
  };
};
