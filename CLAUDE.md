# Auto-X frontend

Vue 3 SPA for the Auto-X project. The Laravel API lives in a separate repo (`../Autox`).
The current phase is **UI only**: screens use local mock data and are wired to the API later.

## Design source

- Figma: https://www.figma.com/design/zQFGAGvgBehJcaT4EXUHJW/Auto-X
- Read design data with the `figma-context` MCP (needs `FIGMA_API_KEY` in the environment).
  Use `figwright` only when the live canvas is needed (plugin open in Figma desktop).
- Export images/icons from Figma into `src/assets` (SVG for icons and logos, WebP/PNG at 2x for photos).
  Never hot-link Figma image URLs: they expire.

## Conventions

- `<script setup lang="ts">`, Composition API, typed props/emits (`defineProps<...>()`).
- Styling is Tailwind v4. Colors, fonts, radii and shadows are tokens in `src/styles/main.css`
  (`@theme`), taken from Figma. Never hard-code a hex value in a component.
- Arabic is the default locale and is RTL. Use logical utilities (`ps-`, `pe-`, `ms-`, `me-`,
  `start-`, `end-`, `text-start`) instead of `pl-/pr-/left-/right-`. All copy goes through
  vue-i18n (`src/locales/*.json`), never inline strings.
- Views in `src/views` are lazy-loaded routes; shared building blocks go in `src/components/ui`,
  app chrome (header, footer, sidebar) in `src/components/layout`, page shells in `src/layouts`.
- Before finishing: `npm run type-check`, `npm run lint`, `npx vitest run`, `npm run build-only`.
- Install packages with npm 11 (`npx -y npm@11 install`); npm 10.9 crashes on this dependency tree.
