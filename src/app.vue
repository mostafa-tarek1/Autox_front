<script setup lang="ts">
import { NuxtPage } from '#components'
import { useHead } from '#imports'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { useDocumentLocale } from '@/composables/useLocale'

useDocumentLocale()

const route = useRoute()
const { t, te } = useI18n()

/** "<page> | بارتس اكس" from the route's `meta.title` key, rendered into pre-rendered pages too. */
const title = computed(() => {
  const appName = t('app.name')
  const key = route.meta.title
  return key && te(`pageTitles.${key}`) ? `${t(`pageTitles.${key}`)} | ${appName}` : appName
})

useHead({ title })
</script>

<template>
  <NuxtPage />
</template>
