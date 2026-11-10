<script setup lang="ts">
import QuantityStepper from '@/components/ui/QuantityStepper.vue'
import PriceTag from '@/components/ui/PriceTag.vue'
import { useId } from 'vue'
import { useI18n } from 'vue-i18n'

import TickIcon from '@/assets/icons/tick-02--solid-standard.svg'

import type { OrderItem } from './types'

defineProps<{ item: OrderItem }>()
const selected = defineModel<boolean>('selected', { default: false })
const quantity = defineModel<number>('quantity', { default: 1 })
const { t } = useI18n()
const checkboxId = useId()
</script>

<template>
  <div
    class="flex items-center gap-4 rounded-2xl border-[0.5px] bg-white p-2 transition-colors"
    :class="selected ? 'border-accent' : 'border-line'"
  >
    <input :id="checkboxId" v-model="selected" type="checkbox" class="peer sr-only" />
    <label
      :for="checkboxId"
      class="grid size-6 shrink-0 cursor-pointer place-items-center rounded-[7px] border border-accent text-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent"
      :class="selected ? 'bg-accent' : 'bg-surface'"
    >
      <TickIcon v-if="selected" class="size-4" aria-hidden="true" />
      <span class="sr-only">{{ t('returns.form.selectItem', { part: item.partNumber }) }}</span>
    </label>

    <label :for="checkboxId" class="flex min-w-0 flex-1 cursor-pointer items-start gap-4">
      <span
        class="flex size-[68px] shrink-0 flex-col items-center justify-center gap-[3px] rounded-xl bg-surface"
      >
        <img
          :src="item.brandLogo"
          alt=""
          width="38"
          height="20"
          class="h-5 w-[38px] object-contain"
        />
        <span class="text-[9.7px] leading-[14px] text-muted">{{ item.brandName }}</span>
      </span>
      <span class="flex min-w-0 flex-col items-start gap-2">
        <span class="text-body-md text-ink">{{ item.title }}</span>
        <span dir="ltr" class="text-body-sm text-primary">{{ item.partNumber }}</span>
      </span>
    </label>

    <div class="flex w-[82px] shrink-0 flex-col items-center gap-2">
      <PriceTag :grouping="false" :amount="item.price" class="text-h4 text-ink" />
      <QuantityStepper
        variant="surface"
        size="sm"
        :min="1"
        v-model="quantity"
        :max="item.quantity"
        :disabled="!selected"
        :label="t('common.quantity')"
      />
    </div>
  </div>
</template>
