<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import LegalDocument from '@/components/public/legal/LegalDocument.vue'
import PageHero from '@/components/layout/PageHero.vue'
import { privacyPolicy } from '@/mocks/public'
import type { AppLocale } from '@/plugins/i18n'

const { t, locale } = useI18n()
const sections = computed(() => privacyPolicy[locale.value as AppLocale] ?? privacyPolicy.ar)
</script>

<template>
  <PageHero :title="t('pageTitles.privacy')" />
  <LegalDocument :sections="sections" />
</template>
