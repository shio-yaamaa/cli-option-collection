import { FetchFunction, Command } from '../types';

// NOTE: Documentation for curl-config could not be found in the same domain

export const fetchCurl: FetchFunction = (): Command[] => {
  const url = 'https://curl.se/docs/manpage.html';
  return [];
};
