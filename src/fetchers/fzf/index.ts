import { FetchFunction, Command } from '../../types';
import { fetch } from './fetcher';

export const fetchFzf: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'fzf',
    url: new URL(
      'https://raw.githubusercontent.com/junegunn/fzf/master/man/man1/fzf.1'
    ),
    optionsHeaderID: 'OPTIONS',
  });

export const fetchFzfTmux: FetchFunction = async (): Promise<Command[]> =>
  fetch({
    commandName: 'fzf-tmux',
    url: new URL(
      'https://raw.githubusercontent.com/junegunn/fzf/master/man/man1/fzf-tmux.1'
    ),
    optionsHeaderID: 'LAYOUT_OPTIONS',
  });