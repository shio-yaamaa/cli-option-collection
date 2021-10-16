import { build as buildForCommandWithSubcommands } from './builderForCommandWithSubcommands';
import { build as buildForCommandWithoutSubcommands } from './builderForCommandWithoutSubcommands';

// NOTE: Option arguments that also look like options (e.g. "--ignore-space-change") are not collected
//       because they are in nested lists.
// NOTE: svn command has a subcommand "svn ?".
// BUG: Options with period in names (e.g. "--pre-1.4-compatible") are not recognized.

export const svn = {
  svn: buildForCommandWithSubcommands('svn', {
    buildOptionListURL: (version) =>
      new URL(`https://svnbook.red-bean.com/en/${version}/svn.ref.svn.html`),
    hasGlobalOptions: true,
  }),
  svnadmin: buildForCommandWithSubcommands('svnadmin', {
    buildOptionListURL: (version) =>
      new URL(
        `https://svnbook.red-bean.com/en/${version}/svn.ref.svnadmin.html`
      ),
    hasGlobalOptions: false,
  }),
  svnlook: buildForCommandWithSubcommands('svnlook', {
    buildOptionListURL: (version) =>
      new URL(
        `https://svnbook.red-bean.com/en/${version}/svn.ref.svnlook.html`
      ),
    hasGlobalOptions: false,
  }),
  svnsync: buildForCommandWithSubcommands('svnsync', {
    buildOptionListURL: (version) =>
      new URL(
        `https://svnbook.red-bean.com/en/${version}/svn.ref.svnsync.html`
      ),
    hasGlobalOptions: false,
  }),
  svnrdump: buildForCommandWithSubcommands('svnrdump', {
    buildOptionListURL: (version) =>
      new URL(
        `https://svnbook.red-bean.com/en/${version}/svn.ref.svnrdump.html`
      ),
    hasGlobalOptions: false,
  }),
  svnserve: buildForCommandWithoutSubcommands('svnserve', {
    buildOptionListURL: (version) =>
      new URL(
        `https://svnbook.red-bean.com/en/${version}/svn.ref.svnserve.html`
      ),
  }),
  svndumpfilter: buildForCommandWithSubcommands('svndumpfilter', {
    buildOptionListURL: (version) =>
      new URL(
        `https://svnbook.red-bean.com/en/${version}/svn.ref.svndumpfilter.html`
      ),
    hasGlobalOptions: false,
  }),
  svnversion: buildForCommandWithoutSubcommands('svnversion', {
    buildOptionListURL: (version) =>
      new URL(
        `https://svnbook.red-bean.com/en/${version}/svn.ref.svnversion.re.html`
      ),
  }),
};
