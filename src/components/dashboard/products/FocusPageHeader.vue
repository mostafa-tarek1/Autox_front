<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

import ArrowIcon from '@/assets/icons/arrow-right-02--stroke-rounded.svg'

/** Title row of the full-width product pages: back button, H1, and an action at the end. */
defineProps<{ title: string; back: RouteLocationRaw }>()
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-4 py-8">
    <div class="flex min-w-0 items-center gap-3">
      <RouterLink
        :to="back"
        class="grid size-[34px] shrink-0 place-items-center rounded-xl border border-line p-2 text-primary transition-colors hover:border-accent"
        :aria-label="t('dashboard.products.back')"
      >
        <ArrowIcon class="size-4 ltr:-scale-x-100" aria-hidden="true" />
      </RouterLink>
      <h1 class="text-[24px]/9 font-bold text-ink sm:text-h1">{{ title }}</h1>
    </div>
    <slot name="action" />
  </div>
</template>
