import bullmq from 'bullmq';
import config from '../config.js'

const { Queue } = bullmq;

const { host, port, password } = config.redis;
const processQueue = new Queue('Processing', { 
  connection: {
    host,
    port,
    password,
  }
});

export default processQueue;