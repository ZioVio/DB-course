import * as task1 from './tasks/task1';
import * as task2 from './tasks/task2';
import config from './config'

(async () => {
  const xml = await task1.run(config.TASK1_BASE_URL);
  await task2.run(xml);
})()

