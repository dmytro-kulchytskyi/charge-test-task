import config from './config.js';
import sequalize from './database/sequelize.js';
import configure from './database/configure.js';
import app from './express/index.js';

import './queue/worker.js';

async function init() {
  await configure(sequalize);

  const { port } = config.server;
  app.listen(port, () => console.log(`Express server started on port ${port}`));
}

init();
