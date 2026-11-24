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
  <!-- The dashboard profile uses 20px (H3) section titles; the trader's account pages use H2. -->
  <div class="flex flex-col gap-6 [&_h2]:text-h3">
    <AccountPersonalView />
    <AccountCompanyView />
    <AccountBankView />
  </div>
</template>
