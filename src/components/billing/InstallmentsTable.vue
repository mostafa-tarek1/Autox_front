<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { providerLogos, type InstallmentRequest, type InstallmentStatus } from '@/mocks/billing'

import AmountText from './AmountText.vue'
import { formatDate } from './formatDate'
import StatusChip, { type StatusTone } from './StatusChip.vue'

defineProps<{ requests: InstallmentRequest[] }>()
const { t } = useI18n()

const statusTones: Record<InstallmentStatus, StatusTone> = {
  paid: 'success',
  processing: 'processing',
  rejected: 'error',
}

const columns = ['orderNumber', 'name', 'phone', 'amount', 'date', 'notes', 'status'] as const
</script>

<template>
  <!-- Desktop: table (Figma "row" component). -->
  <div class="hidden overflow-x-auto rounded-3xl bg-white p-2 md:block">
    <table class="w-full min-w-[900px] border-separate border-spacing-0 text-start">
      <caption class="sr-only">
        {{
          t('billing.installmentRequests')
        }}
      </caption>
      <thead>
        <tr class="text-body-md text-ink">
          <th scope="col" class="w-12 rounded-s-2xl bg-surface py-4 ps-4">
            <span class="sr-only">{{ t('billing.table.provider') }}</span>
          </th>
          <th
            v-for="(column, index) in columns"
            :key="column"
            scope="col"
            class="bg-surface py-4 pe-6 text-start font-normal"
            :class="index === columns.length - 1 && 'rounded-e-2xl'"
          >
            {{ t(`billing.table.${column}`) }}
          </th>
        </tr>
      </thead>
      <tbody class="text-body-md text-secondary">
        <tr
          v-for="request in requests"
          :key="request.id"
          class="h-16 transition-colors hover:bg-surface"
        >
          <td class="border-b-[0.6px] border-line ps-4">
            <img
              :src="providerLogos[request.provider]"
              :alt="t(`billing.providers.${request.provider}`)"
              width="29"
              height="29"
              class="size-[29px] rounded-full bg-white object-cover"
            />
          </td>
          <td class="border-b-[0.6px] border-line pe-6">
            <bdi dir="ltr">#{{ request.orderNumber }}</bdi>
          </td>
          <td class="border-b-[0.6px] border-line pe-6">{{ request.customerName }}</td>
          <td class="border-b-[0.6px] border-line pe-6 tabular-nums">{{ request.phone }}</td>
          <td class="border-b-[0.6px] border-line pe-6 text-h4 text-primary">
            <AmountText :amount="request.amount" />
          </td>
          <td class="border-b-[0.6px] border-line pe-6 tabular-nums">
            {{ formatDate(request.date) }}
          </td>
          <td class="border-b-[0.6px] border-line pe-6">
            {{ request.note ?? t('billing.table.none') }}
          </td>
          <td class="border-b-[0.6px] border-line pe-4">
            <StatusChip :tone="statusTones[request.status]" :with-icon="false">
              {{ t(`billing.installmentStatus.${request.status}`) }}
            </StatusChip>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Mobile: one card per request. -->
  <ul class="flex flex-col gap-3 md:hidden">
    <li
      v-for="request in requests"
      :key="request.id"
      class="flex flex-col gap-3 rounded-2xl bg-white p-4"
    >
      <div class="flex items-center justify-between gap-2">
        <span class="flex items-center gap-2">
          <img
            :src="providerLogos[request.provider]"
            :alt="t(`billing.providers.${request.provider}`)"
            width="29"
            height="29"
            class="size-[29px] rounded-full object-cover"
          />
          <bdi dir="ltr" class="text-body-md text-ink">#{{ request.orderNumber }}</bdi>
        </span>
        <StatusChip :tone="statusTones[request.status]" :with-icon="false">
          {{ t(`billing.installmentStatus.${request.status}`) }}
        </StatusChip>
      </div>
      <dl class="grid grid-cols-2 gap-x-4 gap-y-2 text-body-sm">
        <dt class="text-secondary">{{ t('billing.table.name') }}</dt>
        <dd class="text-ink">{{ request.customerName }}</dd>
        <dt class="text-secondary">{{ t('billing.table.phone') }}</dt>
        <dd class="text-ink tabular-nums">{{ request.phone }}</dd>
        <dt class="text-secondary">{{ t('billing.table.amount') }}</dt>
        <dd class="font-semibold text-primary"><AmountText :amount="request.amount" /></dd>
        <dt class="text-secondary">{{ t('billing.table.date') }}</dt>
        <dd class="text-ink tabular-nums">{{ formatDate(request.date) }}</dd>
        <dt class="text-secondary">{{ t('billing.table.notes') }}</dt>
        <dd class="text-ink">{{ request.note ?? t('billing.table.none') }}</dd>
      </dl>
    </li>
  </ul>
</template>
