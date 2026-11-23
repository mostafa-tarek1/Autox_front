import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, expect, it } from 'vitest'

import DashboardTopbar from '@/components/dashboard/layout/DashboardTopbar.vue'
import { i18n } from '@/plugins/i18n'
import router from '@/router'

describe('DashboardTopbar', () => {
  it('opens the supplier notifications from the bell and closes them again', async () => {
    router.push('/dashboard')
    await router.isReady()
    const wrapper = mount(DashboardTopbar, {
      global: { plugins: [createPinia(), i18n, router] },
      attachTo: document.body,
    })
    const bell = wrapper.find('button[aria-haspopup="dialog"]')

    expect(bell.attributes('aria-expanded')).toBe('false')
    await bell.trigger('click')
    await flushPromises()

    expect(bell.attributes('aria-expanded')).toBe('true')
    expect(wrapper.text()).toContain('طلب جديد رقم #12345 بانتظار ردك')
    expect(wrapper.text()).not.toContain('ادفع ثمن الطلب')

    await bell.trigger('click')
    expect(bell.attributes('aria-expanded')).toBe('false')
    wrapper.unmount()
  })
})
