import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3001,
    open: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true
      }
    }
  }
});
