<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'

import AppLogo from '@/components/ui/AppLogo.vue'

import { dashboardNav } from './dashboardNav'

/** Fixed 228px column on desktop; an off-canvas drawer below lg. */
const open = defineModel<boolean>('open', { default: false })
const { t } = useI18n()
const route = useRoute()

onKeyStroke('Escape', () => (open.value = false))
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-40 bg-ink/40 lg:hidden"
    aria-hidden="true"
    @click="open = false"
  />
  <aside
    class="fixed inset-y-0 start-0 z-50 flex w-[228px] flex-col border-e-[0.5px] border-line bg-white transition-transform lg:sticky lg:top-0 lg:h-dvh lg:translate-x-0!"
    :class="
      open
        ? 'visible translate-x-0'
        : 'invisible ltr:-translate-x-full rtl:translate-x-full lg:visible'
    "
    :aria-label="t('dashboard.nav.label')"
  >
    <RouterLink
      :to="{ name: 'dashboard' }"
      class="flex h-[72px] shrink-0 items-center border-b-[0.5px] border-line px-6"
      :aria-label="t('nav.home')"
    >
      <AppLogo class="h-8 w-[119px]" />
    </RouterLink>
    <nav class="flex flex-col gap-2 pt-6 ps-4 pe-6 pb-6">
      <RouterLink
        v-for="item in dashboardNav"
        :key="item.key"
        :to="{ name: item.routeName }"
        class="flex h-10 items-center gap-2 rounded-xl p-2 text-body-md transition-colors"
        :class="
          route.meta.dashboardSection === item.key
            ? 'bg-accent text-primary'
            : 'text-secondary hover:bg-surface hover:text-primary'
        "
        :aria-current="route.meta.dashboardSection === item.key ? 'page' : undefined"
      >
        <component
          :is="route.meta.dashboardSection === item.key ? item.activeIcon : item.icon"
          class="size-5 shrink-0"
          aria-hidden="true"
        />
        {{ t(`dashboard.nav.${item.key}`) }}
      </RouterLink>
    </nav>
  </aside>
</template>
