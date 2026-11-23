<script setup lang="ts">
import { useI18n } from 'vue-i18n'

/** Temporary body for dashboard screens that are still being built. */
const { t } = useI18n()
</script>

<template>
  <div
    class="grid min-h-[320px] place-items-center rounded-3xl bg-white p-8 text-center shadow-card"
  >
    <p class="text-body-md text-secondary">{{ t('common.comingSoon') }}</p>
  </div>
</template>
