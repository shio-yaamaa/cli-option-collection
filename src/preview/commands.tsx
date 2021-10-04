import React from 'react';
import ReactDOM from 'react-dom';
import './commands.css';
import { App } from './components/App';

const BASE_COMMAND_NAME_PATTERN = /^[A-Za-z][A-Za-z0-9-]*$/;

const pathname = window.location.pathname;
const baseCommandName = pathname.split('/')[1];
const validatedBaseCommandName = BASE_COMMAND_NAME_PATTERN.test(baseCommandName)
  ? baseCommandName
  : null;
console.log({ validatedBaseCommandName });
fetch('snapshots/docker.json')
  .then((response) => response.json())
  .then((json) => console.log(json));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
