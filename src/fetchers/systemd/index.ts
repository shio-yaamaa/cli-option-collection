import { build } from './builder';

export const systemd = {
  journalctl: build('journalctl'),
  systemctl: build('systemctl'),
  systemd: build('systemd'),
};
