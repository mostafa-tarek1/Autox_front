import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ProductCard from '@/components/catalog/ProductCard.vue'
import { i18n } from '@/plugins/i18n'
import type { Product } from '@/types/catalog'

const base: Product = {
  id: 'p-1',
  title: 'رفرف ونيت ايسوزو19/23أصلي',
  partNumber: '04465-0K240',
  supplier: 'الشركة رقم 1',
  brandLogo: '',
  origin: 'korean',
  price: 160,
  highlight: 'cheapest',
}
const alternative: Product = { ...base, id: 'alt-1', title: 'بنز بستم ايسوزو اصلي', price: 200 }

describe('ProductCard', () => {
  it('shows the alternatives only after the panel is opened', async () => {
    const wrapper = mount(ProductCard, {
      props: { product: { ...base, alternatives: [alternative] } },
      global: { plugins: [i18n] },
    })
    const toggle = wrapper.get('button[aria-expanded]')

    expect(wrapper.text()).not.toContain('بنز بستم ايسوزو اصلي')
    await toggle.trigger('click')
    expect(toggle.attributes('aria-expanded')).toBe('true')
    expect(wrapper.text()).toContain('بنز بستم ايسوزو اصلي')
  })

  it('reports quantity changes of an alternative with the alternative part', async () => {
    const wrapper = mount(ProductCard, {
      props: { product: { ...base, alternatives: [alternative] } },
      global: { plugins: [i18n] },
    })
    await wrapper.get('button[aria-expanded]').trigger('click')
    const increase = wrapper
      .findAll('li button')
      .find((button) => button.attributes('aria-label') === 'زيادة')

    await increase!.trigger('click')
    expect(wrapper.emitted('update:alternativeQuantity')).toEqual([[alternative, 1]])
  })

  it('has no alternatives panel when the part has none', () => {
    const wrapper = mount(ProductCard, { props: { product: base }, global: { plugins: [i18n] } })

    expect(wrapper.find('button[aria-expanded]').exists()).toBe(false)
  })
})
