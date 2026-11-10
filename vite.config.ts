import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    svgLoader({
      defaultImport: 'component',
      svgoConfig: {
        plugins: [
          { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
          // Icons are inlined many times per page; unique ids keep clip-paths from colliding.
          { name: 'prefixIds', params: { prefixClassNames: false } },
        ],
      },
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
  },
})
