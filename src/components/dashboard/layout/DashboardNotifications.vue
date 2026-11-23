<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref, useTemplateRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import NotificationIcon from '@/assets/icons/notification-02--stroke-rounded.svg'
import NavIconButton from '@/components/layout/NavIconButton.vue'
import { mockSupplierNotifications } from '@/components/layout/notifications'
import NotificationsMenu from '@/components/layout/NotificationsMenu.vue'

/** Supplier notifications bell + menu, shared by every dashboard header. */
const { t } = useI18n()
const route = useRoute()
const notifications = mockSupplierNotifications

const isOpen = ref(false)
const root = useTemplateRef<HTMLElement>('root')
onClickOutside(root, () => (isOpen.value = false))
watch(
  () => route.fullPath,
  () => (isOpen.value = false),
)
</script>

<template>
  <div ref="root" class="relative">
    <NavIconButton
      :label="t('nav.notifications')"
      :count="notifications.length"
      aria-haspopup="dialog"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
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
        v-if="isOpen"
        :notifications="notifications"
        class="fixed inset-x-4 top-[84px] z-40 sm:absolute sm:inset-x-auto sm:end-0 sm:top-full sm:mt-3"
        @close="isOpen = false"
      />
    </Transition>
  </div>
</template>
