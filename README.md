# Parts X Frontend

Nuxt 4 (Vue 3 + TypeScript) + Tailwind CSS v4 + Pinia + Vue Router + vue-i18n (Arabic RTL / English / Urdu).
Pages are pre-rendered as static HTML (`nuxt generate`).

## Setup

```sh
npx -y npm@11 install
npm run dev
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Nuxt dev server (server-rendered) on http://localhost:5173 |
| `npm run build` | Type-check and static build into `.output/public` |
| `npm run build:cpanel` | Same, for the cPanel folder https://domain/partsx/ |
| `npm run test:unit` | Vitest |
| `npm run lint` | oxlint + ESLint (auto-fix) |
| `npm run format` | Prettier |
