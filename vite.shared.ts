import { fileURLToPath, URL } from 'node:url'

import svgLoader from 'vite-svg-loader'

/**
 * Vite settings shared by Nuxt (nuxt.config.ts) and Vitest (vitest.config.ts), so components see
 * the same `@/` alias and the same SVG-as-component imports in the app and in tests.
 */
export const srcAlias = { '@': fileURLToPath(new URL('./src', import.meta.url)) }

export function svgComponents() {
  return svgLoader({
    defaultImport: 'component',
    svgoConfig: {
      plugins: [
        { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
        // Icons are inlined many times per page; unique ids keep clip-paths from colliding.
        { name: 'prefixIds', params: { prefixClassNames: false } },
      ],
    },
  })
}
