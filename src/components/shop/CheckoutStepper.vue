<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import TickIcon from '@/assets/icons/tick-02--solid-standard.svg'

import type { CheckoutStep } from './types'

const props = defineProps<{ current: CheckoutStep }>()
const { t } = useI18n()

const steps: CheckoutStep[] = ['cart', 'availability', 'shipping', 'payment', 'confirmation']
const currentIndex = computed(() => steps.indexOf(props.current))
</script>

<template>
  <nav :aria-label="t('shop.steps.label')">
    <ol class="relative flex items-start gap-3 sm:gap-[47px]">
      <span class="absolute inset-x-[55px] top-3 h-px bg-white/50" aria-hidden="true" />
      <li
        v-for="(step, index) in steps"
        :key="step"
        class="relative flex w-[60px] flex-col items-center gap-2 sm:w-[110px]"
        :aria-current="index === currentIndex ? 'step' : undefined"
      >
        <span
          class="grid size-6 place-items-center rounded-full"
          :class="index <= currentIndex ? 'bg-accent text-primary' : 'bg-white'"
        >
          <TickIcon v-if="index <= currentIndex" class="size-4" aria-hidden="true" />
        </span>
        <span
          class="text-center text-caption sm:text-body-md"
          :class="index <= currentIndex ? 'text-accent' : 'text-white'"
        >
          {{ t(`shop.steps.${step}`) }}
          <span v-if="index < currentIndex" class="sr-only">({{ t('shop.steps.completed') }})</span>
        </span>
      </li>
    </ol>
  </nav>
</template>
