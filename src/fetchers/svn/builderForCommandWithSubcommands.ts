import { Command, Fetcher, Option } from '../../types';
import { getInnerText } from '../../utils/dom';
import { findAnchorsWithPattern } from '../../utils/forFetcher/dom';
import { fetchDocumentFromURL } from '../../utils/forFetcher/http';
import { uniqueOptions } from '../../utils/forFetcher/options';
import { listToOptions, optionTitlesToOptions, OPTION_STYLE } from './common';
import { getLatestVersion } from './version';

interface Config {
  buildOptionListURL: (version: string) => URL;

  // If the command has a set of options that are available across all subcommands.
  hasGlobalOptions: boolean;
}

export const build = (commandName: string, config: Config): Fetcher => ({
  fetch: () =>
    fetch(commandName, config.buildOptionListURL, config.hasGlobalOptions),
});

interface SubcommandLocation {
  command: string; // e.g. svn delete (del, remove, rm)
  url: URL;
}

const fetch = async (
  commandName: string,
  buildOptionListURL: (version: string) => URL,
  hasGlobalOptions: boolean
): Promise<Command[]> => {
  const version = await getLatestVersion();
  if (!version) {
    return [];
  }

  const optionListURL = buildOptionListURL(version);
  const { globalOptions, localOptions } = await fetchAllOptions(
    optionListURL,
    hasGlobalOptions
  );
  const localOptionMap = new Map<string, Option>(
    localOptions.map((option) => [option.key, option])
  );
  const subcommandLocations = await fetchSubcommandLocations(
    commandName,
    version
  );

  const commands: Command[] = [];
  for (const subcommandLocation of subcommandLocations) {
    const subcommands = await fetchSubcommands(
      commandName,
      subcommandLocation,
      globalOptions,
      localOptionMap
    );
    commands.push(...subcommands);
  }
  return commands;
};

const fetchSubcommandLocations = async (
  commandName: string,
  version: string
): Promise<SubcommandLocation[]> => {
  const document = await fetchDocumentFromURL(
    new URL(`https://svnbook.red-bean.com/en/${version}/index.html`)
  );
  const subcommandAnchors = findAnchorsWithPattern(
    document,
    null,
    new RegExp(`^${commandName} [a-z]+( \([a-z-, ]\))?`) // e.g. svn delete (del, remove, rm)
  );
  return subcommandAnchors.map((anchor) => ({
    command: getInnerText(anchor),
    url: new URL(anchor.href),
  }));
};

// There can be multiple Commands from a single SubcommandLocation.
const fetchSubcommands = async (
  baseCommandName: string,
  subcommandLocation: SubcommandLocation,
  globalOptions: Option[],
  localOptionMap: Map<string, Option>
): Promise<Command[]> => {
  const commandNames = subcommandTextToSubcommandNames(
    baseCommandName,
    subcommandLocation.command
  );

  const availableLocalOptionKeys = await fetchAvailableLocalOptionKeys(
    subcommandLocation.url
  );
  const availableLocalOptions = availableLocalOptionKeys
    .map((key) => localOptionMap.get(key))
    .filter((maybeOption): maybeOption is Option => maybeOption !== undefined);
  const options = uniqueOptions([...globalOptions, ...availableLocalOptions]);

  return commandNames.map((commandName) => ({
    name: commandName,
    optionStyle: OPTION_STYLE,
    options: options,
  }));
};

// globalOptions: Options that are available with every subcommand
// localOptions: Options that are only available with subset of subcommands
const fetchAllOptions = async (
  url: URL,
  hasGlobalOptions: boolean
): Promise<{
  globalOptions: Option[];
  localOptions: Option[];
}> => {
  const document = await fetchDocumentFromURL(url);
  const [firstOptionList, secondOptionList] = Array.from(
    document.querySelectorAll<HTMLDListElement>('.sect2 > div > dl')
  );
  return hasGlobalOptions
    ? {
        globalOptions: listToOptions(firstOptionList),
        localOptions: listToOptions(secondOptionList),
      }
    : {
        globalOptions: [],
        localOptions: listToOptions(firstOptionList),
      };
};

const fetchAvailableLocalOptionKeys = async (url: URL): Promise<string[]> => {
  const document = await fetchDocumentFromURL(url);
  const optionsHeading = Array.from(document.querySelectorAll('h2')).find(
    (h2) => getInnerText(h2) === 'Options'
  );
  const optionSection = optionsHeading?.closest('div');
  if (!optionSection) {
    return [];
  }
  const optionTitles = Array.from(
    optionSection.querySelectorAll('code.option')
  ).map((element) => getInnerText(element));
  return optionTitlesToOptions(optionTitles, '', '').map(
    (option) => option.key
  );
};

// Example: "svn delete (del, remove, rm)" -> ["svn delete", "svn del", "svn remove", "svn rm"]
const SUBCOMMAND_WITH_ALIASES_PATTERN = /^(.*)\((.*)\)$/;
const subcommandTextToSubcommandNames = (
  baseCommandName: string,
  subcommandText: string
): string[] => {
  const match = subcommandText.match(SUBCOMMAND_WITH_ALIASES_PATTERN);

  if (!subcommandText.startsWith(baseCommandName)) {
    return [];
  }

  // When the subcommand does not have any aliases
  if (!match) {
    return [subcommandText];
  }

  const canonical = match[1]
    .replace(new RegExp(`^${baseCommandName} `), '')
    .trim();
  const aliases = match[2].split(',').map((item) => item.trim());

  return [canonical, ...aliases].map((item) => `${baseCommandName} ${item}`);
};
