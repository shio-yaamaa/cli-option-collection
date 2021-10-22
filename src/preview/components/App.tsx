import React from 'react';
import './App.css';
import { CommandList } from './CommandList';

import { Command } from '../../types';

interface Props {
  commands: Command[];
}

export const App: React.VFC<Props> = (props) => (
  <div className="App">
    <CommandList commands={props.commands} />
  </div>
);
