import { build } from './builder';

export const fzf = {
  fzf: build('fzf', {
    optionsHeaderID: 'OPTIONS',
  }),
  fzfTmux: build('fzf-tmux', {
    optionsHeaderID: 'LAYOUT_OPTIONS',
  }),
};
