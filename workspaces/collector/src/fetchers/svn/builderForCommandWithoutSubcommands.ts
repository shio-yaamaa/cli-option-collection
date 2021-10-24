import { Command, Fetcher, Option } from '../../types';
import { fetchDocumentFromURL } from '../../utils/forFetcher/http';
import { uniqueOptions } from '../../utils/forFetcher/options';
import { mergeLists } from '../../utils/utils';
import { listToOptions, OPTION_STYLE } from './common';
import { getLatestVersion } from './version';

interface Config {
  buildOptionListURL: (version: string) => URL;
}

export const build = (commandName: string, config: Config): Fetcher => ({
  fetch: () => fetch(commandName, config.buildOptionListURL),
});

const fetch = async (
  commandName: string,
  buildOptionListURL: (version: string) => URL
): Promise<Command[]> => {
  const version = await getLatestVersion();
  if (!version) {
    return [];
  }

  const optionListURL = buildOptionListURL(version);
  const options = await fetchOptions(optionListURL);

  return [
    {
      name: commandName,
      optionStyle: OPTION_STYLE,
      options: uniqueOptions(options),
    },
  ];
};

const fetchOptions = async (url: URL): Promise<Option[]> => {
  const document = await fetchDocumentFromURL(url);
  const lists = Array.from(document.querySelectorAll('dl'));
  const topLevelLists = lists.filter(
    (list) => !list.parentElement?.closest('dl')
  );
  return mergeLists(topLevelLists.map((list) => listToOptions(list)));
};
