<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import CalendarIcon from '@/assets/icons/calendar-02--stroke-rounded.svg?component'
import DeleteIcon from '@/assets/icons/delete-01--stroke-standard.svg?component'
import { formatDate } from '@/components/billing/formatDate'
import StatusChip from '@/components/billing/StatusChip.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import type { QuoteRequest } from '@/mocks/quotes'

defineProps<{ request: QuoteRequest }>()
const emit = defineEmits<{ viewOffers: [request: QuoteRequest]; remove: [request: QuoteRequest] }>()
const { t } = useI18n()
</script>

<template>
  <article class="flex flex-col gap-4 bg-white p-4">
    <header class="flex items-center justify-between gap-4 rounded-lg bg-surface px-4 py-3">
      <div class="flex flex-wrap items-center gap-6">
        <StatusChip v-if="request.status === 'offersReceived'" tone="highlight">
          {{ t('quotes.offersSubmitted', { count: request.offers.length }) }}
        </StatusChip>
        <StatusChip v-else tone="pending">{{ t('quotes.awaitingOffers') }}</StatusChip>
        <p class="flex items-center gap-1 text-body-sm">
          <CalendarIcon class="size-4 text-primary" aria-hidden="true" />
          <span class="text-secondary">{{ t('quotes.requestDate') }}</span>
          <span class="text-ink tabular-nums">{{ formatDate(request.date) }}</span>
        </p>
      </div>
      <button
        type="button"
        class="grid size-[34px] shrink-0 place-items-center rounded-xl border border-line bg-surface text-secondary transition-colors hover:border-error hover:text-error"
        :aria-label="t('quotes.deleteRequest')"
        @click="emit('remove', request)"
      >
        <DeleteIcon class="size-4" aria-hidden="true" />
      </button>
    </header>

    <ul class="flex flex-col gap-4">
      <li
        v-for="item in request.items"
        :key="item.id"
        class="flex items-center justify-between gap-2 rounded-lg border border-line p-3"
      >
        <div class="flex min-w-0 flex-col gap-2">
          <p class="text-body-sm text-ink">{{ item.name }}</p>
          <p class="text-body-sm text-muted">
            <bdi dir="ltr">{{ item.partNumber }}</bdi> · {{ t(`catalog.origins.${item.origin}`) }}
          </p>
        </div>
        <span class="shrink-0 text-body-sm text-muted">{{
          t('quotes.quantity', { count: item.quantity })
        }}</span>
      </li>
    </ul>

    <BaseButton
      v-if="request.status === 'offersReceived'"
      class="w-fit px-10"
      @click="emit('viewOffers', request)"
    >
      {{ t('quotes.viewOffers') }}
    </BaseButton>
  </article>
</template>
