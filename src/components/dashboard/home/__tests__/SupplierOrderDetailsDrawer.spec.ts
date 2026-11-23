import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import SupplierOrderDetailsDrawer from '@/components/dashboard/home/SupplierOrderDetailsDrawer.vue'
import { supplierOrders, type SupplierOrderStatus } from '@/mocks/dashboard'
import { i18n } from '@/plugins/i18n'

function openFor(status: SupplierOrderStatus) {
  const order = { ...supplierOrders[0]!, status }
  return mount(SupplierOrderDetailsDrawer, {
    props: { open: true, order },
    global: { plugins: [i18n] },
    attachTo: document.body,
  })
}

describe('SupplierOrderDetailsDrawer', () => {
  it('hides the customer contact details until the order is paid', async () => {
    const wrapper = openFor('awaitingPayment')
    await nextTick()

    expect(document.body.textContent).toContain('سيتم اظهار البيانات بعد اتمام الدفع')
    expect(document.body.textContent).not.toContain('+966 5512345678')
    wrapper.unmount()
  })

  it('shows the customer contact details once paid', async () => {
    const wrapper = openFor('paidReadyToShip')
    await nextTick()

    expect(document.body.textContent).toContain('+966 5512345678')
    wrapper.unmount()
  })
})
