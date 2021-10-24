import fs from 'fs-extra';

import { buildStats } from './buildStats';
import { buildMarkdown } from './buildMarkdown';
import { resolveRelativePathFromRoot } from '../utils/path';

const main = () => {
  const stats = buildStats();
  const markdown = buildMarkdown(stats);
  const filename = 'stats.md';
  fs.outputFileSync(resolveRelativePathFromRoot(filename), markdown);
  console.log(`Saved ${filename}`);
};

main();
