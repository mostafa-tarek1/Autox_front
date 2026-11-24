import { fileURLToPath } from 'node:url'

import tailwindcss from '@tailwindcss/vite'

import { svgComponents } from './vite.shared.ts'

/**
 * Public path the app is served from: `/` locally, a cPanel folder for the static build
 * (`npm run build:cpanel` → https://domain/partsx/).
 */
const baseURL = process.env.NUXT_APP_BASE_URL ?? '/'

/**
 * Pages Nitro pre-renders into their own folder (orders/index.html …) on `nuxt generate`. Links
 * found on these pages are crawled too; any other URL falls back to 200.html (client-rendered).
 */
const prerenderRoutes = [
  '/',
  '/landing',
  '/splash',
  '/login',
  '/register',
  '/pending-approval',
  '/cart',
  '/checkout',
  '/checkout/payment',
  '/checkout/payment/bank-transfer',
  '/orders',
  '/orders/ord-1001',
  '/orders/ord-901/return',
  '/returns',
  '/quotes',
  '/quotes/request',
  '/quotes/quote-1/payment',
  '/account',
  '/account/company',
  '/account/addresses',
  '/account/bank',
  '/wallet',
  '/wallet/withdraw',
  '/payments',
  '/vouchers',
  '/vouchers/new',
  '/vouchers/transactions',
  '/contact',
  '/privacy',
  '/terms',
  '/dashboard',
  '/dashboard/welcome',
  '/dashboard/products',
  '/dashboard/products/new',
  '/dashboard/products/catalog',
  '/dashboard/products/excel-review',
  '/dashboard/quotes',
  '/dashboard/quotes/rfq-1/offer',
  '/dashboard/balance',
  '/dashboard/invoices',
  '/dashboard/profile',
]

/**
 * Runs before the app paints: a visitor who picked English or Urdu gets the right lang/dir at once
 * and the page stays hidden until the client switches the pre-rendered Arabic markup over
 * (src/nuxt/plugins/i18n.ts removes the flag), so no Arabic flashes first.
 */
const localeBootScript = `(function(){try{var l=localStorage.getItem('autox.locale');if(l==='en'||l==='ur'){var h=document.documentElement;h.lang=l;h.dir=l==='ur'?'rtl':'ltr';h.setAttribute('data-locale-pending','')}}catch(e){}})()`

export default defineNuxtConfig({
  compatibilityDate: '2026-11-24',
  srcDir: 'src/',
  /**
   * The app keeps its own structure: routes from src/router (see router.options.ts), layouts as
   * route components, explicit imports. Nuxt's convention folders are moved out of the way so
   * src/plugins, src/layouts and src/components are not picked up as Nuxt plugins/layouts.
   */
  dir: {
    layouts: 'nuxt/layouts',
    middleware: 'nuxt/middleware',
    pages: 'nuxt/pages',
    plugins: 'nuxt/plugins',
  },
  pages: true,
  components: { dirs: [] },
  imports: { autoImport: false, scan: false },
  modules: ['@pinia/nuxt'],
  css: ['~/styles/main.css'],
  telemetry: false,
  /** Same port as before, so the LAN link (http://<ip>:5173) keeps working. */
  devServer: { port: 5173 },
  devtools: { enabled: false },
  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'ar', dir: 'rtl' },
      title: 'Parts X',
      link: [{ rel: 'icon', href: `${baseURL}favicon.ico` }],
      style: [{ innerHTML: 'html[data-locale-pending] body{visibility:hidden}' }],
      script: [{ innerHTML: localeBootScript, tagPosition: 'head' }],
    },
  },
  vite: {
    plugins: [tailwindcss(), svgComponents()],
  },
  hooks: {
    /**
     * `*.svg` imports are Vue components (vite-svg-loader); this typing must come before Vite's
     * client types, which declare them as URL strings.
     */
    'prepare:types': ({ references }) => {
      references.unshift({
        path: fileURLToPath(new URL('./src/svg-component.d.ts', import.meta.url)),
      })
    },
  },
  typescript: {
    strict: true,
    tsConfig: { compilerOptions: { noUncheckedIndexedAccess: true } },
  },
  /**
   * The OTP screen reads the phone from browser history state (never the URL), so it only renders
   * in the browser; without that state it sends the visitor back to login, as before.
   */
  routeRules: { '/verify': { ssr: false } },
  nitro: {
    compressPublicAssets: { gzip: true, brotli: true },
    prerender: { crawlLinks: true, routes: prerenderRoutes },
  },
})
