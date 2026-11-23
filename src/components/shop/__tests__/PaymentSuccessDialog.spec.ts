import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import PaymentSuccessDialog from '@/components/shop/PaymentSuccessDialog.vue'
import { i18n } from '@/plugins/i18n'

describe('PaymentSuccessDialog', () => {
  it('confirms the payment with its title and hint, without an action button', () => {
    const wrapper = mount(PaymentSuccessDialog, {
      props: { open: true },
      global: { plugins: [i18n] },
      attachTo: document.body,
    })
    const dialog = document.body.querySelector('[role="dialog"]')!

    expect(dialog.querySelector('h2')?.textContent).toBe('تم الدفع بنجاح')
    expect(dialog.textContent).toContain('تم استلام المبلغ وتأكيد طلبك')
    expect(dialog.querySelectorAll('button:not([data-modal-close])')).toHaveLength(0)

    wrapper.unmount()
  })
})
