import { provideSSRWidth } from '@vueuse/core'
import { defineNuxtPlugin } from 'nuxt/app'
import { nextTick } from 'vue'

import { i18n, readStoredLocale } from '@/plugins/i18n'

/**
 * Installs vue-i18n and the server-render defaults:
 * - Media queries (pagination siblings, testimonial slides) render for a 1440px desktop on the
 *   server and for the first client paint, then follow the real screen.
 * - Once the pre-rendered (Arabic) page is hydrated, the stored locale is applied and the page,
 *   kept hidden by the head boot script for English / Urdu visitors, is shown.
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(i18n)
  provideSSRWidth(1440, nuxtApp.vueApp)

  if (import.meta.client) {
    let restored = false
    nuxtApp.hook('app:suspense:resolve', async () => {
      if (restored) {
        return
      }
      restored = true
      i18n.global.locale.value = readStoredLocale()
      await nextTick()
      document.documentElement.removeAttribute('data-locale-pending')
    })
  }
})
