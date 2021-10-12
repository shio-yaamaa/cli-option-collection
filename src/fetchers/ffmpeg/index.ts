import { build } from './builder';

// Alternative sources:
// - https://github.com/FFmpeg/FFmpeg/blob/master/doc/ffmpeg.texi
// - https://github.com/FFmpeg/FFmpeg/blob/master/fftools/ffmpeg_opt.c#L3482

export const ffmpeg = {
  ffmpeg: build('ffmpeg'),
  ffplay: build('ffplay'),
  ffprobe: build('ffprobe'),
};
