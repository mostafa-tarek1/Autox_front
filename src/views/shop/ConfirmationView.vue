<script setup lang="ts">
import PriceTag from '@/components/ui/PriceTag.vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

import BorderIcon from '@/assets/icons/border-full--stroke-rounded.svg'
import CalendarIcon from '@/assets/icons/calendar-02--stroke-rounded.svg'
import CheckIcon from '@/assets/icons/checkmark-circle-01--stroke-rounded.svg'
import CardIcon from '@/assets/icons/credit-card--stroke-rounded.svg'
import LocationIcon from '@/assets/icons/location-04--stroke-rounded.svg'
import PaymentIcon from '@/assets/icons/payment-02--stroke-rounded.svg'
import TrolleyIcon from '@/assets/icons/trolley-02--stroke-standard.svg'
import BrandThumb from '@/components/shop/BrandThumb.vue'
import CheckoutHero from '@/components/shop/CheckoutHero.vue'
import OriginChip from '@/components/shop/OriginChip.vue'
import SummaryRow from '@/components/shop/SummaryRow.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { confirmedOrder } from '@/mocks/shop'
import { useCartStore } from '@/stores/cart'

const { t } = useI18n()
const cart = useCartStore()
const { items, itemsCount, subtotal, vat, delivery, totalWithDelivery } = storeToRefs(cart)
</script>

<template>
  <CheckoutHero :title="t('shop.confirmation.title')" step="confirmation" />

  <div class="page-container mt-12">
    <article
      class="mx-auto flex max-w-[1182px] flex-col gap-2 rounded-3xl bg-white p-4 sm:p-6"
      aria-labelledby="order-number"
    >
      <header
        class="flex flex-col gap-4 rounded-lg bg-surface px-4 py-3 lg:flex-row lg:items-center lg:justify-between"
      >
        <div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-body-sm">
          <p class="flex items-center gap-1 rounded-full bg-info/10 px-2 py-1 text-ink">
            <TrolleyIcon class="size-4" aria-hidden="true" />
            {{ t('shop.confirmation.status') }}
          </p>
          <dl class="contents">
            <div class="flex items-center gap-1">
              <BorderIcon class="size-4 text-ink" aria-hidden="true" />
              <dt class="text-secondary">{{ t('shop.confirmation.orderNumber') }}</dt>
              <dd id="order-number" dir="ltr" class="text-ink">{{ confirmedOrder.number }}</dd>
            </div>
            <div class="flex items-center gap-1">
              <CalendarIcon class="size-4 text-ink" aria-hidden="true" />
              <dt class="text-secondary">{{ t('shop.confirmation.orderDate') }}</dt>
              <dd class="text-ink">{{ confirmedOrder.date }}</dd>
            </div>
            <div class="flex items-center gap-1">
              <PaymentIcon class="size-4 text-ink" aria-hidden="true" />
              <dt class="text-secondary">{{ t('shop.confirmation.totalPaid') }}</dt>
              <dd><PriceTag size="md" :amount="totalWithDelivery" tone="primary" /></dd>
            </div>
          </dl>
        </div>
        <BaseButton variant="soft" size="sm" class="h-[38px] self-start px-6 lg:self-auto">
          {{ t('shop.confirmation.invoice') }}
        </BaseButton>
      </header>

      <div class="flex flex-col gap-8">
        <div class="grid gap-4 lg:grid-cols-2">
          <section class="rounded-2xl border border-line" aria-labelledby="confirm-summary">
            <header class="border-b border-line p-4">
              <h2 id="confirm-summary" class="text-h4 text-black">{{ t('shop.summary.title') }}</h2>
            </header>
            <dl class="flex flex-col gap-4 p-4">
              <SummaryRow :label="t('shop.summary.itemsCount')">
                <i18n-t keypath="shop.summary.pieces" tag="span" scope="global">
                  <template #count>
                    <strong class="text-h4 text-ink">{{ itemsCount }}</strong>
                  </template>
                </i18n-t>
              </SummaryRow>
              <SummaryRow :label="t('shop.summary.subtotal')" :amount="subtotal" />
              <SummaryRow :label="t('shop.summary.vat')" :amount="vat" />
              <SummaryRow :label="t('shop.summary.delivery')" :amount="delivery" />
              <SummaryRow :label="t('shop.summary.discount')" :amount="0" />
              <SummaryRow :label="t('shop.summary.total')" :amount="totalWithDelivery" emphasis />
            </dl>
          </section>
          <div class="flex flex-col gap-4">
            <section
              class="min-h-[184px] rounded-2xl border border-line pb-6"
              aria-labelledby="confirm-payment"
            >
              <header class="flex items-center justify-between gap-2 border-b border-line p-4">
                <h2 id="confirm-payment" class="text-h4 text-black">
                  {{ t('shop.confirmation.payment') }}
                </h2>
                <span
                  class="flex items-center gap-1 rounded-full bg-accent/20 px-2 py-1 text-body-sm text-success"
                >
                  <CheckIcon class="size-4" aria-hidden="true" />
                  {{ t('shop.confirmation.paid') }}
                </span>
              </header>
              <p class="flex items-center gap-1 px-4 pt-4 text-body-sm text-ink">
                <CardIcon class="size-6 text-primary" aria-hidden="true" />
                {{ t('shop.confirmation.cardEnding', { digits: confirmedOrder.cardLastDigits }) }}
              </p>
            </section>

            <section
              class="flex-1 rounded-2xl border border-line pb-6"
              aria-labelledby="confirm-shipping"
            >
              <header class="border-b border-line p-4">
                <h2 id="confirm-shipping" class="text-h4 text-black">
                  {{ t('shop.confirmation.shippingDetails') }}
                </h2>
              </header>
              <div class="flex flex-col items-start gap-2 px-6 pt-4">
                <p class="text-body-md text-black">{{ confirmedOrder.recipient }}</p>
                <p class="flex items-center gap-1 text-body-sm">
                  <LocationIcon class="size-4 shrink-0 text-ink" aria-hidden="true" />
                  <span class="text-secondary">{{ t('shop.confirmation.address') }}</span>
                  <span class="text-ink">{{ confirmedOrder.address }}</span>
                </p>
              </div>
            </section>
          </div>
        </div>

        <ul class="flex flex-col gap-2">
          <li
            v-for="item in items"
            :key="item.id"
            class="flex flex-col gap-4 rounded-2xl border border-line p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
          >
            <div class="flex min-w-0 items-center gap-4">
              <BrandThumb :logo="item.brandLogo" :name="item.brandName" tone="surface" />
              <div class="flex min-w-0 flex-col items-start gap-2">
                <h3 class="text-h4 text-ink">{{ item.title }}</h3>
                <p dir="ltr" class="text-body-md text-primary">{{ item.partNumber }}</p>
                <OriginChip :origin="item.origin" tone="white" class="border border-line" />
              </div>
            </div>
            <div class="flex items-center gap-8">
              <span class="text-body-sm text-secondary">{{
                t('shop.confirmation.pieces', { count: item.quantity })
              }}</span>
              <PriceTag size="md" :amount="item.unitPrice * item.quantity" tone="primary" />
            </div>
          </li>
        </ul>
      </div>
    </article>
  </div>
</template>
