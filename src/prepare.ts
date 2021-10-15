import path from 'path';
import decompress from 'decompress';
import { rmSync, moveSync } from 'fs-extra';

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

// Download and decompress the latest GNU coreutils from https://ftp.gnu.org/gnu/coreutils/
// The directory name is downloads/gnu-coreutils
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
  const archivePath = path.resolve(DOWNLOADS_DIRECTORY, filename);
  await decompress(archivePath, DOWNLOADS_DIRECTORY, {
    plugins: [decompressTarxz()],
  });
  rmSync(archivePath);
  moveSync(
    path.resolve(DOWNLOADS_DIRECTORY, filename.replace(/\.tar\.xz$/, '')),
    path.resolve(DOWNLOADS_DIRECTORY, 'gnu-coreutils')
  );
};
