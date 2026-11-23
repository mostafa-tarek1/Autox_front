<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { computed, ref, useTemplateRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import NotificationIcon from '@/assets/icons/notification-02--stroke-rounded.svg'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher.vue'
import NavIconButton from '@/components/layout/NavIconButton.vue'
import { mockSupplierNotifications } from '@/components/layout/notifications'
import NotificationsMenu from '@/components/layout/NotificationsMenu.vue'

import DashboardUserMenu from './DashboardUserMenu.vue'

const emit = defineEmits<{ openMenu: [] }>()
const { t, te } = useI18n()
const route = useRoute()
const router = useRouter()

/** Mock session data for the UI phase. */
const supplier = { name: 'فهد العتيبي' }
const notifications = mockSupplierNotifications

const isNotificationsOpen = ref(false)
const notificationsRoot = useTemplateRef<HTMLElement>('notificationsRoot')
onClickOutside(notificationsRoot, () => (isNotificationsOpen.value = false))
watch(
  () => route.fullPath,
  () => (isNotificationsOpen.value = false),
)

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
      <div ref="notificationsRoot" class="relative">
        <NavIconButton
          :label="t('nav.notifications')"
          :count="notifications.length"
          aria-haspopup="dialog"
          :aria-expanded="isNotificationsOpen"
          @click="isNotificationsOpen = !isNotificationsOpen"
        >
          <NotificationIcon class="size-6 text-primary" aria-hidden="true" />
        </NavIconButton>
        <Transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="opacity-0 -translate-y-1"
          leave-active-class="transition duration-100 ease-in"
          leave-to-class="opacity-0 -translate-y-1"
        >
          <NotificationsMenu
            v-if="isNotificationsOpen"
            :notifications="notifications"
            class="fixed inset-x-4 top-[84px] z-40 sm:absolute sm:inset-x-auto sm:end-0 sm:top-full sm:mt-3"
            @close="isNotificationsOpen = false"
          />
        </Transition>
      </div>
      <LanguageSwitcher class="hidden sm:block" />
      <DashboardUserMenu :name="supplier.name" @logout="logout" />
    </div>
  </header>
</template>
