import { describe, expect, it } from 'vitest'

import { excelResults, mockExcelResultsFor } from '@/mocks/public'

describe('mockExcelResultsFor', () => {
  it('returns one row per searched part with its part number and quantity', () => {
    const rows = mockExcelResultsFor([
      { partNumber: '04465-0K240', quantity: 2 },
      { partNumber: '0111-1234', quantity: 3 },
    ])

    expect(rows.map((row) => [row.partNumber, row.requestedQuantity])).toEqual([
      ['04465-0K240', 2],
      ['0111-1234', 3],
    ])
    expect(new Set(rows.map((row) => row.id)).size).toBe(2)
  })

  it('cycles through the design rows so every offer state is shown', () => {
    const rows = mockExcelResultsFor(
      Array.from({ length: excelResults.length + 1 }, (_, index) => ({
        partNumber: `P-${index}`,
        quantity: 1,
      })),
    )

    expect(rows.at(-1)?.offers).toEqual(excelResults[0]?.offers)
  })
})
