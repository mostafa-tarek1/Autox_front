/** One parsed line of pasted Excel data, split into cells. */
export type ExcelRow = string[]

/** A part number + quantity pair ready to search for. */
export interface ExcelSearchItem {
  partNumber: string
  quantity: number
}

const CELL_SEPARATOR = /\t|,|;/

/**
 * Splits text copied from Excel (tab separated) or typed by hand (comma, semicolon or spaces) into
 * rows of cells. Blank lines are dropped.
 */
export function parseExcelText(text: string): ExcelRow[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => (CELL_SEPARATOR.test(line) ? line.split(CELL_SEPARATOR) : line.split(/\s+/)))
    .map((cells) => cells.map((cell) => cell.trim()))
}

/** Number of columns in the widest row. */
export function columnCount(rows: ExcelRow[]): number {
  return rows.reduce((max, row) => Math.max(max, row.length), 0)
}

/** Spreadsheet-style column letter: 0 → A, 25 → Z, 26 → AA. */
export function columnLetter(index: number): string {
  let letter = ''
  for (let value = index + 1; value > 0; value = Math.floor((value - 1) / 26)) {
    letter = String.fromCharCode(65 + ((value - 1) % 26)) + letter
  }
  return letter
}

/** Maps rows to search items using the chosen columns; quantity defaults to 1. */
export function toSearchItems(
  rows: ExcelRow[],
  partColumn: number,
  quantityColumn: number | null,
): ExcelSearchItem[] {
  return rows
    .map((row) => {
      const quantity =
        quantityColumn === null ? NaN : Number.parseInt(row[quantityColumn] ?? '', 10)
      return {
        partNumber: row[partColumn] ?? '',
        quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
      }
    })
    .filter((item) => item.partNumber !== '')
}
