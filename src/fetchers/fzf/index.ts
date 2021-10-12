import { fetch } from './fetcher';

export const fzf = {
  fzf: () =>
    fetch({
      commandName: 'fzf',
      optionsHeaderID: 'OPTIONS',
    }),
  fzfTmux: () =>
    fetch({
      commandName: 'fzf-tmux',
      optionsHeaderID: 'LAYOUT_OPTIONS',
    }),
};
