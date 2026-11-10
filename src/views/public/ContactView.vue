<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import ContactForm from '@/components/public/contact/ContactForm.vue'
import ContactInfoPanel from '@/components/public/contact/ContactInfoPanel.vue'
import PageHero from '@/components/layout/PageHero.vue'

const { t } = useI18n()
</script>

<template>
  <PageHero :title="t('pageTitles.contact')" />
  <div class="page-container pt-12 pb-16 lg:pb-[215px]">
    <div
      class="grid overflow-hidden rounded-3xl bg-white shadow-card lg:min-h-[650px] lg:grid-cols-[611fr_589fr]"
    >
      <ContactForm />
      <ContactInfoPanel />
    </div>
  </div>
</template>
