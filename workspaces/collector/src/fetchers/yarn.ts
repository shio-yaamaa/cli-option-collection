import { URL } from 'url';

import { Command, Fetcher, Option, OptionStyle } from '../types';
import { findAnchorsWithPattern } from '../utils/forFetcher/dom';
import { fetchDocumentFromURL } from '../utils/forFetcher/http';
import { normalizeCommaDelimitedString } from '../utils/forFetcher/string';
import {
  splitByComma,
  transformOptionStrings,
  trimSpaceDelimitedArguments,
} from '../utils/forFetcher/transformOptionString';
import { makeOptionList } from '../utils/forFetcher/optionString';
import { getInnerText } from '../utils/dom';

// Yarn 2, not Yarn 1

// Alternative sources:
// - https://github.com/yarnpkg/berry/blob/master/packages/plugin-essentials/sources/commands/add.ts
// Could not find the repository that generates the Yarn 2 website.

export const yarn: Fetcher = {
  fetch: () => fetch(),
};

interface SubcommandLocation {
  commandName: string; // e.g. "yarn install"
  url: URL; // e.g. https://yarnpkg.com/cli/install
}

const OPTION_STYLE = OptionStyle.SHORT_AND_LONG;
const BASE_URL = 'https://yarnpkg.com';
const SUBCOMMAND_LINK_PATTERN = /^\/cli\//;
const SUBCOMMAND_TEXT_PATTERN = /^yarn\s/;

const fetch = async (): Promise<Command[]> => {
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
    commandName: getInnerText(anchor),
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
    const optionString = getInnerText(tds[0]);
    const description = getInnerText(tds[1]);
    const title = normalizeCommaDelimitedString(optionString);

    const optionStrings = transformOptionStrings(
      [optionString],
      [splitByComma, trimSpaceDelimitedArguments]
    );
    options.push(
      ...makeOptionList(optionStrings, OPTION_STYLE, title, description)
    );
  }

  return {
    name: location.commandName,
    optionStyle: OPTION_STYLE,
    options,
  };
};
