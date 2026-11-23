<script setup lang="ts">
/**
 * Development-only gallery that renders one checkout/orders component in its open state, so it can
 * be screenshotted and compared with its Figma frame. Registered only when `import.meta.env.DEV`.
 * Usage: /__preview/shop?c=popover|added|sent|purchase|bankSent|card|wallet|policy|methods|line
 */
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import tabbyLogo from '@/assets/images/shop/tabby.webp'
import visaLogo from '@/assets/images/shop/visa.webp'
import ReturnPolicyDialog from '@/components/orders/ReturnPolicyDialog.vue'
import AddedToCartToast from '@/components/shop/AddedToCartToast.vue'
import CardPaymentDialog from '@/components/shop/CardPaymentDialog.vue'
import CartItemCard from '@/components/shop/CartItemCard.vue'
import CartPopover from '@/components/shop/CartPopover.vue'
import PaymentMethodOption from '@/components/shop/PaymentMethodOption.vue'
import ResultDialog from '@/components/shop/ResultDialog.vue'
import { useAddedToCartToast } from '@/components/shop/useAddedToCartToast'
import WalletPayDialog from '@/components/shop/WalletPayDialog.vue'
import { paymentSummary, walletBalance } from '@/mocks/shop'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const { t } = useI18n()
const cart = useCartStore()
const component = computed(() => String(route.query.c ?? ''))
const open = ref(true)
const selected = ref<string | null>('card')

const resultMessages: Record<string, string> = {
  sent: 'shop.cart.sentToSuppliers',
  purchase: 'shop.cart.purchaseSent',
  bankSent: 'shop.bankTransfer.sent',
}

if (component.value === 'added') {
  useAddedToCartToast().show()
}
</script>

<template>
  <div class="min-h-dvh bg-surface p-4">
    <CartPopover v-if="component === 'popover'" />
    <AddedToCartToast v-else-if="component === 'added'" />
    <ResultDialog
      v-else-if="resultMessages[component]"
      v-model:open="open"
      :message="t(resultMessages[component]!)"
      :action-label="t('shop.cart.trackOrder')"
    />
    <CardPaymentDialog v-else-if="component === 'card'" v-model:open="open" />
    <WalletPayDialog
      v-else-if="component === 'wallet'"
      v-model:open="open"
      :balance="walletBalance"
      :amount="paymentSummary.total"
    />
    <ReturnPolicyDialog v-else-if="component === 'policy'" v-model:open="open" />
    <div v-else-if="component === 'methods'" class="flex w-[735px] flex-col gap-4">
      <PaymentMethodOption
        v-model="selected"
        name="m"
        value="tabby"
        :label="t('shop.payment.methods.tabby')"
        :logo="tabbyLogo"
      />
      <PaymentMethodOption
        v-model="selected"
        name="m"
        value="card"
        :label="t('shop.payment.methods.card')"
        :logo="visaLogo"
      />
    </div>
    <div v-else-if="component === 'line'" class="w-[709px]">
      <CartItemCard v-if="cart.items[0]" :item="cart.items[0]" />
    </div>
  </div>
</template>
