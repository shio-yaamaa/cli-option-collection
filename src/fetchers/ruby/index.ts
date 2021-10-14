import { build } from './builder';

// BUG: There is a nested option list In the option description of "ruby" command.
//      e.g. --disable-gems, --disable-rubyopt
//      They are currently just ignored.

export const ruby = {
  erb: build('erb', { manFilename: 'erb.1' }),
  irb: build('irb', { manFilename: 'irb.1' }),
  ri: build('ri', { manFilename: 'ri.1' }),
  ruby: build('ruby', { manFilename: 'ruby.1' }),
};
