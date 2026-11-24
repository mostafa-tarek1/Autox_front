import { fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { configDefaults, defineConfig } from 'vitest/config'

import { srcAlias, svgComponents } from './vite.shared.ts'

/** Component tests run on plain Vue (no Nuxt runtime) with the same alias and SVG imports. */
export default defineConfig({
  plugins: [vue(), svgComponents()],
  resolve: {
    alias: {
      ...srcAlias,
      // Nuxt-only virtual modules, replaced by plain Vue equivalents in component tests.
      '#imports': fileURLToPath(
        new URL('./src/__tests__/support/nuxt-imports.ts', import.meta.url),
      ),
      '#components': fileURLToPath(
        new URL('./src/__tests__/support/nuxt-components.ts', import.meta.url),
      ),
    },
  },
  test: {
    environment: 'jsdom',
    // Tests that mount routes wait for lazy route chunks, which a cold run transforms first.
    testTimeout: 20000,
    exclude: [...configDefaults.exclude, 'e2e/**', '.nuxt/**', '.output/**'],
    root: fileURLToPath(new URL('./', import.meta.url)),
  },
})
