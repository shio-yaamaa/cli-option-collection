import { findAnchorsWithPattern } from '../../utils/forFetcher/dom';
import {
  downloadArchive,
  fetchDocumentFromURL,
} from '../../utils/forFetcher/http';

const DOWNLOAD_URL = 'https://curl.se/download.html';

export const prepareCurl = async () => {
  const document = await fetchDocumentFromURL(new URL(DOWNLOAD_URL));
  const downloadContainer = document.querySelector('.download');
  const anchors =
    downloadContainer &&
    findAnchorsWithPattern(downloadContainer, /\.tar\.xz/, null);
  if (!anchors || anchors.length === 0) {
    throw new Error('Cannot find download link of curl');
  }
  downloadArchive(new URL(anchors[0].href), '.tar.xz', 'curl');
};
