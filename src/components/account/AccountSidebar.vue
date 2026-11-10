<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

import SecurityCheckIcon from '@/assets/icons/security-check--solid-rounded.svg'
import UserIcon from '@/assets/icons/user--duotone-rounded.svg'

defineProps<{ name: string; isVerified: boolean }>()
const { t } = useI18n()

const links = [
  { key: 'personal', to: { name: 'account' } },
  { key: 'company', to: { name: 'account-company' } },
  { key: 'addresses', to: { name: 'account-addresses' } },
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
      <div class="flex min-w-0 flex-1 items-center justify-between gap-2">
        <p class="truncate text-h4 text-ink">{{ name }}</p>
        <span
          v-if="isVerified"
          class="inline-flex h-8 shrink-0 items-center gap-1 rounded-full bg-surface px-2 py-1 text-body-sm text-primary"
        >
          <SecurityCheckIcon class="size-4" aria-hidden="true" />
          {{ t('account.verified') }}
        </span>
      </div>
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
