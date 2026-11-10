<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import NotificationIcon from '@/assets/icons/notification-02--stroke-rounded.svg'
import BaseButton from '@/components/ui/BaseButton.vue'
import type { ExcelResultRow } from '@/mocks/public'

import OfferCell from './OfferCell.vue'

defineProps<{ rows: ExcelResultRow[]; columns: Array<{ key: string }> }>()
const emit = defineEmits<{
  addToCart: [offerId: string, quantity: number]
  notify: [rowId: string]
}>()
const { t } = useI18n()

const hasOffers = (row: ExcelResultRow) => Object.keys(row.offers).length > 0
</script>

<template>
  <div class="overflow-x-auto rounded-lg bg-white px-4 pt-4 pb-6 shadow-card">
    <table class="w-full min-w-[1168px] border-separate border-spacing-0 text-start">
      <colgroup>
        <col class="w-[210px]" />
        <col />
        <col v-for="column in columns" :key="column.key" class="w-[209px]" />
      </colgroup>
      <thead>
        <tr class="text-body-sm text-ink">
          <th scope="col" class="h-14 rounded-s-lg bg-surface px-4 text-start font-normal">
            {{ t('public.excel.columns.part') }}
          </th>
          <th scope="col" class="bg-surface px-4 text-start font-normal">
            {{ t('public.excel.columns.quantity') }}
          </th>
          <th
            v-for="(column, index) in columns"
            :key="column.key"
            scope="col"
            class="bg-surface px-4 text-start font-normal"
            :class="index === columns.length - 1 && 'rounded-e-lg'"
          >
            {{ t(`public.excel.columns.${column.key}`) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="row.id" class="align-top">
          <th
            scope="row"
            class="pt-6 pb-[30px] font-normal"
            :class="rowIndex < rows.length - 1 && 'border-b border-line'"
          >
            <div
              class="flex flex-col items-start justify-center gap-1 rounded-lg bg-surface px-4 text-start"
              :class="hasOffers(row) ? 'h-[162px]' : 'h-[88px] py-4'"
            >
              <span dir="ltr" class="text-h4 text-ink">{{ row.partNumber }}</span>
              <span class="text-body-sm text-muted">{{ row.description }}</span>
            </div>
          </th>

          <template v-if="hasOffers(row)">
            <td
              class="px-4 pt-6 pb-[30px] align-middle text-body-md text-ink tabular-nums"
              :class="rowIndex < rows.length - 1 && 'border-b border-line'"
            >
              {{ row.requestedQuantity }}
            </td>
            <td
              v-for="column in columns"
              :key="column.key"
              class="ps-4 pt-6 pb-[30px]"
              :class="rowIndex < rows.length - 1 && 'border-b border-line'"
            >
              <OfferCell
                v-if="row.offers[column.key]"
                :offer="row.offers[column.key]!"
                :requested-quantity="row.requestedQuantity"
                :part-number="row.partNumber"
                @add-to-cart="(offerId, quantity) => emit('addToCart', offerId, quantity)"
              />
              <div
                v-else
                class="h-[50px] rounded-xl border border-line bg-white"
                :aria-label="t('public.excel.noOffer')"
              />
            </td>
          </template>

          <td
            v-else
            :colspan="columns.length + 1"
            class="px-4 pt-6 pb-[30px] align-middle"
            :class="rowIndex < rows.length - 1 && 'border-b border-line'"
          >
            <div class="flex items-center gap-4">
              <span class="text-body-md text-ink">{{ t('public.excel.unavailable') }}</span>
              <BaseButton variant="primary" size="sm" @click="emit('notify', row.id)">
                <template #icon
                  ><NotificationIcon class="size-[18px]" aria-hidden="true"
                /></template>
                {{ t('public.excel.notifySellers') }}
              </BaseButton>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
