<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import CancelIcon from '@/assets/icons/cancel-circle--stroke-rounded.svg'
import HotPriceIcon from '@/assets/icons/hot-price--stroke-standard.svg'
import CartCheckIcon from '@/assets/icons/shopping-cart-check-01--stroke-standard.svg'
import PriceTag from '@/components/ui/PriceTag.vue'

import type { AppNotification } from './notifications'

/** Bell dropdown (Figma "notifications" 1008:10947). */
defineProps<{ notifications: AppNotification[] }>()
const emit = defineEmits<{ close: [] }>()
const { t } = useI18n()
</script>

<template>
  <div
    role="dialog"
    :aria-label="t('notifications.title')"
    class="flex max-h-[calc(100dvh-100px)] w-auto flex-col gap-[18px] overflow-y-auto rounded-3xl border-[0.6px] border-line bg-white pb-6 shadow-card sm:w-[400px]"
  >
    <header class="flex items-center justify-between gap-2 border-b border-line p-4">
      <h2 class="text-h4 text-ink">{{ t('notifications.title') }}</h2>
      <button
        type="button"
        class="text-ink hover:text-error"
        :aria-label="t('common.close')"
        @click="emit('close')"
      >
        <CancelIcon class="size-6" aria-hidden="true" />
      </button>
    </header>

    <p v-if="!notifications.length" class="px-4 text-center text-body-sm text-secondary">
      {{ t('notifications.empty') }}
    </p>
    <ul v-else class="flex flex-col gap-4 px-3">
      <li
        v-for="notification in notifications"
        :key="notification.id"
        class="flex items-start gap-2 rounded-2xl border-[0.5px] border-line bg-surface p-2"
      >
        <span
          class="grid size-10 shrink-0 place-items-center self-center rounded-xl bg-white p-2 text-ink shadow-card"
        >
          <HotPriceIcon
            v-if="notification.kind === 'quoteOffer'"
            class="size-6"
            aria-hidden="true"
          />
          <CartCheckIcon v-else class="size-6" aria-hidden="true" />
        </span>
        <div class="flex min-w-0 flex-1 flex-col items-start gap-1">
          <p class="text-body-sm text-ink">
            {{ t(`notifications.kinds.${notification.kind}.title`, notification.params) }}
          </p>
          <PriceTag
            v-if="notification.amount !== undefined"
            :amount="notification.amount"
            size="md"
            tone="primary"
          />
          <p v-else class="text-body-sm text-secondary">
            {{ t(`notifications.kinds.${notification.kind}.body`) }}
          </p>
        </div>
        <time class="shrink-0 text-body-sm text-secondary" dir="ltr">{{ notification.time }}</time>
      </li>
    </ul>
  </div>
</template>
