import React from 'react';

import { Command } from '../../types';
import { OptionItem } from './OptionItem';

interface Props {
  command: Command;
}

export const CommandItem: React.VFC<Props> = (props) => (
  <>
    <p>
      <code>{props.command.name}</code>
    </p>
    <ul>
      {props.command.options.map((option) => (
        <li key={`${props.command.name}-${option.type}-${option.key}`}>
          <OptionItem option={option} />
        </li>
      ))}
    </ul>
  </>
);
