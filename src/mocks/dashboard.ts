/**
 * Supplier dashboard mock data for the UI phase. Screen-specific mocks live next to this file
 * (dashboard-*.ts) and are replaced by API calls once the supplier endpoints exist.
 */
export interface DashboardStatsData {
  ordersCount: number
  totalSales: number
  withdrawableBalance: number
  pendingBalance: number
}

/** Values from the Dashboard "الرئيسية" frame (754:15572). */
export const dashboardStats: DashboardStatsData = {
  ordersCount: 2000,
  totalSales: 500,
  withdrawableBalance: 250,
  pendingBalance: 50,
}

/** The "ترحيب" frame (768:16476): a new supplier with no data yet. */
export const emptyDashboardStats: DashboardStatsData = {
  ordersCount: 0,
  totalSales: 0,
  withdrawableBalance: 0,
  pendingBalance: 0,
}
