import React from 'react';

import { Command } from '../types';
import { CommandItem } from './CommandItem';

interface Props {
  commands: Command[];
}

export const CommandList: React.VFC<Props> = (props) => (
  <>
    {props.commands.map((command) => (
      <CommandItem key={command.name} command={command} />
    ))}
  </>
);
