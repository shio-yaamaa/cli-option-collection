import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './commands.css';
import { App } from './components/App';

import { Command } from '../types';

export const render = (commands: Command[]) => {
  ReactDOMServer.renderToStaticMarkup(
    <React.StrictMode>
      <App commands={commands} />
    </React.StrictMode>
  );
};
