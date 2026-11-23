<script setup lang="ts">
import AppFooter from '@/components/layout/AppFooter.vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'

import RiyalIcon from '@/assets/brand/riyal.svg'
import CalendarIcon from '@/assets/icons/calendar-02--stroke-rounded.svg'
import CancelIcon from '@/assets/icons/cancel-01--stroke-rounded.svg'
import SentIcon from '@/assets/icons/sent--stroke-standard.svg'
import { formatQuoteDate } from '@/components/dashboard/quotes/formatDate'
import QuoteOfferResultModal from '@/components/dashboard/quotes/QuoteOfferResultModal.vue'
import AppLogo from '@/components/ui/AppLogo.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { findSupplierQuote, quoteRequestDate } from '@/mocks/dashboard-quotes'

/**
 * Pricing page a supplier opens for a quotation request (Figma 863:13271): standalone, with only
 * the logo in the header so it also works from a notification link.
 */
const { t } = useI18n()
const route = useRoute()

const quote = computed(() => findSupplierQuote(String(route.params.id)))
const price = ref('')
const showErrors = ref(false)
const isSubmitting = ref(false)
const result = ref<'sent' | 'declined' | null>(null)
const isResultOpen = computed({
  get: () => result.value !== null,
  set: (value: boolean) => {
    if (!value) {
      result.value = null
    }
  },
})

const priceError = computed(() =>
  showErrors.value && !(Number(price.value) > 0) ? t('dashboard.quotes.offer.priceRequired') : '',
)

function onPriceInput(event: Event): void {
  const target = event.target as HTMLInputElement
  price.value = target.value.replace(/[^\d.]/g, '')
  target.value = price.value
}

async function submit(): Promise<void> {
  showErrors.value = true
  if (priceError.value) {
    return
  }
  isSubmitting.value = true
  await new Promise((resolve) => setTimeout(resolve, 600))
  isSubmitting.value = false
  result.value = 'sent'
}

function decline(): void {
  result.value = 'declined'
}
</script>

<template>
  <div class="min-h-dvh bg-surface">
    <header
      class="sticky top-0 z-30 flex h-20 items-center justify-center bg-white/90 px-4 shadow-soft backdrop-blur-[16px]"
    >
      <RouterLink :to="{ name: 'dashboard' }" :aria-label="t('dashboard.quotes.offer.home')">
        <AppLogo class="h-8 w-[119px]" />
      </RouterLink>
    </header>

    <main id="main" class="page-container pt-12 pb-16 lg:pb-[196px]">
      <div
        v-if="!quote"
        class="grid min-h-[320px] place-items-center rounded-2xl bg-white p-8 text-center shadow-card"
      >
        <p class="text-body-md text-secondary">{{ t('dashboard.quotes.offer.notFound') }}</p>
      </div>

      <form
        v-else
        class="flex flex-col items-stretch gap-6 rounded-2xl bg-white px-4 pt-4 pb-6 shadow-card"
        novalidate
        @submit.prevent="submit"
      >
        <div class="flex flex-col gap-4">
          <p class="flex h-12 items-center gap-1 rounded-lg bg-surface px-4 py-3 text-body-sm">
            <CalendarIcon class="size-4 shrink-0 text-primary" aria-hidden="true" />
            <span class="text-secondary">{{ t('dashboard.quotes.offer.requestDate') }}</span>
            <span class="text-ink tabular-nums">{{ formatQuoteDate(quoteRequestDate) }}</span>
          </p>

          <ul class="flex flex-col gap-4" :aria-label="t('dashboard.quotes.offer.items')">
            <li
              v-for="item in quote.items"
              :key="item.id"
              class="flex items-center justify-between gap-2 rounded-lg border border-line p-3"
            >
              <div class="flex min-w-0 flex-col items-start gap-2">
                <span class="text-body-md text-ink">{{ item.title }}</span>
                <span class="text-body-md text-muted">
                  <bdi dir="ltr">{{ item.partNumber }}</bdi> ·
                  {{ t(`catalog.origins.${item.origin}`) }}
                </span>
              </div>
              <span class="shrink-0 text-body-md text-ink">
                {{ t('dashboard.quotes.offer.quantity', { count: item.quantity }) }}
              </span>
            </li>
          </ul>
        </div>

        <button
          type="button"
          class="inline-flex h-[46px] w-full items-center justify-center gap-2 self-start rounded-xl border border-error px-6 py-2 text-button text-error transition-colors hover:bg-error/5 sm:w-[264px]"
          @click="decline"
        >
          <CancelIcon class="size-5" aria-hidden="true" />
          {{ t('dashboard.quotes.offer.unavailable') }}
        </button>

        <hr class="border-line" />

        <section
          class="flex flex-col gap-4 rounded-2xl bg-surface p-6"
          aria-labelledby="quote-price-title"
        >
          <h2 id="quote-price-title" class="text-h4 text-ink">
            {{ t('dashboard.quotes.offer.priceTitle') }}
          </h2>
          <div class="flex w-full flex-col gap-2 sm:w-[351px]">
            <label
              class="flex h-12 items-center gap-2 rounded-xl border bg-white px-4 py-3 transition-colors focus-within:border-accent"
              :class="priceError ? 'border-error' : 'border-line'"
            >
              <span class="sr-only">{{ t('dashboard.quotes.offer.priceLabel') }}</span>
              <input
                :value="price"
                inputmode="decimal"
                autocomplete="off"
                placeholder="0"
                class="min-w-0 flex-1 bg-transparent text-body-md text-ink outline-none placeholder:text-ink"
                :aria-invalid="priceError ? true : undefined"
                aria-describedby="quote-price-error"
                @input="onPriceInput"
              />
              <RiyalIcon class="h-5 w-[18px] shrink-0 text-secondary" aria-hidden="true" />
            </label>
            <p
              v-if="priceError"
              id="quote-price-error"
              class="text-caption text-error"
              role="alert"
            >
              {{ priceError }}
            </p>
          </div>
        </section>

        <BaseButton
          type="submit"
          :loading="isSubmitting"
          class="h-[52px]! w-full self-start py-4 sm:w-[375px]"
        >
          <template #icon><SentIcon class="size-5" aria-hidden="true" /></template>
          {{ t('dashboard.quotes.offer.submit') }}
        </BaseButton>
      </form>
    </main>
    <AppFooter />

    <QuoteOfferResultModal
      v-model:open="isResultOpen"
      :title="
        result === 'declined'
          ? t('dashboard.quotes.offer.declinedTitle')
          : t('dashboard.quotes.offer.sentTitle')
      "
    />
  </div>
</template>
