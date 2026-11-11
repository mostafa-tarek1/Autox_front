<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import NotificationIcon from '@/assets/icons/notification-02--stroke-rounded.svg'
import BaseButton from '@/components/ui/BaseButton.vue'
import type { ExcelResultRow } from '@/mocks/public'

import OfferCell from './OfferCell.vue'

const props = defineProps<{ rows: ExcelResultRow[]; columns: Array<{ key: string }> }>()
const emit = defineEmits<{
  addToCart: [offerId: string, quantity: number]
  notify: [rowId: string]
}>()
const { t } = useI18n()

const hasOffers = (row: ExcelResultRow) => Object.keys(row.offers).length > 0

/** Rows sit 30px from the dividers between them; the first row is 24px below the header. */
function rowCellClass(rowIndex: number): string[] {
  const isLast = rowIndex === props.rows.length - 1
  return [rowIndex === 0 ? 'pt-6' : 'pt-[30px]', isLast ? '' : 'border-b border-line pb-[30px]']
}
</script>

<template>
  <div>
    <!-- Phones: one card per searched part, offers stacked under it. -->
    <ul class="flex flex-col gap-4 md:hidden">
      <li
        v-for="row in rows"
        :key="row.id"
        class="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-card"
      >
        <div class="flex items-start justify-between gap-3 rounded-lg bg-surface p-4">
          <div class="flex min-w-0 flex-col items-start gap-1">
            <span dir="ltr" class="text-h4 text-ink">{{ row.partNumber }}</span>
            <span class="text-body-sm text-muted">{{ row.description }}</span>
          </div>
          <span class="shrink-0 text-body-sm text-muted">
            {{ t('public.excel.columns.quantity') }}:
            <span class="text-body-md text-ink tabular-nums">{{ row.requestedQuantity }}</span>
          </span>
        </div>

        <ul v-if="hasOffers(row)" class="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2">
          <template v-for="column in columns" :key="column.key">
            <li v-if="row.offers[column.key]" class="flex flex-col gap-2">
              <span class="text-body-sm text-ink">{{
                t(`public.excel.columns.${column.key}`)
              }}</span>
              <OfferCell
                :offer="row.offers[column.key]!"
                :requested-quantity="row.requestedQuantity"
                :part-number="row.partNumber"
                @add-to-cart="(offerId, quantity) => emit('addToCart', offerId, quantity)"
              />
            </li>
          </template>
        </ul>

        <div v-else class="flex flex-wrap items-center justify-between gap-3">
          <span class="text-body-md text-ink">{{ t('public.excel.unavailable') }}</span>
          <BaseButton variant="primary" size="sm" @click="emit('notify', row.id)">
            <template #icon><NotificationIcon class="size-[18px]" aria-hidden="true" /></template>
            {{ t('public.excel.notifySellers') }}
          </BaseButton>
        </div>
      </li>
    </ul>

    <div class="hidden overflow-x-auto rounded-lg bg-white px-4 pt-4 pb-6 shadow-card md:block">
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
            <th scope="col" class="bg-surface ps-[38px] text-start font-normal">
              {{ t('public.excel.columns.quantity') }}
            </th>
            <th
              v-for="(column, index) in columns"
              :key="column.key"
              scope="col"
              class="bg-surface ps-5 text-start font-normal"
              :class="index === columns.length - 1 && 'rounded-e-lg'"
            >
              {{ t(`public.excel.columns.${column.key}`) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in rows" :key="row.id" class="align-top">
            <th scope="row" class="font-normal" :class="rowCellClass(rowIndex)">
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
                class="ps-[39px] align-middle text-body-md text-ink tabular-nums"
                :class="rowCellClass(rowIndex)"
              >
                {{ row.requestedQuantity }}
              </td>
              <td
                v-for="column in columns"
                :key="column.key"
                class="ps-4"
                :class="rowCellClass(rowIndex)"
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
              class="ps-[60px] align-middle"
              :class="rowCellClass(rowIndex)"
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
  </div>
</template>
