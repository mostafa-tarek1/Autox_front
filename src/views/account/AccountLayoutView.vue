<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterView, useRoute } from 'vue-router'

import PageHero from '@/components/layout/PageHero.vue'
import AccountSidebar from '@/components/account/AccountSidebar.vue'
import { useAccountState } from '@/components/account/useAccountState'

const { t } = useI18n()
const route = useRoute()
const { state } = useAccountState()

const breadcrumbs = computed(() => {
  const crumbs = [
    { label: t('nav.home'), to: { name: 'home' } },
    { label: t('account.title'), to: route.name === 'account' ? undefined : { name: 'account' } },
  ]
  if (route.name !== 'account' && route.meta.title) {
    crumbs.push({ label: t(`pageTitles.${route.meta.title}`), to: undefined })
  }
  return crumbs
})
</script>

<template>
  <PageHero :title="t('account.title')" :breadcrumbs="breadcrumbs" />
  <div class="page-container mt-12 flex flex-col gap-6 lg:flex-row lg:items-start">
    <AccountSidebar
      :name="state.profile.name"
      :is-verified="state.profile.isVerified"
      class="lg:w-[282px] lg:shrink-0"
    />
    <div class="min-w-0 flex-1">
      <RouterView />
    </div>
  </div>
</template>
