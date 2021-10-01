import { FetchFunction, Command } from '../types';
import { SourceDef, ffmpeg } from '../common-fetchers/ffmpeg';

// Alternative sources:
// - https://github.com/FFmpeg/FFmpeg/blob/master/doc/ffplay.texi
// - https://github.com/FFmpeg/FFmpeg/blob/master/fftools/ffplay.c#L3584

const sourceDef: SourceDef = {
  commandName: 'ffplay',
  url: new URL('https://www.ffmpeg.org/ffplay.html'),
};

export const fetchFfplay: FetchFunction = async (): Promise<Command[]> =>
  ffmpeg(sourceDef);
