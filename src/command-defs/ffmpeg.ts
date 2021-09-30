import { FetchFunction, Command } from '../types';
import { SourceDef, ffmpeg } from '../common-fetchers/ffmpeg';

// Alternative sources:
// - https://github.com/FFmpeg/FFmpeg/blob/master/doc/ffmpeg.texi
// - https://github.com/FFmpeg/FFmpeg/blob/master/fftools/ffmpeg_opt.c#L3482

const sourceDef: SourceDef = {
  commandName: 'ffmpeg',
  url: new URL('https://www.ffmpeg.org/ffmpeg.html'),
};

export const fetchFfmpeg: FetchFunction = async (): Promise<Command[]> =>
  ffmpeg(sourceDef);
