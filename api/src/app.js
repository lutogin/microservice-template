import express from 'express';
import applyMiddleware from './middlewares';
import './db';

const app = express();

applyMiddleware(app);

export default app;
