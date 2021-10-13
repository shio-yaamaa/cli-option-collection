import { build } from './builder';

// BUG: There is a nested option list In the option description of "ruby" command.
//      e.g. --disable-gems, --disable-rubyopt
//      They are currently just ignored.

export const ruby = {
  ruby: build('ruby', { manFilename: 'ruby.1' }),
};
