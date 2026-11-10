/** "2027-10-15" → "15/10/2027", the date format used across the billing screens. */
export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-')
  return `${Number(day)}/${month}/${year}`
}
