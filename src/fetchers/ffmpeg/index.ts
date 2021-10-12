import { fetch } from './fetcher';

// Alternative sources:
// - https://github.com/FFmpeg/FFmpeg/blob/master/doc/ffmpeg.texi
// - https://github.com/FFmpeg/FFmpeg/blob/master/fftools/ffmpeg_opt.c#L3482

export const ffmpeg = {
  ffmpeg: () =>
    fetch({
      commandName: 'ffmpeg',
    }),
  ffplay: () =>
    fetch({
      commandName: 'ffplay',
    }),
  ffprobe: () =>
    fetch({
      commandName: 'ffprobe',
    }),
};
