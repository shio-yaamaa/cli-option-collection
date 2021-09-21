import { FetchFunction, Command } from '../types';

// NOTE: Documentation for curl-config could not be found in the same domain

// Alternative sources:
// - https://github.com/curl/curl/tree/master/docs/cmdline-opts

export const fetchCurl: FetchFunction = async (): Promise<Command[]> => {
  const url = 'https://curl.se/docs/manpage.html';
  return [];
};
