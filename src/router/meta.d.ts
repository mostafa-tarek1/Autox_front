import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** Key under `pageTitles.*` in the locale files. */
    title?: string
    /** Nav item highlighted in the navbar for this route. */
    nav?: 'home' | 'orders' | 'quotes' | 'vouchers' | 'contact'
  }
}
