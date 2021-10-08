import { FetchFunction, Command } from '../types';
import { ffmpeg } from '../common-fetchers/ffmpeg';

// Alternative sources:
// - https://github.com/FFmpeg/FFmpeg/blob/master/doc/ffmpeg.texi
// - https://github.com/FFmpeg/FFmpeg/blob/master/fftools/ffmpeg_opt.c#L3482

export const fetchFfmpeg: FetchFunction = async (): Promise<Command[]> =>
  ffmpeg({
    commandName: 'ffmpeg',
    url: new URL('https://www.ffmpeg.org/ffmpeg.html'),
  });

export const fetchFfplay: FetchFunction = async (): Promise<Command[]> =>
  ffmpeg({
    commandName: 'ffplay',
    url: new URL('https://www.ffmpeg.org/ffplay.html'),
  });

export const fetchFfprobe: FetchFunction = async (): Promise<Command[]> =>
  ffmpeg({
    commandName: 'ffmpeg',
    url: new URL('https://www.ffmpeg.org/ffprobe.html'),
  });
