import type { RouterConfig } from 'nuxt/schema'

import { routes, scrollBehavior } from '@/router'

/**
 * Nuxt builds its router from these options: the app's own feature route files replace Nuxt's
 * file-based pages, so every path, name, layout and meta stays exactly as before.
 */
export default {
  routes: () => routes,
  scrollBehavior,
} satisfies RouterConfig
