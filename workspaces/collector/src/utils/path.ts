import path from 'path';
import findUp from 'find-up';

const workspacesPath = findUp.sync('workspaces', { type: 'directory' }) ?? '';

export const resolveRelativePathFromRoot = (relativePath: string): string => {
  return path.resolve(workspacesPath, '../', relativePath);
};
