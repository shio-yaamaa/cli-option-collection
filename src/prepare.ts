import path from 'path';
import decompress from 'decompress';

import {
  download,
  DOWNLOADS_DIRECTORY,
  fetchDocumentFromURL,
} from './utils/forFetcher/http';

const decompressTarxz = require('decompress-tarxz');

const GNU_COREUTILS_INDEX_URL = 'https://ftp.gnu.org/gnu/coreutils/';

export const prepare = async () => {
  await prepareGNUCoreutils();
};

const prepareGNUCoreutils = async () => {
  const document = await fetchDocumentFromURL(new URL(GNU_COREUTILS_INDEX_URL));
  const anchors = Array.from(document.querySelectorAll('a'));
  const versions: { href: string; major: number; minor: number }[] = [];
  for (const anchor of anchors) {
    const match = anchor.href.match(/coreutils-(\d+)\.(\d+)\.tar\.xz$/);
    if (match) {
      versions.push({
        href: anchor.href,
        major: parseInt(match[1]),
        minor: parseInt(match[2]),
      });
    }
  }
  versions.sort((a, b) => a.major - b.major || a.minor - b.minor).reverse();
  const latest = versions[0];
  if (!latest) {
    throw new Error('No version available for GNU CoreUtils');
  }
  const filename = (() => {
    const split = latest.href.split('/');
    return split[split.length - 1];
  })();

  await download(new URL(latest.href), filename);
  await decompress(
    path.resolve(process.cwd(), DOWNLOADS_DIRECTORY, filename),
    DOWNLOADS_DIRECTORY,
    {
      plugins: [decompressTarxz()],
    }
  );
};
