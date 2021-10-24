import { URL } from 'url';

import { Command, Fetcher, Option, OptionStyle } from '../types';
import { getInnerText } from '../utils/dom';
import { fetchDocumentFromURL } from '../utils/forFetcher/http';
import { makeOptionList } from '../utils/forFetcher/optionString';
import { normalizeCommaDelimitedString } from '../utils/forFetcher/string';
import { isElement } from '../utils/typeGuards';

// Alternative sources:
// - https://github.com/docker/cli/blob/master/cli/command/container/attach.go#L60
// - https://github.com/docker/cli/blob/master/docs/reference/commandline/attach.md
// Markdown files in https://github.com/docker/cli/tree/master/man do not cover all the commands.

// BUG: Top-level options are not collected.

interface SubcommandLocation {
  command: string; // e.g. "docker attach"
  url: URL; // e.g. https://docs.docker.com/engine/reference/commandline/attach/
}

const OPTION_STYLE = OptionStyle.SHORT_AND_LONG;
const BASE_URL = 'https://docs.docker.com';

export const docker: Fetcher = {
  fetch: () => fetch(),
};

const fetch = async (): Promise<Command[]> => {
  const subcommandLocations = await fetchSubcommandLocations();
  const commands: Command[] = [];
  for (const subcommandLocation of subcommandLocations) {
    commands.push(await fetchSubcommand(subcommandLocation));
  }
  return commands;
};

const fetchSubcommandLocations = async (): Promise<SubcommandLocation[]> => {
  const url = new URL('/engine/reference/commandline/docker/', BASE_URL);
  return await fetchSubcommandLocationsRecursively({
    command: 'docker',
    url,
  });
};

const fetchSubcommandLocationsRecursively = async (
  parent: SubcommandLocation
): Promise<SubcommandLocation[]> => {
  const document = await fetchDocumentFromURL(parent.url);
  const table = findSubcommandTable(document);
  if (!table) {
    return [];
  }
  const tds = Array.from(table.querySelectorAll('td'));

  const subcommandLocations: SubcommandLocation[] = [];
  for (const td of tds) {
    const command = getInnerText(td).trim();
    if (!command.startsWith(`${parent.command} `)) {
      continue;
    }
    const anchor = td.querySelector('a');
    const href = anchor?.getAttribute('href');
    if (!href) {
      continue;
    }
    subcommandLocations.push({
      command,
      url: new URL(href, BASE_URL),
    });
  }

  const subcommandLocationsFromChildren: SubcommandLocation[] = [];
  for (const subcommandLocation of subcommandLocations) {
    const children = await fetchSubcommandLocationsRecursively(
      subcommandLocation
    );
    subcommandLocationsFromChildren.push(...children);
  }

  return subcommandLocations.concat(subcommandLocationsFromChildren);
};

const findSubcommandTable = (document: Document): Element | null => {
  const commandsHeading = document.querySelector('#child-commands');
  const nextSibling = commandsHeading?.nextElementSibling;
  return nextSibling && isElement(nextSibling, 'table') ? nextSibling : null;
};

const fetchSubcommand = async (
  location: SubcommandLocation
): Promise<Command> => {
  const document = await fetchDocumentFromURL(location.url);

  const options: Option[] = [];

  const table = findOptionTable(document);
  if (!table) {
    return {
      name: location.command,
      optionStyle: OPTION_STYLE,
      options: [],
    };
  }
  const trs = Array.from(table.querySelectorAll('tr'));
  for (const tr of trs) {
    const tds = Array.from(tr.querySelectorAll('td'));
    if (tds.length < 3) {
      continue;
    }

    const title = getInnerText(tds[0]);
    const description = tdToDescription(tds[2]);

    const labelElements = Array.from(tds[0].querySelectorAll('code'));
    const optionStrings = labelElements.map((element) =>
      getInnerText(element).trim()
    );

    options.push(
      ...makeOptionList(
        optionStrings,
        OPTION_STYLE,
        normalizeCommaDelimitedString(title),
        description
      )
    );
  }

  return {
    name: location.command,
    optionStyle: OPTION_STYLE,
    options,
  };
};

const findOptionTable = (document: Document): Element | null => {
  const optionHeading = document.querySelector('#options');
  const nextSibling = optionHeading?.nextElementSibling;
  return nextSibling && isElement(nextSibling, 'table') ? nextSibling : null;
};

const tdToDescription = (td: Element): string => {
  const children = Array.from(td.children);
  // Remove badges like "API 1.40+" or "Kubernetes"
  for (const child of children) {
    if (isBadge(child)) {
      child.remove();
    }
  }
  return getInnerText(td).trim();
};

const isBadge = (element: Element): boolean => {
  if (element.classList.contains('badge')) {
    return true;
  }
  if (element.querySelector('.badge')) {
    return true;
  }
  return false;
};
