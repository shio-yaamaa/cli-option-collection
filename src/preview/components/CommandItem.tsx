import React from 'react';

import { Command } from '../../types';
import { OptionItem } from './OptionItem';

interface Props {
  command: Command;
}

export const CommandItem: React.VFC<Props> = (props) => (
  <>
    <h2>
      <code>{props.command.name}</code>
    </h2>
    <ul>
      {props.command.options.map((option) => (
        <li key={`${props.command.name}-${option.key}`}>
          <OptionItem option={option} />
        </li>
      ))}
    </ul>
  </>
);
