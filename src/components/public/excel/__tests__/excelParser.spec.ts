import { describe, expect, it } from 'vitest'

import { columnCount, columnLetter, parseExcelText, toSearchItems } from '../excelParser'

describe('excelParser', () => {
  it('splits tab, comma, semicolon and space separated lines and drops blank lines', () => {
    const rows = parseExcelText('0111-1234\t2\n\n0111-1235,3\n0111-1236;1\n0111-1237 4')

    expect(rows).toEqual([
      ['0111-1234', '2'],
      ['0111-1235', '3'],
      ['0111-1236', '1'],
      ['0111-1237', '4'],
    ])
    expect(columnCount(rows)).toBe(2)
  })

  it('names columns like a spreadsheet', () => {
    expect([columnLetter(0), columnLetter(1), columnLetter(25), columnLetter(26)]).toEqual([
      'A',
      'B',
      'Z',
      'AA',
    ])
  })

  it('maps rows to search items and defaults a missing or invalid quantity to 1', () => {
    const rows = parseExcelText('0111-1234\t2\n0111-1235\tx\n0111-1236')

    expect(toSearchItems(rows, 0, 1)).toEqual([
      { partNumber: '0111-1234', quantity: 2 },
      { partNumber: '0111-1235', quantity: 1 },
      { partNumber: '0111-1236', quantity: 1 },
    ])
    expect(toSearchItems(rows, 0, null).every((item) => item.quantity === 1)).toBe(true)
  })
})
