import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import WithdrawDrawer from '@/components/dashboard/finance/WithdrawDrawer.vue'
import { i18n } from '@/plugins/i18n'

function mountDrawer() {
  const wrapper = mount(WithdrawDrawer, {
    props: { open: false, withdrawable: 250 },
    global: { plugins: [i18n] },
    attachTo: document.body,
  })
  return wrapper
}

const dialog = () => document.querySelector('[role="dialog"]') as HTMLElement
const button = (label: string) =>
  [...dialog().querySelectorAll('button')].find(
    (b) => b.textContent?.trim() === label,
  ) as HTMLButtonElement

async function type(input: HTMLInputElement, value: string) {
  input.value = value
  input.dispatchEvent(new Event('input'))
  await flushPromises()
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('WithdrawDrawer', () => {
  it('rejects an amount above the withdrawable balance', async () => {
    const wrapper = mountDrawer()
    await wrapper.setProps({ open: true })
    await flushPromises()

    await type(dialog().querySelector('input[inputmode="decimal"]')!, '300')
    button('ارسال الطلب').click()
    await flushPromises()

    expect(dialog().textContent).toContain('المبلغ اكبر من الرصيد القابل للسحب')
    expect(wrapper.emitted('submitted')).toBeUndefined()
    wrapper.unmount()
  })

  it('adds a new account, selects it and sends the request with it', async () => {
    const wrapper = mountDrawer()
    await wrapper.setProps({ open: true })
    await flushPromises()
    const accountsBefore = dialog().querySelectorAll('input[type="radio"]').length

    button('اضف حساب اخر').click()
    await flushPromises()
    const select = dialog().querySelector('select') as HTMLSelectElement
    select.selectedIndex = 1
    select.dispatchEvent(new Event('change'))
    const [beneficiary, iban] = [...dialog().querySelectorAll('input')] as HTMLInputElement[]
    await type(beneficiary!, 'شركة الاختبار')
    await type(iban!, 'SA0380000000608010167519')
    button('اضافة').click()
    await flushPromises()

    const radios = [...dialog().querySelectorAll('input[type="radio"]')] as HTMLInputElement[]
    expect(radios).toHaveLength(accountsBefore + 1)
    expect(radios.at(-1)!.checked).toBe(true)

    await type(dialog().querySelector('input[inputmode="decimal"]')!, '100')
    button('ارسال الطلب').click()
    await flushPromises()

    expect(wrapper.emitted('submitted')?.[0]?.[0]).toMatchObject({ amount: 100 })
    wrapper.unmount()
  })
})
