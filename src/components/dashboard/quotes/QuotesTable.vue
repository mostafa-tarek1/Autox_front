<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import ViewIcon from '@/assets/icons/view--stroke-rounded.svg'
import PriceTag from '@/components/ui/PriceTag.vue'
import type { SupplierQuote } from '@/mocks/dashboard-quotes'

import { formatQuoteDate } from './formatDate'
import QuoteStatusChip from './QuoteStatusChip.vue'

/** Quotes table (Figma "Frame 763" + "Frame 762" rows): table on desktop, cards on phones. */
defineProps<{ quotes: SupplierQuote[] }>()
const emit = defineEmits<{ view: [quote: SupplierQuote] }>()
const { t } = useI18n()

const columns = ['number', 'customer', 'date', 'offer', 'status', 'actions'] as const
/** Column widths from the frame (1148px inner width, 40px gaps, 16px row padding). */
const widths = ['w-[98px]', 'w-[175px]', 'w-[174px]', 'w-[199px]', 'w-[112px]', 'w-[158px]']
</script>

<template>
  <div>
    <ul class="flex flex-col gap-3 md:hidden">
      <li
        v-for="quote in quotes"
        :key="quote.id"
        class="flex flex-col gap-3 rounded-2xl border border-line bg-white p-4"
      >
        <div class="flex items-center justify-between gap-2">
          <span class="text-body-md text-secondary">#{{ quote.number }}</span>
          <QuoteStatusChip :status="quote.status" />
        </div>
        <dl class="grid grid-cols-2 gap-x-4 gap-y-2 text-body-sm">
          <dt class="text-secondary">{{ t('dashboard.quotes.columns.customer') }}</dt>
          <dd class="text-ink">{{ quote.customerName }}</dd>
          <dt class="text-secondary">{{ t('dashboard.quotes.columns.date') }}</dt>
          <dd class="text-ink tabular-nums">{{ formatQuoteDate(quote.date) }}</dd>
          <dt class="text-secondary">{{ t('dashboard.quotes.columns.offer') }}</dt>
          <dd>
            <PriceTag
              :amount="quote.offeredPrice"
              decimals
              :grouping="false"
              size="md"
              tone="ink"
            />
          </dd>
        </dl>
        <button
          type="button"
          class="flex h-9 items-center justify-center gap-1 rounded-lg bg-surface px-2 text-body-sm text-primary"
          :aria-label="t('dashboard.quotes.viewQuote', { number: quote.number })"
          @click="emit('view', quote)"
        >
          <ViewIcon class="size-5" aria-hidden="true" />
          {{ t('dashboard.quotes.view') }}
        </button>
      </li>
    </ul>

    <table class="hidden w-full border-separate border-spacing-0 text-start md:table">
      <thead>
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="column"
            scope="col"
            class="h-14 bg-surface py-4 text-start text-body-md font-normal text-ink"
            :class="[
              index === 0 ? 'rounded-s-xl ps-4' : 'ps-10',
              index === columns.length - 1 && 'rounded-e-xl pe-4',
              widths[index],
            ]"
          >
            {{ t(`dashboard.quotes.columns.${column}`) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!quotes.length">
          <td :colspan="columns.length" class="py-10 text-center text-body-md text-secondary">
            {{ t('dashboard.quotes.empty') }}
          </td>
        </tr>
        <tr
          v-for="quote in quotes"
          :key="quote.id"
          class="group transition-colors hover:bg-surface [&>td]:h-[65px] [&>td]:border-b [&>td]:border-line [&>td+td]:ps-10"
        >
          <td class="ps-4 text-body-md text-secondary">#{{ quote.number }}</td>
          <td class="text-body-md text-secondary">{{ quote.customerName }}</td>
          <td class="text-body-md text-secondary tabular-nums">
            {{ formatQuoteDate(quote.date) }}
          </td>
          <td>
            <PriceTag
              :amount="quote.offeredPrice"
              decimals
              :grouping="false"
              size="md"
              tone="ink"
            />
          </td>
          <td><QuoteStatusChip :status="quote.status" /></td>
          <td class="pe-4">
            <button
              type="button"
              class="inline-flex h-8 items-center gap-1 rounded-lg bg-surface px-2 py-1 text-body-sm text-primary transition-colors group-hover:bg-accent hover:bg-accent"
              :aria-label="t('dashboard.quotes.viewQuote', { number: quote.number })"
              @click="emit('view', quote)"
            >
              <ViewIcon class="size-5" aria-hidden="true" />
              {{ t('dashboard.quotes.view') }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
