import { buildManFetcher } from './manFetcherBuilder';
import { fetchCurl } from './curl';

// Alternative sources:
// - https://curl.se/docs/manpage.html
//   Hard to parse because of the structure.
// - https://www.freebsd.org/cgi/man.cgi?query=curl&manpath=FreeBSD+13.0-RELEASE+and+Ports
//   Option descriptions are too long.

// NOTE: Special characters in option names:
//       - curl -:
//       - curl -#
//       - curl --http1.0
// NOTE: curl fetcher currently cannot handle multiple long keys
//       belonging to a single option.
//       This might cause a bug in the future.
// NOTE: The fetcher just downloads the repository instead of using GitHub API
//       to avoid authentication and hitting the rate limit.
// BUG: Lists in option descriptions (e.g. description of "mk-ca-bundle -p")
//      are not considered to be a part of the description because of the HTML structure.

export const curl = {
  curl: {
    fetch: () => fetchCurl(),
  },
  curlConfig: buildManFetcher('curl-config', { filename: 'curl-config.1' }),
  mkCaBundle: buildManFetcher('make-ca-bundle', { filename: 'mk-ca-bundle.1' }),
};
