import bullmq from 'bullmq';
import config from '../config.js';
import { setProcessed } from '../providers/organization/index.js';

const { Worker } = bullmq;

const { host, port, password } = config.redis;

new Worker('Processing', async ({ data }) => {
  const { organizationId, user} = data;
  await setProcessed(organizationId, user);
}, { 
  connection: { host, port, password }
});
