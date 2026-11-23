import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import QuotesTable from '@/components/dashboard/quotes/QuotesTable.vue'
import { formatQuoteDate } from '@/components/dashboard/quotes/formatDate'
import { supplierQuotes } from '@/mocks/dashboard-quotes'
import { i18n } from '@/plugins/i18n'

describe('dashboard QuotesTable', () => {
  it('renders one row per quote with its status and emits view with that quote', async () => {
    const wrapper = mount(QuotesTable, {
      props: { quotes: supplierQuotes },
      global: { plugins: [i18n] },
    })
    const rows = wrapper.findAll('tbody tr')

    expect(rows).toHaveLength(supplierQuotes.length)
    expect(rows[0]!.text()).toContain('بانتظار عرضك')
    await rows[1]!.find('button').trigger('click')
    expect(wrapper.emitted('view')).toEqual([[supplierQuotes[1]]])
  })

  it('formats ISO dates as day/month/year', () => {
    expect(formatQuoteDate('2026-11-15')).toBe('15/11/2026')
  })
})
