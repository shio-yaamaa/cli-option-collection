import { fetchDocumentFromURL } from '../../utils/forFetcher/http';

let latestVersion: string | null = null;

// Infer the latest version from a link on the top page.
// Returns a version string like "1.7" or null if not found.
export const getLatestVersion = async (): Promise<string | null> => {
  if (latestVersion) {
    return latestVersion;
  }
  const document = await fetchDocumentFromURL(
    new URL('https://svnbook.red-bean.com/')
  );
  const anchors = Array.from(document.querySelectorAll('a'));
  const hrefPattern = /\/en\/(\d+(\.\d+){0,2})\/index\.html$/;
  for (const anchor of anchors) {
    const match = anchor.href.match(hrefPattern);
    if (match) {
      latestVersion = match[1];
      return latestVersion;
    }
  }
  return null;
};
