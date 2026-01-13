import type { VercelRequest, VercelResponse } from '@vercel/node';
import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from '../server/routers';
import { createContext } from '../server/_core/context';
import path from 'path';
import fs from 'fs';

// Criar aplicação Express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// tRPC router
app.use(
  '/api/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Servir arquivos estáticos do Vite
const publicPath = path.join(__dirname, '../dist/public');
if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath));
}

// SPA fallback - servir index.html para todas as rotas não encontradas
app.get('*', (req, res) => {
  const indexPath = path.join(publicPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Not found');
  }
});

// Exportar para Vercel
export default app;
