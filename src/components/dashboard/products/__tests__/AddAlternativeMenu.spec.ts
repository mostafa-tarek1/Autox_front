import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import AddAlternativeMenu from '@/components/dashboard/products/AddAlternativeMenu.vue'
import { i18n } from '@/plugins/i18n'

describe('AddAlternativeMenu', () => {
  it('emits the chosen method and closes itself', async () => {
    const wrapper = mount(AddAlternativeMenu, {
      props: {
        open: true,
        'onUpdate:open': (value: boolean) => wrapper.setProps({ open: value }),
      },
      global: { plugins: [i18n] },
      attachTo: document.body,
    })
    await nextTick()
    const [, manual, catalog] = wrapper.findAll('button')

    await catalog!.trigger('click')
    expect(wrapper.emitted('choose')).toEqual([['catalog']])
    expect(wrapper.props('open')).toBe(false)
    expect(manual).toBeDefined()
    wrapper.unmount()
  })

  it('closes on Escape', async () => {
    const wrapper = mount(AddAlternativeMenu, {
      props: {
        open: true,
        'onUpdate:open': (value: boolean) => wrapper.setProps({ open: value }),
      },
      global: { plugins: [i18n] },
      attachTo: document.body,
    })
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()
    expect(wrapper.props('open')).toBe(false)
    wrapper.unmount()
  })
})
