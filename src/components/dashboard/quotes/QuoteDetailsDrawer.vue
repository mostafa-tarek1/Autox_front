<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import CouponIcon from '@/assets/icons/coupon-01--stroke-rounded.svg'
import DashboardDrawer from '@/components/dashboard/shared/DashboardDrawer.vue'
import PriceTag from '@/components/ui/PriceTag.vue'
import { drawerOfferedPrice, type SupplierQuote } from '@/mocks/dashboard-quotes'

import QuoteItemCard from './QuoteItemCard.vue'
import QuoteStatusChip from './QuoteStatusChip.vue'

/**
 * "تفاصيل العرض" side panel (Figma 780:10870 / 910:16321). Customer details only appear once the
 * trader has accepted the offer.
 */
const props = defineProps<{ quote: SupplierQuote | null }>()
const open = defineModel<boolean>('open', { default: false })
const { t } = useI18n()

const showsCustomer = computed(
  () => props.quote?.status === 'accepted' || props.quote?.status === 'approved',
)
</script>

<template>
  <DashboardDrawer v-model:open="open" :title="t('dashboard.quotes.details.title')">
    <template v-if="quote" #header-end>
      <QuoteStatusChip :status="quote.status" />
    </template>

    <div v-if="quote" class="flex flex-col">
      <section
        class="flex flex-col gap-4 border-b border-line px-6 py-4"
        aria-labelledby="quote-requests-title"
      >
        <h3 id="quote-requests-title" class="rounded-lg bg-surface p-3 text-h4 text-ink">
          {{ t('dashboard.quotes.details.customerRequests') }}
        </h3>
        <ul class="flex flex-col gap-4">
          <li v-for="item in quote.items" :key="item.id">
            <QuoteItemCard :item="item" />
          </li>
        </ul>
      </section>

      <section class="flex flex-col gap-4 px-6 py-4" aria-labelledby="quote-offered-title">
        <h3 id="quote-offered-title" class="rounded-lg bg-surface p-3 text-h4 text-ink">
          {{ t('dashboard.quotes.details.offered') }}
        </h3>
        <p class="flex items-center gap-2 text-primary">
          <CouponIcon class="size-5 shrink-0" aria-hidden="true" />
          <PriceTag :amount="drawerOfferedPrice" :grouping="false" size="xl" tone="primary" />
        </p>
      </section>

      <section
        v-if="showsCustomer"
        class="flex flex-col gap-4 px-6 py-4"
        aria-labelledby="quote-customer-title"
      >
        <h3 id="quote-customer-title" class="rounded-lg bg-surface p-3 text-h4 text-ink">
          {{ t('dashboard.quotes.details.customerData') }}
        </h3>
        <dl class="flex flex-col gap-3 px-3">
          <div class="flex flex-col gap-1 border-b border-line pb-3">
            <dt class="text-body-sm text-secondary">{{ t('dashboard.quotes.details.name') }}</dt>
            <dd class="text-body-md text-ink">{{ quote.customer.name }}</dd>
          </div>
          <div class="flex flex-col gap-1 border-b border-line pb-3">
            <dt class="text-body-sm text-secondary">{{ t('dashboard.quotes.details.phone') }}</dt>
            <dd dir="ltr" class="text-body-md text-ink rtl:text-right">
              +966 {{ quote.customer.phone }}
            </dd>
          </div>
          <div class="flex flex-col gap-1">
            <dt class="text-body-sm text-secondary">{{ t('dashboard.quotes.details.address') }}</dt>
            <dd class="text-body-lg text-ink">{{ quote.customer.address }}</dd>
          </div>
        </dl>
      </section>
    </div>
  </DashboardDrawer>
</template>
