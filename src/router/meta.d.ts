import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** Key under `pageTitles.*` in the locale files. */
    title?: string
    /** Nav item highlighted in the navbar for this route. */
    nav?: 'home' | 'orders' | 'quoteRequest' | 'quotes' | 'vouchers' | 'contact'
    /** Show the "secure payments / returns / suppliers / support" strip above the footer. */
    featureStrip?: boolean
    /** Space in px between the page content and the footer, from the page's Figma frame. */
    footerGap?: number
    /** Auth pages: space between the card and the parts image on desktop, from the Figma frame. */
    authBannerGap?: number
    /** Supplier dashboard: sidebar link highlighted for this route. */
    dashboardSection?: 'home' | 'products' | 'quotes' | 'balance' | 'invoices'
  }
}
