/**
 * vite-svg-loader runs with `defaultImport: 'component'`, so a bare `*.svg` import is a Vue
 * component. Referenced before `vite/client` in env.d.ts so it overrides Vite's string typing.
 */
declare module '*.svg' {
  import type { FunctionalComponent, SVGAttributes } from 'vue'
  const component: FunctionalComponent<SVGAttributes>
  export default component
}
