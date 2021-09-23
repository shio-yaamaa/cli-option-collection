import { URL } from 'url';
import { JSDOM } from 'jsdom';

import { FetchFunction, Command, OptionDictionary, Option } from '../types';
import { partitionShortAndLongOptionLabels } from '../utils/forFetcher/optionString';
import { adjustSpacingAroundComma } from '../utils/forFetcher/string';

// Alternative sources:
// - https://github.com/docker/cli/blob/master/cli/command/container/attach.go#L60
// - https://github.com/docker/cli/blob/master/docs/reference/commandline/attach.md
// Markdown files in https://github.com/docker/cli/tree/master/man do not cover all the commands.

interface SubcommandLocation {
  command: string; // e.g. "docker attach"
  url: URL; // e.g. https://docs.docker.com/engine/reference/commandline/attach/
}

const BASE_URL = 'https://docs.docker.com';

export const fetchDocker: FetchFunction = async (): Promise<Command[]> => {
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
  const { document } = (await JSDOM.fromURL(parent.url.toString())).window;
  const tds = Array.from(document.querySelectorAll('td'));

  const subcommandLocations: SubcommandLocation[] = [];
  for (const td of tds) {
    const command = td.textContent?.trim();
    if (!command) {
      continue;
    }
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

  for (const subcommandLocation of subcommandLocations) {
    const children = await fetchSubcommandLocationsRecursively(
      subcommandLocation
    );
    subcommandLocations.push(...children);
  }

  return subcommandLocations;
};

const fetchSubcommand = async (
  location: SubcommandLocation
): Promise<Command> => {
  const { document } = (await JSDOM.fromURL(location.url.toString())).window;

  const shortOptionDictionary: OptionDictionary = new Map();
  const longOptionDictionary: OptionDictionary = new Map();

  const trs = Array.from(document.querySelectorAll('tr'));
  for (const tr of trs) {
    const tds = Array.from(tr.querySelectorAll('td'));
    if (tds.length < 3) {
      continue;
    }

    const representation = tds[0].textContent;
    const description = tds[2].textContent;
    if (!representation || !description) {
      continue;
    }
    const option: Option = {
      representation: adjustSpacingAroundComma(representation),
      description,
    };

    const labelElements = Array.from(tds[0].querySelectorAll('code'));
    const labels = labelElements
      .map((element) => element.textContent?.trim())
      .filter((label): label is string => typeof label === 'string');

    const { shortOptionLabels, longOptionLabels } =
      partitionShortAndLongOptionLabels(labels);

    for (const shortOptionLabel of shortOptionLabels) {
      shortOptionDictionary.set(shortOptionLabel, option);
    }
    for (const longOptionLabel of longOptionLabels) {
      longOptionDictionary.set(longOptionLabel, option);
    }
  }

  return {
    command: location.command,
    shortOptionDictionary,
    longOptionDictionary,
  };
};
