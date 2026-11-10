<script setup lang="ts">
import { RouterView } from 'vue-router'

import { useDocumentLocale } from '@/composables/useLocale'

useDocumentLocale()
</script>

<template>
  <RouterView />
</template>
