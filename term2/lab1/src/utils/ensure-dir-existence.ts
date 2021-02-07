import fs from 'fs';

export const ensureDirExistenceSync = (path: string): void => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}
