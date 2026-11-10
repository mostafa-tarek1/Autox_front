<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import LegalDocument from '@/components/public/legal/LegalDocument.vue'
import PageHero from '@/components/layout/PageHero.vue'
import { termsAndConditions } from '@/mocks/public'
import type { AppLocale } from '@/plugins/i18n'

const { t, locale } = useI18n()
const sections = computed(
  () => termsAndConditions[locale.value as AppLocale] ?? termsAndConditions.ar,
)
</script>

<template>
  <PageHero :title="t('pageTitles.terms')" />
  <LegalDocument :sections="sections" />
</template>
