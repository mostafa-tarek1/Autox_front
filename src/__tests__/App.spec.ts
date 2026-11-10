import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, expect, it } from 'vitest'

import App from '@/App.vue'
import { i18n } from '@/plugins/i18n'
import router from '@/router'

describe('App', () => {
  it('renders the home view in Arabic with RTL direction', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(App, { global: { plugins: [createPinia(), i18n, router] } })
    await new Promise((resolve) => setTimeout(resolve))

    expect(wrapper.text()).toContain('أوتو إكس')
    expect(document.documentElement.dir).toBe('rtl')
    expect(document.documentElement.lang).toBe('ar')
  })
})
