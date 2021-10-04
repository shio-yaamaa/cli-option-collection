import path from 'path';
import express from 'express';

const PORT = '3000';

const app = express();

app.get('/', (_req, res) => {
  res.send(
    "<p>Access <code>/{baseCommandName}</code> (e.g. <code>/ls</code>) to preview the command's options.</p>"
  );
});

app.get('/commands.js', (_req, res) => {
  res.sendFile(path.resolve(__dirname, 'commands.js'));
});

app.get('/snapshots/docker.json', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../snapshots/docker.json'));
});

app.get('/:baseCommand', (_req, res) => {
  res.sendFile(path.resolve(__dirname, 'commands.html'));
});

app.listen(PORT, () => {
  console.log(`Preview app listening at http://localhost:${PORT}`);
});
