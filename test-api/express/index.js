import express from 'express';
import router from './router/index.js';
import authorization from './authorization.js';
import errorHandler from './errorHandler.js';

const app = express();
app.use(express.json());
app.use(authorization);
app.use(router);


app.use(errorHandler)

export default app;