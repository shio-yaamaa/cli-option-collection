import { build } from './builder';

export const systemd = {
  systemctl: build('systemctl'),
  systemd: build('systemd'),
};
