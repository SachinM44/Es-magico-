import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import { AppError, errorHandler } from './lib/errors.js';
import { healthRouter } from './routes/health.js';
import { leadsRouter } from './routes/leads.js';

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: process.env.WEB_ORIGIN ?? true }));
  app.use(express.json({ limit: '100kb' }));
  app.use(pinoHttp({ level: process.env.LOG_LEVEL ?? 'info' }));

  app.use('/api/health', healthRouter);
  app.use('/api/leads', leadsRouter);

  app.use((_req, _res, next) => {
    next(new AppError(404, 'NotFound'));
  });

  app.use(errorHandler);

  return app;
}
