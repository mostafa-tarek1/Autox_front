<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import HotPriceIcon from '@/assets/icons/hot-price--solid-rounded.svg?component'
import AmountText from '@/components/billing/AmountText.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseChip from '@/components/ui/BaseChip.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import type { QuoteOffer, QuoteRequest } from '@/mocks/quotes'

const props = defineProps<{ request: QuoteRequest | null }>()
const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ accept: [offer: QuoteOffer] }>()
const { t } = useI18n()

const offers = computed(() => props.request?.offers ?? [])
const cheapestId = computed(
  () =>
    offers.value.reduce<QuoteOffer | null>(
      (best, offer) => (!best || offer.price < best.price ? offer : best),
      null,
    )?.id,
)
</script>

<template>
  <BaseModal v-model:open="open" width="max-w-[644px]">
    <div class="flex flex-col gap-6 sm:p-2">
      <header class="flex flex-col gap-2">
        <h2 class="text-h3 text-ink">{{ t('quotes.submittedOffers') }}</h2>
        <p class="text-body-sm text-ink">{{ t('quotes.offersCount', { count: offers.length }) }}</p>
      </header>
      <ul class="flex flex-col gap-4">
        <li
          v-for="offer in offers"
          :key="offer.id"
          class="flex items-center justify-between gap-6 rounded-lg border p-3"
          :class="offer.id === cheapestId ? 'border-accent' : 'border-line'"
        >
          <div class="flex flex-wrap items-center gap-6">
            <span class="text-body-sm text-ink">{{ offer.merchant }}</span>
            <BaseChip v-if="offer.id === cheapestId" tone="success" class="h-6 px-2 py-1">
              <template #icon><HotPriceIcon class="size-3.5" aria-hidden="true" /></template>
              {{ t('quotes.lowestPrice') }}
            </BaseChip>
          </div>
          <div class="flex items-center gap-6">
            <AmountText :amount="offer.price" class="text-h3 text-primary" />
            <BaseButton @click="emit('accept', offer)">{{ t('quotes.accept') }}</BaseButton>
          </div>
        </li>
      </ul>
    </div>
  </BaseModal>
</template>
