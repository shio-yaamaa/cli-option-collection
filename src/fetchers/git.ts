import { URL } from 'url';

import { FetchFunction, Command, Option } from '../types';
import { getInnerText } from '../utils/dom';
import {
  findAnchorsWithPattern,
  findDListEntries,
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
  transformOptionStrings,
  trimNonDelimitedArguments,
  trimOptionalElements,
  trimEqualDelimitedArguments,
} from '../utils/forFetcher/transformOptionString';
import { mergeLists, uniqueBy } from '../utils/utils';

// Alternative sources:
// - https://github.com/git/git/blob/master/Documentation/git.txt

// BUG: Can't handle commands whose name is partially optional (e.g. --[no-]single-branch).
//      Currently, the contents of brackets are just ignored.
// BUG: git diff --cached and --staged are not fetched because they are not listed in the OPTIONS section.
// BUG: git diff --ours is not listed because it's in the same <dt> as its synonym.
// BUG: git svn provides "-, --stdin" option, but the first one is ignored because it has an empty option name.
// BUG: In git grep, `-<num>` is not listed properly.
// BUG: git p4 has sub-subcommands that take different set of options, but currently that is not considered.
//      (There might be other commands that have sub-subcommands, but I haven't found them.)

interface SubcommandLocation {
  command: string; // e.g. "git add"
  url: URL; // e.g. https://git-scm.com/docs/git-add
}

const BASE_URL = 'https://git-scm.com';
const SUBCOMMAND_LINK_PATTERN = /^\/docs\/git-.*/;
const SUBCOMMAND_LINK_TEXT_PATTERN = /^git-.*\[1\]$/;

export const git: FetchFunction = async (): Promise<Command[]> => {
  const commands: Command[] = [
    await fetchSubcommand({
      command: 'git',
      url: new URL('/docs/git', BASE_URL),
    }),
  ];

  const subcommandLocations = await fetchSubcommandLocations();
  for (const subcommandLocation of subcommandLocations) {
    commands.push(await fetchSubcommand(subcommandLocation));
  }
  return commands;
};

const fetchSubcommandLocations = async (): Promise<SubcommandLocation[]> => {
  const document = await fetchDocumentFromURL(new URL('/docs/git', BASE_URL));

  const anchors = findAnchorsWithPattern(
    document,
    SUBCOMMAND_LINK_PATTERN,
    SUBCOMMAND_LINK_TEXT_PATTERN
  );
  const locations = anchors.map((anchor) => ({
    command: subcommandLinkTextToCommandName(getInnerText(anchor)),
    url: new URL(anchor.href, BASE_URL),
  }));
  return uniqueBy(locations, (location) => location.url);
};

// Example: "git-cherry-pick[1]" -> "git cherry-pick"
const subcommandLinkTextToCommandName = (linkText: string): string => {
  const bracketsStripped = linkText.split('[')[0];
  return bracketsStripped.replace(/^git-/, 'git ');
};

const fetchSubcommand = async (
  location: SubcommandLocation
): Promise<Command> => {
  const document = await fetchDocumentFromURL(location.url);
  return {
    name: location.command,
    options: findOptions(document),
  };
};

const findOptions = (document: Document): Option[] => {
  // The ID for the options heading in "git config" page is different from other pages.
  const optionsHeading =
    document.querySelector('#_options') ?? document.querySelector('#OPTIONS');
  const section = optionsHeading?.nextElementSibling;
  if (!section) {
    return [];
  }
  const lists = Array.from(section.querySelectorAll('dl'));
  const dlistEntries = mergeLists(
    lists.map((list) => findDListEntries(list, false))
  );
  const options: Option[] = [];
  for (const { dts, dd } of dlistEntries) {
    const dtTexts = dts.map((dt) => getInnerText(dt).trim());
    const title = normalizeSpacingAroundComma(mergeOptionTitles(dtTexts));
    const description = getInnerText(dd).trim();
    const optionStrings = transformOptionStrings(dtTexts, [
      splitByComma,
      trimOptionalElements,
      trimEqualDelimitedArguments,
      trimNonDelimitedArguments,
    ]);
    options.push(...makeOptionList(optionStrings, title, description));
  }
  return uniqueOptions(options);
};
