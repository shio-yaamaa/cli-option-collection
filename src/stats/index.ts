import fs from 'fs-extra';

import { buildStats } from './buildStats';
import { buildMarkdown } from './buildMarkdown';

const main = () => {
  const stats = buildStats();
  const markdown = buildMarkdown(stats);
  const filename = 'stats.md';
  fs.outputFileSync(filename, markdown);
  console.log(`Saved ${filename}`);
};

main();
