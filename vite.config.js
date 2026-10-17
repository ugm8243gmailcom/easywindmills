import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { apiMiddleware } from './server/router.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'easywindmill-api',
      configureServer(server) {
        server.middlewares.use(apiMiddleware)
      }
    }
  ],
  server: {
    port: 5173,
    host: true,
    watch: {
      ignored: ['**/scratch/**', '**/.git/**']
    }
  }
})
