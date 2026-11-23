<script setup lang="ts">
import DashboardNotifications from '@/components/dashboard/layout/DashboardNotifications.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, RouterView, useRouter } from 'vue-router'

import DashboardUserMenu from '@/components/dashboard/layout/DashboardUserMenu.vue'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher.vue'
import SupportFab from '@/components/layout/SupportFab.vue'
import AppLogo from '@/components/ui/AppLogo.vue'

/**
 * Full-width shell of the product editing pages (catalog picker, add part, Excel review): the design
 * drops the sidebar and uses the site-style 72px top bar (logo + notifications, language, user).
 * Meant to be the route component of those pages (see the agent report for the route wiring).
 */
const { t } = useI18n()
const router = useRouter()
const supplier = { name: 'فهد العتيبي' }
</script>

<template>
  <div class="flex min-h-dvh flex-col bg-surface">
    <header class="sticky top-0 z-40 bg-white/90 shadow-soft backdrop-blur-[16px]">
      <div
        class="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 xl:px-14"
      >
        <RouterLink
          :to="{ name: 'dashboard' }"
          class="shrink-0"
          :aria-label="t('dashboard.nav.home')"
        >
          <AppLogo class="h-8 w-[119px]" />
        </RouterLink>
        <div class="flex items-center gap-2 sm:gap-4">
          <DashboardNotifications />
          <LanguageSwitcher class="hidden sm:block" />
          <DashboardUserMenu :name="supplier.name" @logout="router.push({ name: 'login' })" />
        </div>
      </div>
    </header>
    <main id="main" class="flex-1 pb-16">
      <RouterView />
    </main>
    <AppFooter />
    <SupportFab />
  </div>
</template>
