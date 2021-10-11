import { FetchFunction, Command } from '../../types';
import { SourceDef, fetch } from './fetcher';
import { fetchDocumentFromURL } from '../../utils/forFetcher/http';
import { findAnchorsWithPattern } from '../../utils/forFetcher/dom';
import { uniqueBy } from '../../utils/utils';
import { getInnerText } from '../../utils/dom';

const BASE_URL = 'https://imagemagick.org/';
const COMMAND_LIST_PATH = '/script/command-line-tools.php';

export const fetchMagick: FetchFunction = async (): Promise<Command[]> => {
  const sourceDefs = await fetchSourceDefs();
  const commands: Command[] = [];
  for (const sourceDef of sourceDefs) {
    commands.push(...(await fetch(sourceDef)));
  }
  return commands;
};

const fetchSourceDefs = async (): Promise<SourceDef[]> => {
  const document = await fetchDocumentFromURL(
    new URL(COMMAND_LIST_PATH, BASE_URL)
  );
  const sourceDefs: SourceDef[] = [];
  const dlists = Array.from(document.querySelectorAll('dl'));
  for (const dlist of dlists) {
    const anchors = findAnchorsWithPattern(
      dlist,
      /^\/script\/\.\.\/script\/[A-Za-z0-9-]+\.php$/,
      /^magick(\s[A-Za-z0-9-]+)?$/
    );
    sourceDefs.push(
      ...anchors.map((anchor) => ({
        commandName: getInnerText(anchor).trim(),
        url: new URL(anchor.href, BASE_URL),
      }))
    );
  }
  return uniqueBy(sourceDefs, (sourceDef) => sourceDef.url.toString());
};

export const fetchMagickScript: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'magick-script',
    url: new URL('https://imagemagick.org/script/magick-script.php'),
  });
