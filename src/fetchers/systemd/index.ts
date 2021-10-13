import { build } from './builder';

// NOTE: There are more systemd-related commands that have not been collected.

export const systemd = {
  journalctl: build('journalctl'),
  systemctl: build('systemctl'),
  systemd: build('systemd'),
};
