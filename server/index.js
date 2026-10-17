/**
 * EasyWindmill - Standalone Simulation Backend Server
 *
 * Runs the HTTP simulation API on a configurable port.
 * Can be run independently via `npm run server` or `node server/index.js`.
 */

import http from 'node:http';
import { apiMiddleware } from './router.js';

const PORT = parseInt(process.env.PORT, 10) || 3001;
const HOST = process.env.HOST || '0.0.0.0';

export function createServer() {
  return http.createServer((req, res) => {
    apiMiddleware(req, res, () => {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        status: 'error',
        error: 'Not Found',
        message: `Endpoint ${req.url} was not found on this server.`
      }));
    });
  });
}

// Start server if executed directly
if (process.argv[1] && process.argv[1].endsWith('index.js')) {
  const server = createServer();
  server.listen(PORT, HOST, () => {
    console.log(`[EasyWindmill Backend] Educational HAWT Simulation API listening on http://${HOST}:${PORT}`);
    console.log(`[EasyWindmill Backend] Health check: http://localhost:${PORT}/api/health`);
    console.log(`[EasyWindmill Backend] Model metadata: http://localhost:${PORT}/api/simulation/model`);
    console.log(`[EasyWindmill Backend] Weather status: http://localhost:${PORT}/api/weather/status`);
  });
}
