<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import WalletIcon from '@/assets/icons/wallet-02--duotone-rounded.svg'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import PriceTag from '@/components/ui/PriceTag.vue'

/** "الدفع بالمحفظة" dialog (Figma 753:14027): current balance and a pay button. */
const props = defineProps<{ balance: number; amount: number }>()
const emit = defineEmits<{ paid: [] }>()
const open = defineModel<boolean>('open', { default: false })
const { t } = useI18n()

const isInsufficient = computed(() => props.balance < props.amount)

function pay(): void {
  open.value = false
  emit('paid')
}
</script>

<template>
  <BaseModal
    v-model:open="open"
    :title="t('shop.payment.wallet.title')"
    panel-class="max-w-[584px] px-6 pt-16 pb-10 sm:px-10"
    title-class="mb-8 text-h3"
  >
    <div class="flex flex-col gap-8">
      <div class="flex items-center gap-2 rounded-3xl bg-surface px-6 py-4 shadow-card">
        <span class="grid size-12 shrink-0 place-items-center rounded-xl bg-white p-3 shadow-card">
          <WalletIcon class="size-6 text-primary" aria-hidden="true" />
        </span>
        <div class="flex flex-col items-start gap-2">
          <span class="text-body-sm text-black">{{ t('shop.payment.wallet.balance') }}</span>
          <PriceTag :amount="balance" size="lg" tone="ink" />
        </div>
      </div>
      <p v-if="isInsufficient" class="text-body-sm text-error" role="alert">
        {{ t('shop.payment.wallet.insufficient') }}
      </p>
      <BaseButton block :disabled="isInsufficient" @click="pay">
        {{ t('shop.payment.wallet.pay') }}
      </BaseButton>
    </div>
  </BaseModal>
</template>
