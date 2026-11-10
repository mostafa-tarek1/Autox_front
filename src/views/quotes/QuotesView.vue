<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import PageHero from '@/components/layout/PageHero.vue'
import QuoteOffersModal from '@/components/quotes/QuoteOffersModal.vue'
import QuoteRequestCard from '@/components/quotes/QuoteRequestCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { quoteRequests, type QuoteOffer, type QuoteRequest } from '@/mocks/quotes'

const { t } = useI18n()

const requests = ref<QuoteRequest[]>(structuredClone(quoteRequests))
const selected = ref<QuoteRequest | null>(null)
const isOffersOpen = ref(false)
const acceptedMessage = ref('')

function openOffers(request: QuoteRequest): void {
  selected.value = request
  isOffersOpen.value = true
}

function remove(request: QuoteRequest): void {
  requests.value = requests.value.filter((item) => item.id !== request.id)
}

function accept(offer: QuoteOffer): void {
  isOffersOpen.value = false
  acceptedMessage.value = t('quotes.offerAccepted', { merchant: offer.merchant })
}
</script>

<template>
  <PageHero
    :title="t('quotes.title')"
    :breadcrumbs="[{ label: t('nav.home'), to: { name: 'home' } }, { label: t('nav.quotes') }]"
  />

  <div class="page-container flex flex-col gap-6 pt-10">
    <p
      v-if="acceptedMessage"
      class="rounded-2xl bg-success/10 p-4 text-body-md text-success"
      role="status"
    >
      {{ acceptedMessage }}
    </p>

    <ul v-if="requests.length" class="flex flex-col gap-6">
      <li v-for="request in requests" :key="request.id">
        <QuoteRequestCard :request="request" @view-offers="openOffers" @remove="remove" />
      </li>
    </ul>
    <div v-else class="flex flex-col items-center gap-4 rounded-3xl bg-white p-10 text-center">
      <p class="text-body-md text-secondary">{{ t('quotes.empty') }}</p>
      <BaseButton :to="{ name: 'home' }">{{ t('quotes.searchParts') }}</BaseButton>
    </div>
  </div>

  <QuoteOffersModal v-model:open="isOffersOpen" :request="selected" @accept="accept" />
</template>
