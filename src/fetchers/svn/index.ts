import { build as buildForCommandWithSubcommands } from './builderForCommandWithSubcommands';
// import { build as buildForCommandWithoutSubcommands } from './builderForCommandWithoutSubcommands';

// NOTE: Option arguments that also look like options (e.g. "--ignore-space-change") are not collected
//       because they are in nested lists.
// NOTE: svn command has a subcommand "svn ?".

export const svn = {
  svn: buildForCommandWithSubcommands('svn', {
    buildOptionListURL: (version) =>
      new URL(`https://svnbook.red-bean.com/en/${version}/svn.ref.svn.html`),
  }),
};
