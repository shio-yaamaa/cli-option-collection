import { FetchFunction, Command } from '../types';
import { SourceDef, imagemagick } from '../common-fetchers/imagemagick';

const sourceDef: SourceDef = {
  commandName: 'magick-script',
  url: new URL('https://imagemagick.org/script/magick-script.php'),
};

export const fetchMagickScript: FetchFunction = async (): Promise<Command[]> =>
  imagemagick(sourceDef);
