import path from 'path';
import { ensureDirExistenceSync } from '../utils/ensure-dir-existence';

const CACHE_DIR = path.join(__dirname, '../../cache');
ensureDirExistenceSync(CACHE_DIR);

export default {
  CACHE_DIR,
};
