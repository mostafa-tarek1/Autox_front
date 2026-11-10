/**
 * Shared layout loaders. Route files must use these exact references (not their own
 * `() => import(...)`) so router/index.ts can merge every feature's children under one
 * layout record — the layout then stays mounted when navigating between features.
 */
export const DefaultLayout = () => import('@/layouts/DefaultLayout.vue')
export const AuthLayout = () => import('@/layouts/AuthLayout.vue')
