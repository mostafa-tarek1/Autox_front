<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import BorderIcon from '@/assets/icons/border-full--stroke-rounded.svg'
import CalendarIcon from '@/assets/icons/calendar-02--stroke-rounded.svg'
import HelpIcon from '@/assets/icons/help-circle--stroke-rounded.svg'

import OrderActionButton from './OrderActionButton.vue'
import OrderMeta from './OrderMeta.vue'
import OrderStatusChip from './OrderStatusChip.vue'
import type { ReturnRequest } from './types'

defineProps<{ request: ReturnRequest }>()
const { t } = useI18n()
</script>

<template>
  <article class="flex flex-col gap-4 rounded-2xl border border-line bg-white p-4">
    <header
      class="flex flex-col gap-4 rounded-lg bg-surface px-4 py-3 md:flex-row md:items-center md:justify-between"
    >
      <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
        <OrderStatusChip kind="return" :status="request.status" />
        <OrderMeta :icon="BorderIcon" :label="t('orders.meta.orderNumber')">
          <span dir="ltr">{{ request.orderNumber }}</span>
        </OrderMeta>
        <OrderMeta :icon="CalendarIcon" :label="t('orders.meta.orderDate')">{{
          request.date
        }}</OrderMeta>
      </div>
      <OrderActionButton
        tone="outline"
        :to="{ name: 'order-details', params: { id: request.orderId } }"
      >
        {{ t('orders.actions.details') }}
      </OrderActionButton>
    </header>

    <div
      v-if="request.rejectionReason"
      class="flex items-center gap-3 rounded-2xl bg-error/[0.07] p-3"
    >
      <span class="grid size-14 shrink-0 place-items-center rounded-2xl bg-white p-3">
        <HelpIcon class="size-8 text-error" aria-hidden="true" />
      </span>
      <div class="flex flex-col gap-2">
        <h3 class="text-h4 text-ink">{{ t('returns.rejectionReason') }}</h3>
        <p class="text-body-md text-ink">{{ request.rejectionReason }}</p>
      </div>
    </div>

    <dl class="grid gap-8 rounded-2xl border border-line p-3 sm:grid-cols-2">
      <div class="flex flex-col gap-2">
        <dt class="text-h4 text-ink">{{ t('returns.reason') }}</dt>
        <dd class="text-body-md text-secondary">{{ request.reason }}</dd>
      </div>
      <div class="flex flex-col gap-2">
        <dt class="text-h4 text-ink">{{ t('returns.notes') }}</dt>
        <dd class="text-body-md text-secondary">{{ request.notes }}</dd>
      </div>
    </dl>

    <section class="flex flex-col gap-2 rounded-2xl border border-line p-3">
      <h3 class="text-h4 text-ink">{{ t('returns.photos') }}</h3>
      <ul class="flex flex-wrap gap-2">
        <li
          v-for="(photo, index) in request.photos"
          :key="index"
          class="h-[126px] w-[156px] overflow-hidden bg-surface"
        >
          <img
            :src="photo"
            :alt="t('returns.photoAlt', { index: index + 1 })"
            width="156"
            height="126"
            loading="lazy"
            class="size-full scale-110 object-cover"
          />
        </li>
      </ul>
    </section>
  </article>
</template>
