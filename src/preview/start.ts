import path from 'path';
import fs from 'fs';
import express from 'express';

import { Command } from '../types';
import { render } from './commands';

const PORT = '3000';
const BASE_COMMAND_NAME_PATTERN = /^[A-Za-z][A-Za-z0-9-]*$/;

const app = express();

app.get('/', (_req, res) => {
  res.send(
    "<p>Access <code>/{baseCommandName}</code> (e.g. <code>/ls</code>) to preview the command's options.</p>"
  );
});

app.get('/commands.js', (_req, res) => {
  res.sendFile(path.resolve(__dirname, 'commands.js'));
});

app.get('/snapshots/:baseCommandName.json', (req, res) => {
  const baseCommandName = req.params.baseCommandName;
  res.sendFile(path.resolve(__dirname, `../snapshots/${baseCommandName}.json`));
});

app.get('/:baseCommandName', (req, res) => {
  const baseCommandName = req.params.baseCommandName;
  if (!BASE_COMMAND_NAME_PATTERN.test(baseCommandName)) {
    return res.send('Invalid base command name');
  }

  const json = JSON.parse(
    fs
      .readFileSync(
        path.resolve(__dirname, `../snapshots/${baseCommandName}.json`)
      )
      .toString()
  );
  const rendered = render(json as Command[]);
  res.send(rendered);
});

app.listen(PORT, () => {
  console.log(`Preview app listening at http://localhost:${PORT}`);
});
