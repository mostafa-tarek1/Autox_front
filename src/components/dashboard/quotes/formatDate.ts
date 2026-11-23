/** "2026-11-15" → "15/11/2026", the format used across the dashboard frames. */
export function formatQuoteDate(iso: string): string {
  const [year, month, day] = iso.split('-')
  return `${day}/${month}/${year}`
}
