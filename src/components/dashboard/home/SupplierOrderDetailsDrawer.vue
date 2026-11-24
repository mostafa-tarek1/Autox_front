<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import BorderIcon from '@/assets/icons/border-full--stroke-rounded.svg'
import CalendarIcon from '@/assets/icons/calendar-02--stroke-rounded.svg'
import PaymentIcon from '@/assets/icons/payment-02--stroke-rounded.svg'
import SecurityCheckIcon from '@/assets/icons/security-check--stroke-rounded.svg'
import DashboardDrawer from '@/components/dashboard/shared/DashboardDrawer.vue'
import PriceTag from '@/components/ui/PriceTag.vue'
import { useLocalizedText } from '@/composables/useLocalizedText'
import { hiddenCustomerStatuses, type SupplierOrder } from '@/mocks/dashboard'

import SupplierOrderStatus from './SupplierOrderStatus.vue'

/** "Order details" side panel (Figma 780:945 paid, 879:14555 customer hidden until payment). */
const props = defineProps<{ order: SupplierOrder | null }>()
const open = defineModel<boolean>('open', { default: false })
const { t } = useI18n()
const localized = useLocalizedText()

const isCustomerVisible = computed(
  () => !!props.order && !hiddenCustomerStatuses.includes(props.order.status),
)

const formatDate = (iso: string) => {
  const [year, month, day] = iso.split('-')
  return `${day}/${month}/${year}`
}
</script>

<template>
  <DashboardDrawer v-model:open="open" :title="t('dashboard.home.details.title')">
    <template v-if="order" #subheader>
      <div class="flex flex-col items-start gap-2">
        <div class="flex flex-wrap items-center gap-6 text-body-sm">
          <span class="flex items-center gap-1">
            <BorderIcon class="size-4 text-primary" aria-hidden="true" />
            <span class="text-secondary">{{ t('dashboard.home.details.reference') }}</span>
            <span dir="ltr" class="text-ink">{{ order.reference }}</span>
          </span>
          <span class="flex items-center gap-1">
            <CalendarIcon class="size-4 text-primary" aria-hidden="true" />
            <span class="text-secondary">{{ t('dashboard.home.details.date') }}</span>
            <span class="text-ink tabular-nums">{{ formatDate(order.date) }}</span>
          </span>
        </div>
        <SupplierOrderStatus :status="order.status" />
      </div>
    </template>

    <template v-if="order">
      <section
        class="flex flex-col gap-4 border-b border-line px-6 py-4"
        aria-labelledby="order-items-title"
      >
        <h3 id="order-items-title" class="rounded-lg bg-surface p-3 text-h4 text-ink">
          {{ t('dashboard.home.details.items') }}
        </h3>
        <ul class="flex flex-col gap-4">
          <li
            v-for="item in order.items"
            :key="item.id"
            class="flex items-start justify-between gap-8 rounded-xl border border-line p-3"
          >
            <div class="flex min-w-0 flex-col items-start gap-2">
              <p class="text-body-md text-ink">{{ localized(item.title) }}</p>
              <p dir="ltr" class="text-body-md text-primary">{{ item.partNumber }}</p>
              <span
                class="inline-flex h-8 items-center gap-1 rounded-full bg-surface px-2 py-1 text-body-sm text-primary"
              >
                <SecurityCheckIcon class="size-4" aria-hidden="true" />
                {{ t(`catalog.origins.${item.origin}`) }}
              </span>
            </div>
            <div class="flex shrink-0 items-center gap-6 text-body-sm">
              <span class="text-secondary">{{
                t('dashboard.home.details.pieces', { count: item.quantity })
              }}</span>
              <PriceTag
                :amount="item.price"
                decimals
                :grouping="false"
                small-symbol
                class="text-body-sm text-ink"
              />
            </div>
          </li>
        </ul>
        <!-- The total sits at the end of the row (left in RTL), as in Figma "Order details". -->
        <p class="flex items-center justify-end gap-1 text-body-sm text-secondary">
          <PaymentIcon class="size-4 text-primary" aria-hidden="true" />
          {{ t('dashboard.home.details.total') }}
          <PriceTag :amount="order.total" :grouping="false" class="text-h4 text-primary" />
        </p>
      </section>

      <section class="flex flex-col gap-4 px-6 py-4" aria-labelledby="order-customer-title">
        <h3 id="order-customer-title" class="rounded-lg bg-surface p-3 text-h4 text-ink">
          {{ t('dashboard.home.details.customer') }}
        </h3>
        <dl v-if="isCustomerVisible" class="flex flex-col gap-3 px-3">
          <div class="flex flex-col items-start gap-1 border-b border-line pb-3">
            <dt class="text-body-sm text-secondary">{{ t('dashboard.home.details.name') }}</dt>
            <dd class="text-body-md text-ink">{{ order.customer.name }}</dd>
          </div>
          <div class="flex flex-col items-start gap-1 border-b border-line pb-3">
            <dt class="text-body-sm text-secondary">{{ t('dashboard.home.details.phone') }}</dt>
            <dd dir="ltr" class="text-body-md text-ink">{{ order.customer.phone }}</dd>
          </div>
          <div class="flex flex-col items-start gap-1">
            <dt class="text-body-sm text-secondary">{{ t('dashboard.home.details.address') }}</dt>
            <dd class="text-body-lg text-ink">{{ order.customer.address }}</dd>
          </div>
        </dl>
        <p v-else class="px-3 text-body-sm text-secondary">
          {{ t('dashboard.home.details.hiddenCustomer') }}
        </p>
      </section>
    </template>
  </DashboardDrawer>
</template>
