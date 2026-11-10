import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import BaseModal from '@/components/ui/BaseModal.vue'
import PriceTag from '@/components/ui/PriceTag.vue'
import QuantityStepper from '@/components/ui/QuantityStepper.vue'
import { i18n } from '@/plugins/i18n'

const global = { plugins: [i18n] }

describe('PriceTag', () => {
  it.each([
    [{ amount: 200, decimals: true }, '200.00'],
    [{ amount: 10900 }, '10,900'],
    [{ amount: 2000, grouping: false }, '2000'],
  ])('formats %o as %s', (props, expected) => {
    const wrapper = mount(PriceTag, { props, global })

    expect(wrapper.text()).toBe(expected)
  })
})

describe('QuantityStepper', () => {
  it('clamps to min/max and emits the new value', async () => {
    const wrapper = mount(QuantityStepper, { props: { modelValue: 1, min: 1, max: 2 }, global })
    const [decrease, increase] = wrapper.findAll('button')

    expect(decrease!.attributes('disabled')).toBeDefined()
    await increase!.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[2]])
  })

  it('turns lime only for the highlight variant once a quantity is picked', () => {
    const highlight = mount(QuantityStepper, { props: { modelValue: 1 }, global })
    const surface = mount(QuantityStepper, { props: { modelValue: 1, variant: 'surface' }, global })

    expect(highlight.classes()).toContain('bg-accent')
    expect(surface.classes()).toContain('bg-surface')
  })
})

describe('BaseModal', () => {
  it('closes on Escape and labels the dialog with its title', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        open: true,
        title: 'عنوان',
        'onUpdate:open': (value: boolean) => wrapper.setProps({ open: value }),
      },
      global,
      attachTo: document.body,
    })
    await nextTick()
    const dialog = document.querySelector('[role="dialog"]')

    expect(dialog?.getAttribute('aria-labelledby')).toBe(document.querySelector('h2')?.id)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()
    expect(wrapper.emitted('update:open')).toEqual([[false]])
    wrapper.unmount()
  })
})

describe('AppFooter', () => {
  it.each([
    ['default', true],
    ['guest', false],
  ] as const)('%s variant renders the links row: %s', async (variant, hasLinks) => {
    const { default: AppFooter } = await import('@/components/layout/AppFooter.vue')
    const { default: router } = await import('@/router')
    const wrapper = mount(AppFooter, { props: { variant }, global: { plugins: [i18n, router] } })

    expect(wrapper.find('a[href="/terms"]').exists()).toBe(hasLinks)
    expect(wrapper.text()).toContain(`© ${new Date().getFullYear()} Auto X`)
  })
})
