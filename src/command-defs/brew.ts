import { FetchFunction, Command, Option } from '../types';
import { fetchDocumentFromURL } from '../utils/forFetcher/http';
import {
  makeOptionList,
  mergeOptionTitles,
} from '../utils/forFetcher/optionString';
import {
  transformOptionStrings,
  trimOptionalElements,
} from '../utils/forFetcher/transformOptionString';
import {
  findHeadingContentsPairs,
  HeadingContentsPair,
} from '../utils/forFetcher/utils';
import { mergeLists } from '../utils/utils';

// Alternative sources:
// - https://github.com/Homebrew/brew/blob/master/docs/Manpage.md
// - https://github.com/Homebrew/brew/blob/master/manpages/brew.1

// NOTE: Sub-subcommands are ignored.
//       For example, "brew autoupdate start" and "brew autoupdate stop"
//       are merged into a single subcommand, "brew autoupdate".
// BUG: Top-level options (e.g. "--env", "--version") are ignored.

const DOC_URL = 'https://docs.brew.sh/Manpage';
const SUBCOMMAND_PATTERN = /^[A-Za-z][A-Za-z0-9-]*$/;

export const fetchBrew: FetchFunction = async (): Promise<Command[]> => {
  const url = new URL(DOC_URL);
  const document = await fetchDocumentFromURL(url);
  const h3ContentsPairs = findH3ContentsPairs(document);

  const commands: Command[] = [];
  for (const h3ContentsPair of h3ContentsPairs) {
    const commandNames = h3ToCommandNames(h3ContentsPair.heading);
    if (commandNames.length === 0) {
      continue;
    }
    const lists = h3ContentsPair.contents.filter(
      (content): content is HTMLUListElement =>
        content.tagName.toLowerCase() === 'ul'
    );
    commands.push(
      ...commandNames.map((commandName) => ({
        name: commandName,
        options: mergeLists(lists.map((list) => listToOptions(list))),
      }))
    );
  }
  return commands;
};

const findH3ContentsPairs = (
  document: Document
): HeadingContentsPair<Element>[] => {
  // Collect HeadingContentsPair[] under these headings
  const h2Ids = [
    'commands',
    'developer-commands',
    'official-external-commands',
  ];

  const page = document.querySelector('#page');
  if (!page) {
    return [];
  }
  const h2ContentsPairs = findHeadingContentsPairs(
    Array.from(page.children),
    (element) => element.tagName.toLowerCase() === 'h2',
    (element) => element.tagName.toLowerCase() !== 'h1'
  ).filter((pair) => h2Ids.some((id) => id === pair.heading.id));

  const h3ContentsPairs: HeadingContentsPair<Element>[] = [];

  for (const h2ContentsPair of h2ContentsPairs) {
    h3ContentsPairs.push(
      ...findHeadingContentsPairs(
        h2ContentsPair.contents,
        (element) => element.tagName.toLowerCase() === 'h3'
      )
    );
  }

  return h3ContentsPairs;
};

const h3ToCommandNames = (h3: Element): string[] => {
  const subcommands: string[] = [];
  for (const element of Array.from(h3.children)) {
    const previousNode = element.previousSibling;
    if (element.tagName.toLowerCase() === 'code') {
      if (previousNode === null || previousNode.textContent?.trim() === ',') {
        const subcommand = element.textContent?.trim();
        const matchesPattern =
          subcommand && SUBCOMMAND_PATTERN.test(subcommand);
        if (matchesPattern) {
          subcommands.push(subcommand);
        }
        continue;
      }
    }
    break;
  }
  return subcommands.map((subcommand) => `brew ${subcommand}`);
};

const listToOptions = (list: HTMLUListElement): Option[] => {
  const lis = Array.from(list.children).filter(
    (child): child is HTMLLIElement => child.tagName.toLowerCase() === 'li'
  );
  return mergeLists(lis.map((li) => listItemToOptions(li)));
};

const listItemToOptions = (listItem: HTMLLIElement): Option[] => {
  const liTextContent = listItem.textContent;
  if (!liTextContent) {
    return [];
  }
  const splitByColon = liTextContent.split(':');
  if (splitByColon.length < 2) {
    return [];
  }
  const description = splitByColon.slice(1).join(':').trim();

  const optionStrings: string[] = [];
  for (const element of Array.from(listItem.children)) {
    const previousNode = element.previousSibling;
    if (element.tagName.toLowerCase() === 'code') {
      if (previousNode === null || previousNode.textContent?.trim() === ',') {
        const textContent = element.textContent;
        if (textContent) {
          optionStrings.push(textContent);
        }
      } else {
        break;
      }
    }
  }
  const title = mergeOptionTitles(optionStrings);

  const transformedOptionStrings = transformOptionStrings(optionStrings, [
    trimOptionalElements,
  ]);
  return makeOptionList(transformedOptionStrings, title, description);
};
