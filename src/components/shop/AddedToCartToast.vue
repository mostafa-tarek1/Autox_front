<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import CartCheckIcon from '@/assets/icons/shopping-cart-check-01--stroke-standard.svg'

/** "Added to cart" toast. Place once (e.g. in the layout) and toggle with useAddedToCartToast(). */
import { useAddedToCartToast } from './useAddedToCartToast'

const { t } = useI18n()
const { isVisible } = useAddedToCartToast()
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isVisible"
        role="status"
        class="fixed top-24 start-4 z-50 flex w-[301px] max-w-[calc(100vw-2rem)] items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_4px_16px_rgb(0_0_0/0.16)] xl:start-[120px]"
      >
        <span
          class="grid size-[52px] shrink-0 place-items-center rounded-xl bg-surface text-primary"
        >
          <CartCheckIcon class="size-6" aria-hidden="true" />
        </span>
        <span class="text-button text-success">{{ t('shop.cart.added') }}</span>
      </div>
    </Transition>
  </Teleport>
</template>
