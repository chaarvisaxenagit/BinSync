import 'dotenv/config';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { POST as triagePostHandler } from './app/api/triage/route.ts';
import { POST as verifyPostHandler } from './app/api/verify/route.ts';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '25mb' }));

  // Server-side API Endpoint: Anti-AI Image Check & Gemini Waste Triage
  app.post('/api/triage', async (req, res) => {
    try {
      const webReq = new Request(`http://localhost:${PORT}/api/triage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body || {}),
      });
      const webRes = await triagePostHandler(webReq);
      const data = await webRes.json();
      res.status(webRes.status).json(data);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Internal triage error',
      });
    }
  });

  // Server-side API Endpoint: Gemini Vision Before/After Verification Loop
  app.post('/api/verify', async (req, res) => {
    try {
      const webReq = new Request(`http://localhost:${PORT}/api/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body || {}),
      });
      const webRes = await verifyPostHandler(webReq);
      const data = await webRes.json();
      res.status(webRes.status).json(data);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Internal verify error',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(
      '/src/assets',
      express.static(path.join(process.cwd(), 'src/assets'))
    );
    app.use(express.static(distPath));
    app.get('*all', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BinSync server running on http://localhost:${PORT}`);
  });
}

startServer();
