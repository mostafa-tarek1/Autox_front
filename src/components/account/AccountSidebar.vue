<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

import UserIcon from '@/assets/icons/user--duotone-rounded.svg'

defineProps<{ name: string }>()
const { t } = useI18n()

const links = [
  { key: 'personal', to: { name: 'account' } },
  { key: 'company', to: { name: 'account-company' } },
  { key: 'addresses', to: { name: 'account-addresses' } },
  { key: 'bank', to: { name: 'account-bank' } },
] as const
</script>

<template>
  <aside class="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-card sm:p-6">
    <div class="flex items-center gap-2">
      <span
        class="grid size-12 shrink-0 place-items-center rounded-full bg-surface p-3 text-primary"
      >
        <UserIcon class="size-6" aria-hidden="true" />
      </span>
      <p class="min-w-0 flex-1 truncate text-h4 text-ink">{{ name }}</p>
    </div>

    <hr class="border-line" />

    <nav :aria-label="t('account.sections')">
      <ul class="flex flex-col gap-4">
        <li v-for="link in links" :key="link.key">
          <RouterLink
            :to="link.to"
            exact-active-class="bg-accent! border-accent!"
            class="flex h-[46px] items-center justify-start rounded-xl border border-line bg-surface px-6 py-2 text-button text-primary transition-colors hover:border-accent"
          >
            {{ t(`account.nav.${link.key}`) }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>
