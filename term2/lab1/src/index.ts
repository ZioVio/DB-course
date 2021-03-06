import * as task1 from './tasks/task1';
import * as task2 from './tasks/task2';
import * as task3 from './tasks/task3';
import config from './config'

(async () => {
  const xml1 = await task1.run(config.TASK1_BASE_URL);
  await task2.run(xml1);
  await task3.run(config.TASK3_URL);
})();

