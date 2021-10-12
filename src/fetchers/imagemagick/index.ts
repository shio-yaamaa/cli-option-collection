import { Command } from '../../types';
import { build, Config } from './builder';
import { fetchDocumentFromURL } from '../../utils/forFetcher/http';
import { findAnchorsWithPattern } from '../../utils/forFetcher/dom';
import { uniqueBy } from '../../utils/utils';
import { getInnerText } from '../../utils/dom';

const BASE_URL = 'https://imagemagick.org/';
const COMMAND_LIST_PATH = '/script/command-line-tools.php';

export const imagemagick = {
  magick: {
    fetch: () => fetchMagick(),
  },
  magickScript: build('magick-script', {
    url: new URL('https://imagemagick.org/script/magick-script.php'),
  }),
};

const fetchMagick = async (): Promise<Command[]> => {
  const sources = await fetchSources();
  const fetchers = sources.map((source) =>
    build(source.commandName, source.config)
  );
  const commands: Command[] = [];
  for (const fetcher of fetchers) {
    commands.push(...(await fetcher.fetch()));
  }
  return commands;
};

const fetchSources = async (): Promise<
  {
    commandName: string;
    config: Config;
  }[]
> => {
  const document = await fetchDocumentFromURL(
    new URL(COMMAND_LIST_PATH, BASE_URL)
  );
  const sources: { commandName: string; config: Config }[] = [];
  const dlists = Array.from(document.querySelectorAll('dl'));
  for (const dlist of dlists) {
    const anchors = findAnchorsWithPattern(
      dlist,
      /^\/script\/\.\.\/script\/[A-Za-z0-9-]+\.php$/,
      /^magick(\s[A-Za-z0-9-]+)?$/
    );
    sources.push(
      ...anchors.map((anchor) => ({
        commandName: getInnerText(anchor).trim(),
        config: {
          url: new URL(anchor.href, BASE_URL),
        },
      }))
    );
  }
  return uniqueBy(sources, (source) => source.config.url.toString());
};
