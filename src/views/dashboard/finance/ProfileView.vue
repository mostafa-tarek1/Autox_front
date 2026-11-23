<script setup lang="ts">
import AccountBankView from '@/views/account/AccountBankView.vue'
import AccountCompanyView from '@/views/account/AccountCompanyView.vue'
import AccountPersonalView from '@/views/account/AccountPersonalView.vue'

/**
 * Supplier profile (Figma 800:9646): the same personal, company and bank-account cards as the
 * customer "حسابي" pages, stacked on one page. Reuses those screens so both stay in sync.
 */
</script>

<template>
  <div class="flex flex-col gap-6">
    <AccountPersonalView />
    <AccountCompanyView />
    <AccountBankView />
  </div>
</template>
