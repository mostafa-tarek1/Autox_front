<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import CheckIcon from '@/assets/icons/checkmark-circle-01--stroke-rounded.svg'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'

/** Confirmation after the supplier prices a request or declines it. */
defineProps<{ title: string }>()
const open = defineModel<boolean>('open', { default: false })
const { t } = useI18n()
</script>

<template>
  <BaseModal v-model:open="open" :dismissible="false" panel-class="max-w-[385px] px-6 py-10">
    <div class="flex flex-col items-center gap-6 text-center">
      <span class="grid size-14 place-items-center rounded-full bg-accent/20 text-primary">
        <CheckIcon class="size-8" aria-hidden="true" />
      </span>
      <p class="text-h4 text-ink">{{ title }}</p>
      <BaseButton block :to="{ name: 'dashboard-quotes' }">
        {{ t('dashboard.quotes.offer.backToQuotes') }}
      </BaseButton>
    </div>
  </BaseModal>
</template>
