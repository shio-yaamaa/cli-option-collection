import { OptionStyle } from '../../types';
import { build } from './builder';

// Alternative sources:
// - nano
//   - https://www.nano-editor.org/dist/latest/nano.1.html

// BUG: Options with single dash and multiple letters (e.g. "zip -AC")
//      are not recognized.
// BUG: Line breaks in descriptions are removed, making them hard to read.
// BUG: "zip --fifo" is not parsed correctly because it is not two spaces apart
//      from the description.
// BUG: Options using special characters are not recognized.
//      - "zip -#"
//      - "zip -!"
//      - "zip -@"
//      - "zip -$"
//      - "nano -%"
//      - "nano -_"

export const freebsd = {
  nano: build('nano', {
    url: new URL(
      'https://www.freebsd.org/cgi/man.cgi?query=nano&manpath=FreeBSD+13.0-RELEASE+and+Ports'
    ),
    optionStyle: OptionStyle.SHORT_AND_LONG,
    optionsHeading: 'OPTIONS',
  }),
  pico: build('pico', {
    url: new URL(
      'https://www.freebsd.org/cgi/man.cgi?query=pico&manpath=FreeBSD+13.0-RELEASE+and+Ports'
    ),
    optionStyle: OptionStyle.SINGLE_DASH,
    optionsHeading: 'Options',
  }),
  unzip: build('unzip', {
    url: new URL(
      'https://www.freebsd.org/cgi/man.cgi?query=unzip&manpath=FreeBSD+13.0-RELEASE+and+Ports'
    ),
    optionStyle: OptionStyle.SHORT_AND_LONG,
    optionsHeading: 'DESCRIPTION',
  }),
  zip: build('zip', {
    url: new URL(
      'https://www.freebsd.org/cgi/man.cgi?query=zip&manpath=FreeBSD+13.0-RELEASE+and+Ports'
    ),
    optionStyle: OptionStyle.SHORT_AND_LONG,
    optionsHeading: 'OPTIONS',
  }),
};
