// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '127.0.0.1',  // wichtig, damit wir sicher auf 127.0.0.1 lauschen
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true,
        rewrite: (p) => p,
      },
    },
  },
})
