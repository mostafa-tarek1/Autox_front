import { createHead } from '@unhead/vue/client'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'

import App from '@/app.vue'
import { i18n } from '@/plugins/i18n'
import { createAppRouter } from '@/router'

const router = createAppRouter()

describe('App', () => {
  it('renders the home page in Arabic with RTL direction', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(App, { global: { plugins: [createPinia(), i18n, router, createHead()] } })
    await vi.waitFor(
      () => expect(wrapper.text()).toContain('ابحث، قارن، واطلب قطع غيار السيارات بسهولة'),
      // The home route and its layout are lazy chunks; a cold run transforms them first.
      { timeout: 15000 },
    )
    // <html lang/dir> are written by the head manager on its next flush.
    await vi.waitFor(() => {
      expect(document.documentElement.dir).toBe('rtl')
      expect(document.documentElement.lang).toBe('ar')
    })
  })
})
