// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',        // SW aktualisiert sich im Hintergrund
      includeAssets: [
        'favicon.svg',
        'favicon-192.png',
        'favicon-512.png',
        'apple-touch-icon.png'
      ],
      manifest: {
        name: 'AIX Aleph',
        short_name: 'AIX Aleph',
        description: 'Human ♥ Computing. Flotten, Energie und Prozesse klar und auditierbar orchestrieren.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        theme_color: '#23272a',
        background_color: '#23272a',
        icons: [
          { src: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/favicon.svg',     sizes: 'any',     type: 'image/svg+xml', purpose: 'any' },
          // iOS mag 180x180 als apple-touch-icon
          { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png', purpose: 'any' },
        ],
      },
      workbox: {
        navigateFallback: '/index.html',
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          // Google Fonts (super für CLS)
          {
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          // MapLibre Styles/Tiles
          {
            urlPattern: /^https:\/\/.*(?:maptiler|tile|tiles|basemaps|unpkg\.com\/maplibre-gl).*$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'maplibre-assets',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 7 },
            },
          },
          // API (falls du /api nutzt – sonst löschen/anpassen)
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 3,
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 5 },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,       // SW auch im `npm run dev` (hilfreich beim Testen)
        type: 'module',
      },
    }),
  ],
})
