import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import InstallmentProviderPicker from '@/components/billing/InstallmentProviderPicker.vue'

describe('InstallmentProviderPicker', () => {
  it('emits the chosen provider and marks it as checked', async () => {
    const wrapper = mount(InstallmentProviderPicker, {
      props: {
        label: 'اختر طريقة التقسيط',
        modelValue: null,
        'onUpdate:modelValue': (value: 'tabby' | 'tamara' | null) =>
          wrapper.setProps({ modelValue: value }),
      },
    })

    await wrapper.find('input[value="tamara"]').setValue(true)

    expect(wrapper.emitted('update:modelValue')).toEqual([['tamara']])
    expect((wrapper.find('input[value="tamara"]').element as HTMLInputElement).checked).toBe(true)
  })

  it('shows the validation error and links it to the group', () => {
    const wrapper = mount(InstallmentProviderPicker, {
      props: { label: 'اختر', error: 'اختر طريقة التقسيط' },
    })
    const errorId = wrapper.find('[role="alert"]').attributes('id')

    expect(wrapper.find('fieldset').attributes('aria-describedby')).toBe(errorId)
  })
})
