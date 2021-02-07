import path from 'path';
import { ensureDirExistenceSync } from '../utils/ensure-dir-existence';

const OUT_DIR = path.join(__dirname, '../../out');
ensureDirExistenceSync(OUT_DIR);

const TASK1_FILE_NAME = path.join(OUT_DIR, 'task1.xml');
const TASK3_FILE_NAME = path.join(OUT_DIR, 'task3.xml');
const TASK4_FILE_NAME = path.join(OUT_DIR, 'task4.xml');

export default {
  OUT_DIR,
  TASK1_FILE_NAME,
  TASK3_FILE_NAME,
  TASK4_FILE_NAME,
}
