import {
  downloadArchive,
  fetchDocumentFromURL,
} from '../../utils/forFetcher/http';

const INDEX_URL = 'https://ftp.gnu.org/gnu/coreutils/';

// Download and decompress the latest GNU coreutils from https://ftp.gnu.org/gnu/coreutils/
// The directory name is downloads/gnu-coreutils
export const prepareGNUCoreutils = async () => {
  const document = await fetchDocumentFromURL(new URL(INDEX_URL));
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
