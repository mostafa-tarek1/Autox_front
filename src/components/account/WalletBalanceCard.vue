<script setup lang="ts">
import PriceTag from '@/components/ui/PriceTag.vue'
import { useI18n } from 'vue-i18n'

import WalletIcon from '@/assets/icons/wallet-02--duotone-rounded.svg'
import BaseButton from '@/components/ui/BaseButton.vue'

defineProps<{ balance: number }>()
const { t } = useI18n()
</script>

<template>
  <section
    class="flex flex-col gap-4 rounded-3xl bg-white px-6 py-4 shadow-card sm:flex-row sm:items-center sm:justify-between"
    aria-labelledby="wallet-balance-label"
  >
    <div class="flex items-center gap-2">
      <span class="grid size-12 shrink-0 place-items-center rounded-xl bg-surface p-3 text-primary">
        <WalletIcon class="size-6" aria-hidden="true" />
      </span>
      <div class="flex flex-col gap-2">
        <p id="wallet-balance-label" class="text-body-sm text-ink">{{ t('wallet.balance') }}</p>
        <PriceTag tone="ink" :amount="balance" class="text-h3" />
      </div>
    </div>
    <BaseButton size="sm" :to="{ name: 'wallet-withdraw' }" class="self-start sm:self-auto">
      {{ t('wallet.withdraw') }}
    </BaseButton>
  </section>
</template>
