import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Alfonso 66',
        short_name: 'Alfonso 66',
        description: 'Presentación del vídeo Alfonso 66',
        start_url: '.',
        display: 'standalone',
        background_color: '#0b0e14',
        theme_color: '#0b0e14',
        lang: 'es',
        icons: [
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
        ],
      },
    }),
  ],
});
