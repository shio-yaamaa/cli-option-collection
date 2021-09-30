import { FetchFunction, Command } from '../types';
import { SourceDef, ffmpeg } from '../common-fetchers/ffmpeg';

// Alternative sources:
// - https://github.com/FFmpeg/FFmpeg/blob/master/doc/ffprobe.texi
// - https://github.com/FFmpeg/FFmpeg/blob/master/fftools/ffprobe.c#L3630

const sourceDef: SourceDef = {
  commandName: 'ffmpeg',
  url: new URL('https://www.ffmpeg.org/ffprobe.html'),
};

export const fetchFfprobe: FetchFunction = async (): Promise<Command[]> =>
  ffmpeg(sourceDef);
