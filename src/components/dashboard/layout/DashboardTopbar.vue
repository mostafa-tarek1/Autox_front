<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import NotificationIcon from '@/assets/icons/notification-02--stroke-rounded.svg'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher.vue'
import NavIconButton from '@/components/layout/NavIconButton.vue'

import DashboardUserMenu from './DashboardUserMenu.vue'

const emit = defineEmits<{ openMenu: [] }>()
const { t, te } = useI18n()
const route = useRoute()
const router = useRouter()

/** Mock session data for the UI phase. */
const supplier = { name: 'فهد العتيبي' }
const notificationsCount = 3

const title = computed(() => {
  const key = `pageTitles.${route.meta.title}`
  return route.meta.title && te(key) ? t(key) : t('dashboard.nav.home')
})

function logout(): void {
  router.push({ name: 'login' })
}
</script>

<template>
  <header
    class="sticky top-0 z-30 flex h-[72px] shrink-0 items-center justify-between gap-4 border-b-[0.5px] border-line bg-white px-4 sm:px-6"
  >
    <div class="flex min-w-0 items-center gap-3">
      <button
        type="button"
        class="grid size-10 shrink-0 place-items-center rounded-full border-[0.5px] border-line bg-surface lg:hidden"
        :aria-label="t('nav.openMenu')"
        @click="emit('openMenu')"
      >
        <span class="flex w-4 flex-col gap-1" aria-hidden="true">
          <span class="h-0.5 rounded bg-ink" />
          <span class="h-0.5 rounded bg-ink" />
          <span class="h-0.5 rounded bg-ink" />
        </span>
      </button>
      <h1 class="truncate text-h4 text-ink">{{ title }}</h1>
    </div>
    <div class="flex items-center gap-2 sm:gap-4">
      <NavIconButton :label="t('nav.notifications')" :count="notificationsCount">
        <NotificationIcon class="size-6 text-primary" aria-hidden="true" />
      </NavIconButton>
      <LanguageSwitcher class="hidden sm:block" />
      <DashboardUserMenu :name="supplier.name" @logout="logout" />
    </div>
  </header>
</template>
