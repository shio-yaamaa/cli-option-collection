import {
  downloadArchive,
  DOWNLOADS_DIRECTORY,
  fetchDocumentFromURL,
} from './utils/forFetcher/http';
import { findAnchorsWithPattern } from './utils/forFetcher/dom';
import { rmSync } from 'fs-extra';

const CURL_DOWNLOAD_URL = 'https://curl.se/download.html';
const GNU_COREUTILS_INDEX_URL = 'https://ftp.gnu.org/gnu/coreutils/';

export const prepare = async () => {
  rmSync(DOWNLOADS_DIRECTORY, { recursive: true, force: true });
  await prepareGNUCoreutils();
  await prepareCurl();
};

const prepareCurl = async () => {
  const document = await fetchDocumentFromURL(new URL(CURL_DOWNLOAD_URL));
  const downloadContainer = document.querySelector('.download');
  const anchors =
    downloadContainer &&
    findAnchorsWithPattern(downloadContainer, /\.tar\.xz/, null);
  if (!anchors || anchors.length === 0) {
    throw new Error('Cannot find download link of curl');
  }
  downloadArchive(new URL(anchors[0].href), '.tar.xz', 'curl');
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
  await downloadArchive(new URL(latest.href), '.tar.xz', 'gnu-coreutils');
};
