import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),

    vuetify({ autoImport: true }),

    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: 'Post 20 App',
        short_name: 'Post 20',
        description: 'American Legion Post 20',

        theme_color: '#1976D2',
        background_color: '#FFFFFF',

        display: 'standalone',
        start_url: '/',
        scope: '/',

        icons: [
          
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],

  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true
      }
    }
  }
})
