<script setup lang="ts">
import PriceTag from '@/components/ui/PriceTag.vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import ClockIcon from '@/assets/icons/clock-01--duotone-rounded.svg'
import SearchIcon from '@/assets/icons/search-01--stroke-standard.svg'
import WalletIcon from '@/assets/icons/wallet-02--duotone-rounded.svg'
import PageHero from '@/components/layout/PageHero.vue'
import PaymentCard from '@/components/billing/PaymentCard.vue'
import StatCard from '@/components/billing/StatCard.vue'
import { paymentSummary, payments } from '@/mocks/billing'

const { t } = useI18n()
const query = ref('')

const filteredPayments = computed(() => {
  const term = query.value.trim().replace(/^#/, '').toLowerCase()
  return term
    ? payments.filter((payment) => payment.orderNumber.toLowerCase().includes(term))
    : payments
})
</script>

<template>
  <PageHero
    :title="t('billing.payments')"
    :breadcrumbs="[
      { label: t('nav.home'), to: { name: 'home' } },
      { label: t('billing.payments') },
    ]"
  />

  <div class="page-container flex flex-col gap-12 pt-12">
    <section
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
      :aria-label="t('billing.summary')"
    >
      <StatCard :label="t('billing.totalPaid')" :icon="WalletIcon">
        <PriceTag :amount="paymentSummary.totalPaid" class="text-ink" />
      </StatCard>
      <StatCard :label="t('billing.pendingAmount')" :icon="ClockIcon">
        <PriceTag :amount="paymentSummary.pendingAmount" class="text-error" />
      </StatCard>
      <StatCard :label="t('billing.totalInvoices')" :icon="WalletIcon">
        <span class="text-ink tabular-nums">{{ paymentSummary.totalInvoices }}</span>
      </StatCard>
      <StatCard :label="t('billing.unpaidInvoices')" :icon="WalletIcon">
        <span class="text-error tabular-nums">{{ paymentSummary.unpaidInvoices }}</span>
      </StatCard>
    </section>

    <section class="flex flex-col gap-8" aria-labelledby="payments-history">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="payments-history" class="text-h3 text-ink">{{ t('billing.paymentsHistory') }}</h2>
        <label
          class="flex h-[41px] w-full items-center gap-2 rounded-lg border-[0.5px] border-line bg-white p-2 focus-within:border-accent sm:w-[486px]"
        >
          <SearchIcon class="size-4 shrink-0 text-ink" aria-hidden="true" />
          <span class="sr-only">{{ t('billing.searchOrder') }}</span>
          <input
            v-model="query"
            type="search"
            :placeholder="t('billing.searchOrder')"
            class="min-w-0 flex-1 bg-transparent text-body-md outline-none placeholder:text-placeholder"
          />
        </label>
      </div>

      <ul v-if="filteredPayments.length" class="flex flex-col gap-6">
        <li v-for="payment in filteredPayments" :key="payment.id">
          <PaymentCard :payment="payment" />
        </li>
      </ul>
      <p v-else class="rounded-3xl bg-white p-8 text-center text-body-md text-secondary">
        {{ t('billing.noResults') }}
      </p>
    </section>
  </div>
</template>
